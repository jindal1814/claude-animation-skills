// ---------- compositor: shots, transitions, captions, grade ----------
const canvas = document.getElementById('c'); canvas.width = W; canvas.height = H;
const out = canvas.getContext('2d');
const buf = document.createElement('canvas'); buf.width = W; buf.height = H; const bctx = buf.getContext('2d');
const buf2 = document.createElement('canvas'); buf2.width = W; buf2.height = H; const bctx2 = buf2.getContext('2d');
const FT = .3; // crossfade length for tr: 'fade' (the outgoing shot keeps playing under the incoming one)
const WARP = window.WARP || null;
function warpMap(x, from, to) { const A = WARP.anchors; if (x <= A[0][from]) return x - A[0][from] + A[0][to]; for (let i = 0; i < A.length - 1; i++) if (x <= A[i + 1][from]) { const k = (x - A[i][from]) / (A[i + 1][from] - A[i][from]); return A[i][to] + k * (A[i + 1][to] - A[i][to]); } const L = A[A.length - 1]; return x - L[from] + L[to]; }
const toOld = t => WARP ? warpMap(t, 1, 0) : t, toNew = t => WARP ? warpMap(t, 0, 1) : t;
const DUR = WARP ? WARP.new_end + 0.6 : SHOTS[SHOTS.length - 1].end;
window.SHOT_SPANS = SHOTS.map((s, i) => [toNew(s.start), i === SHOTS.length - 1 ? DUR : toNew(s.end)]);
const TOTAL_FRAMES = Math.round(DUR * FPS);

// grain tiles
const grains = [];
for (let k = 0; k < 4; k++) { const g = document.createElement('canvas'); g.width = g.height = 256; const gc = g.getContext('2d'); const id = gc.createImageData(256, 256); const R = rng(k + 11); for (let i = 0; i < id.data.length; i += 4) { const v = 128 + (R() - .5) * 120; id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 255; } gc.putImageData(id, 0, 0); grains.push(g); }

