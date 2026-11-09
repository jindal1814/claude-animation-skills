// ---------- Rama's ring: sets, props and characters ----------
const GOLD = '#e8b23a', GOLD_D = '#b9822a';
const RAMA = { cols: ['#f2b52a', '#f2b52a'], hat: 'none', belt: false };
const HANU = { cols: ['#e0602a', '#e0602a'], hat: 'none', belt: false };

// Rama: yellow dhoti, tall gold crown, tilak, bow on the shoulder
function rama(ctx, o) {
  const s = o.s, x = o.x, y = o.y, hx = x, hy = y - .765 * s, hr = .19 * s, lw = s * .014;
  if (o.bow !== false) { ctx.beginPath(); ctx.arc(x - .02 * s, y - .5 * s, .3 * s, -1.2, 1.2); ctx.lineWidth = s * .022; ctx.strokeStyle = '#8a4f24'; ctx.stroke(); line(ctx, x - .02 * s + Math.cos(-1.2) * .3 * s, y - .5 * s + Math.sin(-1.2) * .3 * s, x - .02 * s + Math.cos(1.2) * .3 * s, y - .5 * s + Math.sin(1.2) * .3 * s, s * .006, '#f3ecd8'); }
  drawStick(ctx, Object.assign({}, RAMA, o));
  // necklace
  ctx.beginPath(); ctx.arc(x, y - .62 * s, .09 * s, .3, Math.PI - .3); ctx.lineWidth = lw * 1.4; ctx.strokeStyle = GOLD; ctx.stroke();
  // tilak
  ctx.beginPath(); ctx.moveTo(hx - hr * .12, hy - hr * .62); ctx.lineTo(hx, hy - hr * .3); ctx.lineTo(hx + hr * .12, hy - hr * .62); ctx.lineWidth = lw; ctx.strokeStyle = '#d23a2a'; ctx.stroke();
  // crown (mukut)
  ctx.beginPath(); const cb = hy - hr * .7, ct = hy - hr * 1.75;
  ctx.moveTo(hx - hr * .75, cb); ctx.lineTo(hx - hr * .7, ct + hr * .45); ctx.lineTo(hx - hr * .38, ct + hr * .2); ctx.lineTo(hx, ct); ctx.lineTo(hx + hr * .38, ct + hr * .2); ctx.lineTo(hx + hr * .7, ct + hr * .45); ctx.lineTo(hx + hr * .75, cb); ctx.closePath();
  fillStroke(ctx, GOLD, lw);
  circle(ctx, hx, cb - hr * .45, hr * .14); fillStroke(ctx, '#d23a2a', lw * .8);
  for (const sd of [-1, 1]) { circle(ctx, hx + sd * hr * .45, cb - hr * .25, hr * .08); fillStroke(ctx, '#2f9a8a', lw * .6); }
  rrect(ctx, hx - hr * .8, cb - hr * .12, hr * 1.6, hr * .22, hr * .06); fillStroke(ctx, GOLD_D, lw);
}
// Hanuman: monkey face drawn over the head, tail behind, small crown, mace
function hanuman(ctx, o) {
  const s = o.s, x = o.x, y = o.y, fl = o.flip || 1, hx = x, hy = y - .765 * s, hr = .19 * s, lw = s * .014, f = o.face || {};
  // tail
  ctx.beginPath(); ctx.moveTo(x - fl * .05 * s, y - .32 * s); ctx.bezierCurveTo(x - fl * .45 * s, y - .25 * s, x - fl * .5 * s, y - .85 * s, x - fl * .28 * s, y - .95 * s + Math.sin((o.t || 0) * 3) * .03 * s);
  ctx.lineWidth = s * .035; ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.stroke(); ctx.lineWidth = s * .02; ctx.strokeStyle = '#b5652e'; ctx.stroke();
  const mace = o.mace;
  drawStick(ctx, Object.assign({}, HANU, o, { face: { eyes: 'x', mouth: 'flat', brow: false }, prop: mace ? (c, k, h) => { if (k === mace) { c.save(); c.translate(h[0], h[1]); c.rotate(-.5); line(c, 0, 0, 0, -.32, .025, INK); line(c, 0, 0, 0, -.32, .014, GOLD_D); circle(c, 0, -.4, .09); fillStroke(c, GOLD, .014); c.beginPath(); c.arc(0, -.4, .09, -2.5, -.6); c.lineWidth = .01; c.strokeStyle = GOLD_D; c.stroke(); c.restore(); } } : null }));
  // ears, fur, muzzle
  for (const sd of [-1, 1]) { circle(ctx, hx + sd * hr * 1.0, hy - hr * .05, hr * .3); fillStroke(ctx, '#b5652e', lw); circle(ctx, hx + sd * hr * 1.0, hy - hr * .05, hr * .15); ctx.fillStyle = '#f0c49a'; ctx.fill(); }
  circle(ctx, hx, hy, hr); fillStroke(ctx, '#b5652e', lw);
  ctx.beginPath(); ctx.moveTo(hx - hr * .75, hy - hr * .05); ctx.quadraticCurveTo(hx - hr * .55, hy - hr * .6, hx, hy - hr * .38); ctx.quadraticCurveTo(hx + hr * .55, hy - hr * .6, hx + hr * .75, hy - hr * .05);
  ctx.quadraticCurveTo(hx + hr * .85, hy + hr * .85, hx, hy + hr * .9); ctx.quadraticCurveTo(hx - hr * .85, hy + hr * .85, hx - hr * .75, hy - hr * .05); fillStroke(ctx, '#f0c49a', lw);
  ellipse(ctx, hx, hy + hr * .45, hr * .55, hr * .38); fillStroke(ctx, '#f7d7b5', lw * .8);
  // eyes
  const look = f.look || [0, 0];
  for (const sd of [-1, 1]) {
    const ex = hx + sd * hr * .33, ey = hy - hr * .08;
    if (f.eyes === 'closed') { ctx.beginPath(); ctx.arc(ex, ey, hr * .14, .3, Math.PI - .3); ctx.lineWidth = lw; ctx.strokeStyle = INK; ctx.stroke(); continue; }
    const r = hr * (f.eyes === 'wide' ? .2 : .16); ellipse(ctx, ex, ey, r, r * (1 - (f.blink || 0) * .9)); fillStroke(ctx, '#fff', lw * .8);
    circle(ctx, ex + look[0] * r * .4, ey + look[1] * r * .4, r * .5); ctx.fillStyle = INK; ctx.fill();
    line(ctx, ex - hr * .16, ey - hr * (.3 + (f.browUp || 0) * .08) + sd * hr * (f.browAng || 0) * .1, ex + hr * .16, ey - hr * (.3 + (f.browUp || 0) * .08) - sd * hr * (f.browAng || 0) * .1, lw, INK);
  }
  circle(ctx, hx - hr * .08, hy + hr * .3, hr * .035); ctx.fillStyle = INK; ctx.fill(); circle(ctx, hx + hr * .08, hy + hr * .3, hr * .035); ctx.fill();
  const m = f.mouth || 'smile', my = hy + hr * .55;
  if (m === 'o') { ellipse(ctx, hx, my, hr * .12, hr * .15); fillStroke(ctx, '#5a1e24', lw * .8); }
  else if (m === 'frown') { ctx.beginPath(); ctx.arc(hx, my + hr * .2, hr * .2, Math.PI + .6, -.6); ctx.lineWidth = lw; ctx.strokeStyle = INK; ctx.stroke(); }
  else if (m === 'flat') line(ctx, hx - hr * .15, my, hx + hr * .15, my, lw);
  else { ctx.beginPath(); ctx.arc(hx, my - hr * .15, hr * .25, .45, Math.PI - .45); ctx.lineWidth = lw; ctx.strokeStyle = INK; ctx.stroke(); }
  // small crown
  ctx.beginPath(); const cb = hy - hr * .85; ctx.moveTo(hx - hr * .45, cb); ctx.lineTo(hx - hr * .4, cb - hr * .35); ctx.lineTo(hx, cb - hr * .6); ctx.lineTo(hx + hr * .4, cb - hr * .35); ctx.lineTo(hx + hr * .45, cb); ctx.closePath(); fillStroke(ctx, GOLD, lw);
  circle(ctx, hx, cb - hr * .25, hr * .08); fillStroke(ctx, '#d23a2a', lw * .6);
}
function folded(s) { return { L: { ik: [-.02, -.6] }, R: { ik: [.02, -.6] } }; } // hands joined in front of the chest
function bhoot(ctx, x, y, s, t, o = {}) {
  ctx.save(); ctx.globalAlpha = o.alpha == null ? .95 : o.alpha;
  glowDisk(ctx, x, y - .5 * s, .55 * s, .18, '170,120,255');
  drawStick(ctx, Object.assign({ x, y, s, sil: '#5a3590', eyesGlow: true, shadow: false, hat: 'none', face: { eyes: o.eyes || 'normal' } }, o));
  // wispy bottom
  ctx.beginPath(); for (let i = 0; i <= 8; i++) { const xx = x - .14 * s + i * .035 * s; ctx.lineTo(xx, y - .25 * s + Math.sin(i * 1.7 + t * 6) * .04 * s + (i % 2) * .05 * s); } ctx.lineTo(x + .14 * s, y - .35 * s); ctx.lineTo(x - .14 * s, y - .35 * s); ctx.closePath(); ctx.fillStyle = '#5a3590'; ctx.fill();
  ctx.restore();
}
function spiritKing(ctx, x, y, s, t, o = {}) {
  // throne of bones behind
  ctx.save(); ctx.translate(x, y); ctx.scale(s / 1000, s / 1000);
  rrect(ctx, -330, -1150, 660, 1150, 60); fillStroke(ctx, '#3a2a4a', 12);
  for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * .32; ellipse(ctx, Math.cos(a) * 360, -1080 + Math.sin(a) * 120 + 120, 40, 75, a + Math.PI / 2); fillStroke(ctx, '#e8e0cc', 9); }
  for (const sd of [-1, 1]) { circle(ctx, sd * 330, -560, 70); fillStroke(ctx, '#e8e0cc', 9); circle(ctx, sd * 330 - 22, -570, 14); ctx.fillStyle = INK; ctx.fill(); circle(ctx, sd * 330 + 22, -570, 14); ctx.fill(); }
  ctx.restore();
  drawStick(ctx, Object.assign({ x, y, s, sil: '#1c0f2e', eyesGlow: true, shadow: false, hat: 'none', face: o.face || { eyes: 'normal' } }, o));
  // crown of spikes
  const hx = x, hy = y - .765 * s, hr = .19 * s;
  ctx.beginPath(); ctx.moveTo(hx - hr * .9, hy - hr * .7); for (let i = 0; i <= 6; i++) { ctx.lineTo(hx - hr * .9 + i * hr * .3, hy - hr * (i % 2 ? 1.0 : 1.6)); } ctx.lineTo(hx + hr * .9, hy - hr * .7); ctx.closePath(); fillStroke(ctx, '#8a7a5a', s * .012);
  if (o.grin) { ctx.beginPath(); ctx.arc(hx, hy + hr * .2, hr * .45, .3, Math.PI - .3); ctx.lineWidth = s * .014; ctx.strokeStyle = '#ffd45a'; ctx.stroke(); }
}
// ---------- sets ----------
function drawCourt(ctx, dim = 0, t = 0) {
  const g = ctx.createLinearGradient(0, -400, 0, 1500); g.addColorStop(0, mix('#f6d9a0', '#140c08', dim)); g.addColorStop(1, mix('#e9b86a', '#140c08', dim));
  ctx.fillStyle = g; ctx.fillRect(-900, -900, 2900, 3000);
  // scalloped arches
  for (const ax of [-120, 540, 1200]) {
    ctx.beginPath(); ctx.moveTo(ax - 260, 1150); ctx.lineTo(ax - 260, 520);
    for (let k = 0; k < 5; k++) { const a0 = Math.PI + k * Math.PI / 5; ctx.arc(ax + Math.cos(a0 + Math.PI / 10) * 200, 520 + Math.sin(a0 + Math.PI / 10) * 200, 55, a0 + Math.PI, a0 + Math.PI / 5 + Math.PI, true); }
    ctx.lineTo(ax + 260, 1150); ctx.closePath(); fillStroke(ctx, mix('#f9ead0', '#1a120a', dim), 10);
  }
  for (const px of [190, 890]) { rrect(ctx, px - 50, 160, 100, 1000, 10); fillStroke(ctx, mix('#d98a4a', '#140a06', dim), 9); for (let y = 200; y < 1150; y += 130) { rrect(ctx, px - 60, y, 120, 26, 8); fillStroke(ctx, mix(GOLD, '#140a06', dim), 6); } }
  // drapes
  for (const [x0, sd] of [[-40, 1], [1120, -1]]) { ctx.beginPath(); ctx.moveTo(x0, 80); ctx.quadraticCurveTo(x0 + sd * 260, 120, x0 + sd * 300, 80); ctx.lineTo(x0 + sd * 120, 900); ctx.lineTo(x0, 900); ctx.closePath(); fillStroke(ctx, mix('#b8232f', '#12060a', dim), 9); }
  // marble floor
  ctx.fillStyle = mix('#f3e6cf', '#120c08', dim); ctx.fillRect(-900, 1150, 2900, 1400);
  for (let i = 0; i < 26; i++) { const bx = -1800 + i * 160; line(ctx, 540 + (bx - 540) * .3, 1150, bx, 2600, 4, mix('#d8c4a0', '#000', dim)); }
  for (let r = 0; r < 6; r++) line(ctx, -900, 1150 + r * r * 30 + r * 40, 2000, 1150 + r * r * 30 + r * 40, 4, mix('#d8c4a0', '#000', dim));
  line(ctx, -900, 1150, 2000, 1150, 9, INK);
}
function drawThrone(ctx, x, y, s, dim = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  // royal umbrella (chhatra)
  line(ctx, 0, -1150, 0, -560, 12, INK); ctx.beginPath(); ctx.moveTo(-260, -1000); ctx.quadraticCurveTo(0, -1260, 260, -1000); ctx.closePath(); fillStroke(ctx, mix('#fff3d6', '#120c08', dim), 9);
  for (let i = -5; i <= 5; i++) { circle(ctx, i * 48, -995, 14); fillStroke(ctx, mix(GOLD, '#120c08', dim), 5); }
  ctx.beginPath(); ctx.moveTo(-250, -560); ctx.quadraticCurveTo(-270, -880, 0, -900); ctx.quadraticCurveTo(270, -880, 250, -560); ctx.closePath(); fillStroke(ctx, mix(GOLD, '#120c08', dim), 10);
  ctx.beginPath(); ctx.moveTo(-200, -580); ctx.quadraticCurveTo(-210, -820, 0, -835); ctx.quadraticCurveTo(210, -820, 200, -580); ctx.closePath(); fillStroke(ctx, mix('#b8232f', '#12060a', dim), 7);
  rrect(ctx, -300, -330, 600, 140, 30); fillStroke(ctx, mix('#b8232f', '#12060a', dim), 10);
  rrect(ctx, -320, -200, 640, 200, 20); fillStroke(ctx, mix(GOLD, '#120c08', dim), 10);
  for (const sd of [-1, 1]) { rrect(ctx, sd * 300 - 40, -480, 80, 300, 30); fillStroke(ctx, mix(GOLD_D, '#120c08', dim), 9); circle(ctx, sd * 300, -500, 46); fillStroke(ctx, mix(GOLD, '#120c08', dim), 8); }
  ctx.restore();
}
function drawCrack(ctx, x, y, w, glow = 0, t = 0) {
  if (glow > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(x, y, 10, x, y, w * 1.4); g.addColorStop(0, `rgba(170,110,255,${.6 * glow})`); g.addColorStop(1, 'rgba(120,60,220,0)'); ctx.fillStyle = g; ctx.fillRect(x - w * 2, y - w * 2, w * 4, w * 4); ctx.restore(); }
  path(ctx, [[x - w, y], [x - w * .6, y - w * .08], [x - w * .3, y + w * .05], [x, y - w * .1], [x + w * .35, y + w * .04], [x + w, y - w * .02], [x + w * .5, y + w * .12], [x + w * .1, y + w * .2], [x - w * .4, y + w * .14]]);
  fillStroke(ctx, '#0e0716', 7);
}
function drawNether(ctx, t, dim = 0) {
  const g = ctx.createLinearGradient(0, -400, 0, 2000); g.addColorStop(0, mix('#3a1f5c', '#05020a', dim)); g.addColorStop(1, mix('#120822', '#05020a', dim));
  ctx.fillStyle = g; ctx.fillRect(-900, -900, 2900, 3200);
  // stalactites
  const R = rng(13);
  for (let i = 0; i < 14; i++) { const x = -200 + i * 110 + R() * 40, h = 160 + R() * 260; path(ctx, [[x - 55, -100], [x + 55, -100], [x + 6, h]]); fillStroke(ctx, mix('#2a1640', '#04020a', dim), 7); }
  // glowing fungi on the ground
  ctx.fillStyle = mix('#1d0f30', '#04020a', dim); ctx.fillRect(-900, 1380, 2900, 1200); line(ctx, -900, 1380, 2000, 1380, 8, INK);
  for (let i = 0; i < 9; i++) { const x = -100 + i * 160 + R() * 60, y = 1390 + R() * 40, r = 26 + R() * 30; ctx.save(); ctx.globalCompositeOperation = 'lighter'; circle(ctx, x, y - r, r * 3); ctx.fillStyle = `rgba(80,230,200,${.08 * (1 - dim)})`; ctx.fill(); ctx.restore(); line(ctx, x, y, x, y - r, 7, INK); ellipse(ctx, x, y - r, r, r * .6); fillStroke(ctx, mix('#4fd8c0', '#05020a', dim), 6); }
  // drifting mist
  for (let i = 0; i < 6; i++) { ctx.save(); ctx.globalAlpha = .12 * (1 - dim); ellipse(ctx, ((i * 260 + t * 30) % 1600) - 250, 1250 + (i % 3) * 60, 260, 40); ctx.fillStyle = '#c9b6ff'; ctx.fill(); ctx.restore(); }
}
function drawThali(ctx, x, y, r, o = {}) {
  ellipse(ctx, x, y + r * .06, r * 1.04, r * .34); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fill();
  ellipse(ctx, x, y, r, r * .32); fillStroke(ctx, '#d9a441', r * .03);
  ellipse(ctx, x, y - r * .02, r * .86, r * .26); fillStroke(ctx, '#e9bf5c', r * .02);
  if (o.veg) { // katoris and vegetables
    for (const [dx, col] of [[-.55, '#e0a020'], [.55, '#4f9a3a']]) { ellipse(ctx, x + dx * r, y - r * .05, r * .2, r * .08); fillStroke(ctx, '#c9a24a', r * .02); ellipse(ctx, x + dx * r, y - r * .08, r * .15, r * .05); ctx.fillStyle = col; ctx.fill(); }
    circle(ctx, x - r * .3, y + r * .08, r * .09); fillStroke(ctx, '#d8312b', r * .015); circle(ctx, x + r * .32, y + r * .1, r * .08); fillStroke(ctx, '#8a5a2a', r * .015);
  }
}
function drawRing(ctx, x, y, r, rot = 0, glint = 0, engr = true) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ellipse(ctx, 0, r * .2, r, r * .55); ctx.lineWidth = r * .32; ctx.strokeStyle = INK; ctx.stroke(); ctx.lineWidth = r * .2; ctx.strokeStyle = GOLD; ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, r * .2, r, r * .55, 0, Math.PI * .1, Math.PI * .6); ctx.lineWidth = r * .07; ctx.strokeStyle = '#fff3c4'; ctx.stroke();
  ellipse(ctx, 0, -r * .32, r * .62, r * .36); fillStroke(ctx, GOLD, r * .1);
  ellipse(ctx, 0, -r * .34, r * .48, r * .26); fillStroke(ctx, GOLD_D, r * .05);
  if (engr && r > 14) text(ctx, 'राम', 0, -r * .32, r * .38, '#fff1c2', INK, 0, 'Deva', 800);
  if (glint > 0) sparkle(ctx, r * .5, -r * .6, r * .9 * glint, glint);
  ctx.restore();
}
function ringPile(ctx, cx, cy, w, h, n, t, seed = 3, engr = false) {
  const R = rng(seed); const items = [];
  for (let i = 0; i < n; i++) { const a = R(), b = R(); const x = cx + (a - .5) * w * Math.sqrt(1 - Math.pow(b * 2 - 1, 2)) * 1.0, y = cy + (b - .5) * h; items.push([x, y, R(), R()]); }
  items.sort((p, q) => p[1] - q[1]);
  for (const [x, y, k, g] of items) drawRing(ctx, x, y, 22 + k * 10, (k - .5) * .8, Math.max(0, Math.sin(t * 2 + g * 30) - .9) * 8, engr);
}
function devText(ctx, str, x, y, size, a = 1, col = '#ffe7a0') {
  if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.shadowColor = 'rgba(255,200,80,.9)'; ctx.shadowBlur = size * .5;
  text(ctx, str, x, y, size, col, INK, size * .08, 'Poppins', 700); ctx.restore();
}
function glowDisk(ctx, x, y, r, a, col = '255,214,110') { if (a <= 0) return; ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore(); }