// captions: 1-3 word chunks
const CHUNKS = (() => {
  const ch = []; let cur = null;
  WORDS.forEach((w, i) => {
    const prev = WORDS[i - 1];
    const CS = window.CAP_STYLE;
    const brk = !cur || cur.words.length >= (CS ? CS.maxWords || 3 : 2) || (CS && /[.,?!:\u2026"]$/.test(prev ? prev.w : '')) || (!CS && (cur.text + ' ' + w.w).replace(/\p{M}/gu, '').length > 13) || /[.,?!\u0964\u2026]$/.test(prev ? prev.w : '') || (prev && prev.line !== w.line);
    if (brk) { cur = { words: [w], text: w.w, s: w.s, e: w.e }; ch.push(cur); } else { cur.words.push(w); cur.text += ' ' + w.w; cur.e = w.e; }
  });
  ch.forEach((c, i) => { const n = ch[i + 1]; c.e = n && n.s - c.e < .5 ? n.s : c.e + .25; });
  return ch;
})();
// caption style: all lowercase, no punctuation (hyphens become spaces; letters, accents/vowel signs, digits and % stay)
const CAP_FONT = window.CAP_FONT || 'Poppins';
const capText = s => s.toLowerCase().replace(/[-\u2013\u2014]/g, ' ').replace(/[^\p{L}\p{M}\p{N}% ]/gu, '').replace(/\s+/g, ' ').trim();
function drawCaption(ctx, t) {
  if (window.NO_CAPTIONS) return;
  if (window.CAP_STYLE) return drawCaptionStyled(ctx, t, window.CAP_STYLE);
  const c = CHUNKS.find(c => t >= c.s && t < c.e); if (!c) return;
  const k = clamp((t - c.s) / .1); const sc = .82 + .18 * backOut(k);
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(540, 1345); ctx.scale(sc, sc);
  ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 5;
  text(ctx, capText(c.text), 0, 0, 70, '#fff', '#111', 13, CAP_FONT, 700);
  ctx.shadowColor = 'transparent'; text(ctx, capText(c.text), 0, 0, 70, '#fff', '#111', 0, CAP_FONT, 700);
  ctx.restore();
}
// CAP_STYLE: {maxWords, y, size, outline, maxWidth, yellow(word, index)} — the words exactly as written (case and
// punctuation kept), revealed one by one inside each 1-3 word chunk, with names and numbers in yellow
function drawCaptionStyled(ctx, t, CS) {
  const c = CHUNKS.find(c => t >= c.s && t < c.e); if (!c) return;
  const shown = c.words.filter((w, k) => k === 0 || t >= w.s);
  const last = shown[shown.length - 1]; const k = clamp((t - last.s) / .08); const sc = .9 + .1 * backOut(k);
  let size = CS.size || 72; const gap = size * .28;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  const meas = () => { ctx.font = `800 ${size}px ${CS.font || CAP_FONT}`; return shown.map(w => ctx.measureText(w.w).width); };
  let ws = meas(); let tot = ws.reduce((a, b) => a + b, 0) + gap * (ws.length - 1);
  const maxW = CS.maxWidth || 800; if (tot > maxW) { size *= maxW / tot; ws = meas(); tot = ws.reduce((a, b) => a + b, 0) + gap * (ws.length - 1); }
  ctx.translate(CS.x || 540, CS.y || 1280); ctx.scale(sc, sc);
  let x = -tot / 2;
  shown.forEach((w, i) => {
    const idx = WORDS.indexOf(w); const col = CS.yellow && CS.yellow(w.w, idx) ? '#ffd23a' : '#fff';
    ctx.font = `800 ${size}px ${CS.font || CAP_FONT}`; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
    ctx.shadowColor = 'rgba(0,0,0,.45)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 3;
    ctx.lineWidth = CS.outline || 7; ctx.strokeStyle = '#000'; ctx.strokeText(w.w, x, 0);
    ctx.shadowColor = 'transparent'; ctx.fillStyle = col; ctx.fillText(w.w, x, 0);
    x += ws[i] + gap;
  });
  ctx.restore();
}
function renderShot(ctx, i, t) {
  const s = SHOTS[i];
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.filter = 'none';
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  ctx.save(); s.draw(ctx, t - s.start, t); ctx.restore();
}
function blit(src, dx, blur) {
  // horizontal motion blur by averaging shifted copies
  const n = blur > 2 ? 9 : 1;
  out.save(); out.setTransform(1, 0, 0, 1, 0, 0);
  for (let k = 0; k < n; k++) { const off = n > 1 ? (k / (n - 1) - .5) * blur : 0; out.globalAlpha = 1 / (k + 1); const x = dx + off; out.drawImage(src, x, 0); if (x > 0) out.drawImage(src, x - W, 0); if (x < 0) out.drawImage(src, x + W, 0); }
  out.restore();
}
function renderFrame(f) {
  const tNew = f / FPS; const t = Math.min(toOld(tNew), SHOTS[SHOTS.length - 1].end - 1e-3);
  let i = SHOTS.findIndex(s => t >= s.start && t < s.end); if (i < 0) i = SHOTS.length - 1;
  const s = SHOTS[i];
  const WT = .2; // whip half-length (6 frames)
  out.setTransform(1, 0, 0, 1, 0, 0); out.fillStyle = '#000'; out.fillRect(0, 0, W, H);
  let dx = 0, blur = 0, done = false;
  // outgoing whip
  if (s.tr === 'whip' && i < SHOTS.length - 1 && t > s.end - WT) { const p = easeIn((t - (s.end - WT)) / WT); dx = -p * 420; blur = p * 260; }
  const prev = SHOTS[i - 1];
  if (prev && prev.tr === 'whip' && t < s.start + WT) { const p = 1 - easeOut((t - s.start) / WT); dx = p * 420; blur = p * 260; }
  renderShot(bctx, i, t);
  blit(buf, dx, blur);
  if (prev && prev.tr === 'fade' && t < s.start + FT) {
    renderShot(bctx2, i - 1, t);
    out.save(); out.setTransform(1, 0, 0, 1, 0, 0); out.globalAlpha = 1 - ease((t - s.start) / FT); out.drawImage(buf2, 0, 0); out.restore();
  }
  // grade: vignette + grain
  out.save(); out.setTransform(1, 0, 0, 1, 0, 0);
  const g = out.createRadialGradient(540, 900, 500, 540, 960, 1250); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(10,5,20,.32)'); out.fillStyle = g; out.fillRect(0, 0, W, H);
  out.globalCompositeOperation = 'overlay'; out.globalAlpha = .07; const gr = grains[f % 4]; const pat = out.createPattern(gr, 'repeat'); out.fillStyle = pat; out.translate((f * 37) % 256, (f * 91) % 256); out.fillRect(-256, -256, W + 512, H + 512);
  out.restore();
  drawCaption(out, tNew);
  if (window.OVERLAY) { out.save(); out.setTransform(1, 0, 0, 1, 0, 0); window.OVERLAY(out, tNew); out.restore(); } // e.g. a title card over the first seconds
}
window.renderFrame = renderFrame; window.TOTAL_FRAMES = TOTAL_FRAMES; window.DUR = DUR;
window.grab = (q = .93) => canvas.toDataURL('image/jpeg', q);
