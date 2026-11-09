// ---------- Garfield 1881: sets, props and character extras ----------
// characters: drawStick plus beards, moustaches and top hats drawn on top (keep headTilt/lean at 0 for these)
const GAR = { cols: ['#f3efe4', '#f3efe4'], hat: 'none', belt: false, look: { beard: '#8a6646', side: '#8a6646' } };
const GAR_SUIT = { cols: ['#2f2b38', '#2f2b38'], hat: 'none', belt: false, look: { beard: '#8a6646', side: '#8a6646', tophat: true } };
const DOCS = [
  { cols: ['#2b2733', '#2b2733'], hat: 'none', belt: false, look: { mous: '#5a3e2c', side: '#5a3e2c' } },
  { cols: ['#45385a', '#45385a'], hat: 'none', belt: false, look: { mous: '#b9b2a8', side: '#b9b2a8', bald: true } },
  { cols: ['#5a3f2a', '#5a3f2a'], hat: 'none', belt: false, look: { beard: '#3a2a20', side: '#3a2a20' } },
];
const BLISS = { cols: ['#1f1c26', '#1f1c26'], hat: 'none', belt: false, look: { mous: '#cfc8bd', side: '#cfc8bd', tophat: true } };
const BELL = { cols: ['#6b4f3a', '#6b4f3a'], hat: 'none', belt: false, look: { beard: '#2f2624', side: '#2f2624' } };

function person(ctx, base, o) {
  const p = Object.assign({}, base, o);
  drawStick(ctx, p);
  const L = base.look || {}; const s = p.s, hx = p.x, hy = p.y - .765 * s * (p.squash || 1), hr = .19 * s, lw = s * .014;
  const f = (p.face || {});
  if (L.side) { for (const sd of [-1, 1]) { ellipse(ctx, hx + sd * hr * .93, hy - hr * .25, hr * .16, hr * .32, sd * .2); fillStroke(ctx, L.side, lw); } }
  if (L.bald) { ellipse(ctx, hx - hr * .3, hy - hr * .6, hr * .22, hr * .1, -.4); ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fill(); }
  if (L.beard) {
    ctx.beginPath(); ctx.moveTo(hx - hr * .97, hy - hr * .05);
    ctx.quadraticCurveTo(hx - hr * 1.08, hy + hr * 1.15, hx, hy + hr * 1.55);
    ctx.quadraticCurveTo(hx + hr * 1.08, hy + hr * 1.15, hx + hr * .97, hy - hr * .05);
    ctx.quadraticCurveTo(hx + hr * .62, hy + hr * .28, hx + hr * .2, hy + hr * .3);
    ctx.quadraticCurveTo(hx, hy + hr * .22, hx - hr * .2, hy + hr * .3);
    ctx.quadraticCurveTo(hx - hr * .62, hy + hr * .28, hx - hr * .97, hy - hr * .05); ctx.closePath();
    fillStroke(ctx, L.beard, lw);
    // texture strokes
    ctx.save(); ctx.globalAlpha = .35; for (let i = -3; i <= 3; i++) line(ctx, hx + i * hr * .2, hy + hr * .7, hx + i * hr * .16, hy + hr * 1.15, lw * .6, '#2a1a12'); ctx.restore();
  }
  if (L.mous) {
    ctx.beginPath(); const my = hy + hr * .33;
    ctx.moveTo(hx, my - hr * .08); ctx.quadraticCurveTo(hx + hr * .35, my - hr * .2, hx + hr * .55, my + hr * .12); ctx.quadraticCurveTo(hx + hr * .3, my + hr * .05, hx, my + hr * .08);
    ctx.quadraticCurveTo(hx - hr * .3, my + hr * .05, hx - hr * .55, my + hr * .12); ctx.quadraticCurveTo(hx - hr * .35, my - hr * .2, hx, my - hr * .08);
    fillStroke(ctx, L.mous, lw);
  }
  if (L.beard) { // mouth drawn on the beard
    const mx = hx, my = hy + hr * .55, m = f.mouth || 'flat';
    if (m === 'o' || m === 'grin' || m === 'teeth') { ellipse(ctx, mx, my, hr * .14, hr * (m === 'o' ? .16 : .1)); fillStroke(ctx, '#4a1c22', lw * .8); }
    else if (m === 'frown') { ctx.beginPath(); ctx.arc(mx, my + hr * .18, hr * .17, Math.PI + .6, -.6); ctx.lineWidth = lw; ctx.strokeStyle = '#2a140f'; ctx.stroke(); }
    else if (m === 'smile' || m === 'smirk') { ctx.beginPath(); ctx.arc(mx, my - hr * .12, hr * .17, .5, Math.PI - .5); ctx.lineWidth = lw; ctx.strokeStyle = '#2a140f'; ctx.stroke(); }
    else line(ctx, mx - hr * .12, my, mx + hr * .12, my, lw, '#2a140f');
  }
  if (L.tophat) {
    rrect(ctx, hx - hr * .68, hy - hr * 2.05, hr * 1.36, hr * 1.25, hr * .08); fillStroke(ctx, '#1b1820', lw);
    ctx.fillStyle = '#6a2430'; ctx.fillRect(hx - hr * .68 + lw / 2, hy - hr * 1.05, hr * 1.36 - lw, hr * .18);
    ellipse(ctx, hx, hy - hr * .8, hr * 1.1, hr * .16); fillStroke(ctx, '#1b1820', lw);
  }
}

// ---------- sets ----------
function drawRoom(ctx, dim = 0) {
  const wall = mix('#e8d6ae', '#140f16', dim), stripe = mix('#d6bf8e', '#120d14', dim);
  ctx.fillStyle = wall; ctx.fillRect(-900, -900, 2900, 2400);
  ctx.fillStyle = stripe; for (let x = -900; x < 2000; x += 90) ctx.fillRect(x, -900, 26, 2400);
  ctx.fillStyle = mix('#c9a874', '#0e0a10', dim); for (let x = -855; x < 2000; x += 90) for (let y = -880; y < 1300; y += 120) { circle(ctx, x, y, 7); ctx.fill(); }
  // window
  rrect(ctx, 690, 330, 300, 470, 10); fillStroke(ctx, mix('#8fc9ef', '#0c1420', dim), 10);
  line(ctx, 840, 330, 840, 800, 9, INK); line(ctx, 690, 565, 990, 565, 9, INK);
  for (const [x0, sd] of [[690, -1], [990, 1]]) { ctx.beginPath(); ctx.moveTo(x0 - sd * 10, 300); ctx.quadraticCurveTo(x0 + sd * 50, 560, x0 + sd * 20, 840); ctx.lineTo(x0 - sd * 80, 840); ctx.lineTo(x0 - sd * 70, 300); ctx.closePath(); fillStroke(ctx, mix('#a8323a', '#12080a', dim), 8); }
  rrect(ctx, 600, 282, 480, 30, 8); fillStroke(ctx, mix('#c9963c', '#100c08', dim), 6);
  // framed painting
  rrect(ctx, 40, 360, 250, 190, 6); fillStroke(ctx, mix('#c9963c', '#100c08', dim), 8);
  rrect(ctx, 62, 382, 206, 146, 2); fillStroke(ctx, mix('#7fb8a0', '#0b1210', dim), 4);
  ctx.beginPath(); ctx.moveTo(62, 500); ctx.quadraticCurveTo(140, 430, 268, 490); ctx.lineTo(268, 528); ctx.lineTo(62, 528); ctx.closePath(); fillStroke(ctx, mix('#4f8a52', '#08100a', dim), 3);
  // wainscot + floor
  ctx.fillStyle = mix('#7a4a2c', '#0c0806', dim); ctx.fillRect(-900, 1120, 2900, 330);
  for (let x = -900; x < 2000; x += 180) { rrect(ctx, x + 20, 1150, 140, 250, 6); fillStroke(ctx, null, 5); }
  line(ctx, -900, 1120, 2000, 1120, 10, INK);
  ctx.fillStyle = mix('#9a6a40', '#0d0906', dim); ctx.fillRect(-900, 1440, 2900, 1200);
  for (let i = 0; i < 26; i++) { const bx = -1800 + i * 160; line(ctx, 540 + (bx - 540) * .35, 1440, bx, 2600, 4, mix('#6e4626', '#000', dim)); }
  line(ctx, -900, 1440, 2000, 1440, 8, INK);
}
function drawBed(ctx, x, y, s = 1, o = {}) {
  // front view of an iron bed; y = top of mattress at the front. o.see = springs cutaway 0..1, o.buzz
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const iron = '#3b3a44';
  // headboard
  for (const sx of [-360, 360]) { rrect(ctx, sx - 16, -760, 32, 900, 12); fillStroke(ctx, iron, 6); circle(ctx, sx, -770, 26); fillStroke(ctx, '#c9a24a', 6); }
  ctx.beginPath(); ctx.moveTo(-360, -690); ctx.quadraticCurveTo(0, -820, 360, -690); ctx.lineWidth = 22; ctx.strokeStyle = iron; ctx.stroke();
  for (let i = -5; i <= 5; i++) line(ctx, i * 58, -700 - (1 - Math.abs(i) / 6) * 50, i * 58, -120, 12, iron);
  // pillow
  ellipse(ctx, 0, -470, 260, 95); fillStroke(ctx, '#fbf8f0', 7);
  ctx.restore();
  if (o.person) o.person();
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  // blanket over the lap and legs
  ctx.beginPath(); ctx.moveTo(-380, -230); ctx.quadraticCurveTo(0, -270, 380, -230); ctx.lineTo(400, 40); ctx.lineTo(-400, 40); ctx.closePath(); fillStroke(ctx, '#3f6fb2', 7);
  ctx.save(); ctx.clip(); ctx.fillStyle = '#c7d9f0'; for (let i = -6; i <= 6; i++) ctx.fillRect(i * 70 - 6, -300, 12, 400); ctx.fillStyle = 'rgba(20,10,40,.18)'; ctx.fillRect(160, -300, 300, 400); ctx.restore();
  ctx.beginPath(); ctx.moveTo(-380, -230); ctx.quadraticCurveTo(0, -270, 380, -230); ctx.lineTo(380, -200); ctx.quadraticCurveTo(0, -238, -380, -200); ctx.closePath(); fillStroke(ctx, '#fbf8f0', 6);
  // mattress side (springs inside)
  const see = o.see || 0;
  rrect(ctx, -400, 40, 800, 120, 14); fillStroke(ctx, mix('#efe6d2', '#2a2430', see * .85), 7);
  if (see > 0) {
    const bz = o.buzz || 0;
    for (let i = 0; i < 9; i++) {
      const cx = -340 + i * 85, jx = bz * Math.sin(i * 7 + (o.t || 0) * 60) * 5;
      ctx.beginPath(); for (let k = 0; k <= 8; k++) { const yy = 55 + k * 11.5; ctx.lineTo(cx + jx + (k % 2 ? 26 : -26), yy); }
      ctx.lineWidth = 7; ctx.strokeStyle = `rgba(${bz > 0 ? '255,214,90' : '190,196,210'},${see})`; ctx.stroke();
      if (bz > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; circle(ctx, cx, 100, 40); ctx.fillStyle = `rgba(255,220,90,${.25 * bz * see})`; ctx.fill(); ctx.restore(); }
    }
  }
  // frame + legs
  rrect(ctx, -410, 160, 820, 34, 8); fillStroke(ctx, iron, 6);
  for (const sx of [-380, 380]) { rrect(ctx, sx - 16, 120, 32, 260, 10); fillStroke(ctx, iron, 6); }
  ctx.restore();
}
function drawStation(ctx, t) {
  ctx.fillStyle = '#b8603e'; ctx.fillRect(-900, -900, 2900, 2400);
  ctx.fillStyle = 'rgba(80,20,10,.18)'; for (let y = -900; y < 1500; y += 44) for (let x = -900 + ((y / 44) % 2) * 50; x < 2000; x += 100) ctx.fillRect(x, y, 96, 40);
  // tall arched windows with light
  for (const ax of [120, 540, 960]) {
    ctx.beginPath(); ctx.moveTo(ax - 140, 1050); ctx.lineTo(ax - 140, 520); ctx.arc(ax, 520, 140, Math.PI, 0); ctx.lineTo(ax + 140, 1050); ctx.closePath(); fillStroke(ctx, '#ffe9b8', 12);
    ctx.save(); ctx.clip(); ctx.fillStyle = '#ffd98a'; ctx.fillRect(ax - 140, 820, 280, 240); line(ctx, ax, 380, ax, 1050, 8, INK); for (let y = 560; y < 1050; y += 120) line(ctx, ax - 140, y, ax + 140, y, 8, INK); ctx.restore();
    lightShaft(ctx, ax, 560, 260, 520, 1100, .45);
  }
  // 1881 plaque
  rrect(ctx, 330, 190, 420, 130, 14); fillStroke(ctx, '#2a3a2e', 8); rrect(ctx, 345, 205, 390, 100, 8); fillStroke(ctx, null, 4, '#c9a24a');
  text(ctx, '1881', 540, 258, 84, '#f3d27a', INK, 0, 'Lora', 700);
  // floor tiles
  ctx.fillStyle = '#d9cfbd'; ctx.fillRect(-900, 1150, 2900, 1400);
  for (let r = 0; r < 12; r++) for (let c = -12; c < 14; c++) if ((r + c) % 2 === 0) { const y0 = 1150 + r * r * 9 + r * 40, y1 = 1150 + (r + 1) * (r + 1) * 9 + (r + 1) * 40; const sc0 = 1 + r * .18, sc1 = 1 + (r + 1) * .18; path(ctx, [[540 + (c * 90 - 540) * sc0 * .5 + 270, y0], [540 + ((c + 1) * 90 - 540) * sc0 * .5 + 270, y0], [540 + ((c + 1) * 90 - 540) * sc1 * .5 + 270, y1], [540 + (c * 90 - 540) * sc1 * .5 + 270, y1]]); ctx.fillStyle = '#8f8576'; ctx.fill(); }
  line(ctx, -900, 1150, 2000, 1150, 10, INK);
}
// ---------- props ----------
function drawBullet(ctx, x, y, s, rot = 0, face = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-60, -40); ctx.lineTo(10, -40); ctx.quadraticCurveTo(80, -40, 90, 0); ctx.quadraticCurveTo(80, 40, 10, 40); ctx.lineTo(-60, 40); ctx.closePath(); fillStroke(ctx, '#a7adb7', 7);
  ctx.save(); ctx.clip(); ctx.fillStyle = 'rgba(30,20,50,.22)'; ctx.fillRect(-70, 12, 170, 40); ctx.fillStyle = 'rgba(255,255,255,.45)'; ellipse(ctx, 10, -22, 50, 8); ctx.fill(); ctx.restore();
  line(ctx, -40, -40, -40, 40, 5, 'rgba(34,28,34,.5)');
  // face
  const e = face.eyes || 'normal';
  for (const sx of [0, 36]) {
    if (e === 'closed') { ctx.beginPath(); ctx.arc(sx, -4, 9, .2, Math.PI - .2); ctx.lineWidth = 5; ctx.strokeStyle = INK; ctx.stroke(); }
    else if (e === 'happy') { ctx.beginPath(); ctx.arc(sx, 2, 9, Math.PI + .2, -.2); ctx.lineWidth = 5; ctx.strokeStyle = INK; ctx.stroke(); }
    else { ellipse(ctx, sx, -4, 10, e === 'wide' ? 14 : 11); fillStroke(ctx, '#fff', 4); const lk = face.look || [0, 0]; circle(ctx, sx + lk[0] * 4, -4 + lk[1] * 4, 5); ctx.fillStyle = INK; ctx.fill(); }
  }
  const m = face.mouth || 'smile';
  if (m === 'o') { ellipse(ctx, 18, 20, 7, 9); fillStroke(ctx, '#5a1e24', 3); }
  else if (m === 'flat') line(ctx, 10, 20, 28, 20, 5);
  else if (m === 'frown') { ctx.beginPath(); ctx.arc(18, 30, 10, Math.PI + .6, -.6); ctx.lineWidth = 5; ctx.strokeStyle = INK; ctx.stroke(); }
  else { ctx.beginPath(); ctx.arc(18, 12, 11, .5, Math.PI - .5); ctx.lineWidth = 5; ctx.strokeStyle = INK; ctx.stroke(); }
  ctx.restore();
}
function drawGerm(ctx, x, y, r, t, seed = 1, angry = 1) {
  const R = rng(seed); const ph = R() * TAU;
  ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t * 3 + ph) * .2);
  ctx.beginPath(); const n = 14;
  for (let i = 0; i <= n; i++) { const a = i / n * TAU; const rr = r * (1 + .12 * Math.sin(a * 5 + t * 6 + ph)); i ? ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) : ctx.moveTo(Math.cos(a) * rr, Math.sin(a) * rr); }
  ctx.closePath(); fillStroke(ctx, ['#7bc84f', '#5fb85a', '#9acd3c'][seed % 3], r * .12);
  for (let i = 0; i < 6; i++) { const a = i / 6 * TAU + ph; line(ctx, Math.cos(a) * r, Math.sin(a) * r, Math.cos(a) * r * 1.3, Math.sin(a) * r * 1.3, r * .1); circle(ctx, Math.cos(a) * r * 1.35, Math.sin(a) * r * 1.35, r * .1); ctx.fillStyle = INK; ctx.fill(); }
  for (const sx of [-1, 1]) { circle(ctx, sx * r * .32, -r * .1, r * .2); fillStroke(ctx, '#fff', r * .07); circle(ctx, sx * r * .28, -r * .06, r * .09); ctx.fillStyle = INK; ctx.fill(); if (angry) line(ctx, sx * r * .55, -r * .45, sx * r * .12, -r * .28, r * .1); }
  ctx.beginPath(); ctx.arc(0, r * .45, r * .25, Math.PI + .3, -.3); ctx.lineWidth = r * .09; ctx.strokeStyle = INK; ctx.stroke();
  ctx.restore();
}
function drawFinger(ctx, x, y, s, rot = 0, dirt = 1) {
  // a big pointing hand, fingertip at (x, y), arm coming from below
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  rrect(ctx, -110, 330, 220, 900, 30); fillStroke(ctx, '#2b2733', 10); // sleeve
  rrect(ctx, -120, 300, 240, 70, 16); fillStroke(ctx, '#f6f2ea', 8); // cuff
  rrect(ctx, -105, 140, 210, 190, 60); fillStroke(ctx, '#f0c39a', 9); // fist
  for (let i = 0; i < 3; i++) { rrect(ctx, -30 + i * 42, 150, 40, 120, 20); fillStroke(ctx, '#e8b88e', 7); }
  rrect(ctx, -92, 0, 64, 230, 32); fillStroke(ctx, '#f0c39a', 9); // index finger
  rrect(ctx, -82, 8, 44, 40, 14); fillStroke(ctx, '#f8e3d0', 5); // nail
  line(ctx, -84, 110, -42, 110, 5, 'rgba(34,28,34,.5)'); line(ctx, -84, 125, -48, 125, 5, 'rgba(34,28,34,.5)');
  if (dirt > 0) { ctx.save(); ctx.globalAlpha = dirt; ctx.fillStyle = '#6b4a2a'; const R = rng(9); for (let i = 0; i < 14; i++) { ellipse(ctx, -90 + R() * 200, 10 + R() * 300, 6 + R() * 12, 4 + R() * 8, R() * 3); ctx.fill(); } ctx.restore(); }
  ctx.restore();
}
function stinkLines(ctx, x, y, t, a = 1, col = '#7bc84f') {
  ctx.save(); ctx.globalAlpha = a;
  for (let i = 0; i < 3; i++) { ctx.beginPath(); const x0 = x + (i - 1) * 50; for (let k = 0; k <= 12; k++) { const yy = y - k * 14 - ((t * 120) % 40); ctx.lineTo(x0 + Math.sin(k * .8 + t * 5 + i) * 14, yy); } ctx.lineWidth = 9; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.stroke(); }
  ctx.restore();
}
function drawDetector(ctx, hand, tip, coilR = 70, glow = 0) {
  // handle from hand to tip, flat search coil at tip
  line(ctx, hand[0], hand[1], tip[0], tip[1], 14, '#6b4a2c'); line(ctx, hand[0], hand[1], tip[0], tip[1], 6, '#9a6a40');
  if (glow > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; circle(ctx, tip[0], tip[1], coilR * 2); ctx.fillStyle = `rgba(255,220,100,${.35 * glow})`; ctx.fill(); ctx.restore(); }
  ellipse(ctx, tip[0], tip[1], coilR, coilR * .45); fillStroke(ctx, '#c97a3a', 10);
  ellipse(ctx, tip[0], tip[1], coilR * .62, coilR * .25); fillStroke(ctx, '#e7c27a', 6);
  rrect(ctx, hand[0] - 40, hand[1] - 30, 80, 60, 10); fillStroke(ctx, '#8a5a32', 6); circle(ctx, hand[0], hand[1], 14); fillStroke(ctx, '#e8e2d2', 4);
}
function buzzLines(ctx, x, y, r, t, a = 1) {
  if (a <= 0) return; ctx.save(); ctx.globalAlpha = a;
  for (let i = 0; i < 8; i++) { const ang = i / 8 * TAU + t; ctx.beginPath(); for (let k = 0; k < 6; k++) { const d = r + k * 14; const z = (k % 2 ? 12 : -12); ctx.lineTo(x + Math.cos(ang) * d - Math.sin(ang) * z, y + Math.sin(ang) * d + Math.cos(ang) * z); } ctx.lineWidth = 7; ctx.strokeStyle = '#ffd23a'; ctx.stroke(); }
  ctx.restore();
}
function drawPhone(ctx, x, y, s) { // candlestick telephone
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ellipse(ctx, 0, 120, 80, 22); fillStroke(ctx, '#1d1a22', 7); rrect(ctx, -18, -90, 36, 210, 12); fillStroke(ctx, '#2a2630', 7);
  ellipse(ctx, 0, -100, 56, 30); fillStroke(ctx, '#2a2630', 7); ellipse(ctx, 0, -104, 34, 16); fillStroke(ctx, '#111', 4);
  ctx.beginPath(); ctx.moveTo(30, -40); ctx.quadraticCurveTo(120, -20, 110, 60); ctx.lineWidth = 7; ctx.strokeStyle = INK; ctx.stroke();
  rrect(ctx, 85, 50, 50, 90, 16); fillStroke(ctx, '#2a2630', 7);
  ctx.restore();
}
function thoughtBubble(ctx, x, y, r, a) {
  if (a <= 0) return; ctx.save(); ctx.globalAlpha = a;
  cloudShape(ctx, x, y, r, 4); ctx.lineWidth = 9; ctx.strokeStyle = INK; ctx.stroke(); cloudShape(ctx, x, y, r, 4); ctx.fillStyle = '#fff'; ctx.fill();
  ctx.restore();
}
function drawBodyBack(ctx, cx, cy, s, o = {}) {
  // a man seen from behind, for the "right side" chart (viewer's right = his right)
  ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s);
  const skin = o.xray ? '#2f5f8e' : '#f0c9a2', ink = o.xray ? '#bfe3ff' : INK;
  const torso = () => { ctx.beginPath(); ctx.moveTo(-210, -250); ctx.quadraticCurveTo(-250, -240, -255, -170); ctx.lineTo(-215, 260); ctx.quadraticCurveTo(0, 300, 215, 260); ctx.lineTo(255, -170); ctx.quadraticCurveTo(250, -240, 210, -250); ctx.quadraticCurveTo(0, -300, -210, -250); ctx.closePath(); };
  // arms
  for (const sd of [-1, 1]) { rrect(ctx, sd * 255 - 45, -210, 90, 470, 45); fillStroke(ctx, skin, 9, ink); }
  torso(); fillStroke(ctx, skin, 10, ink);
  circle(ctx, 0, -390, 120); fillStroke(ctx, skin, 10, ink);
  if (!o.xray) { ctx.save(); circle(ctx, 0, -390, 120); ctx.clip(); ctx.fillStyle = '#8a6646'; ctx.fillRect(-130, -520, 260, 150); ctx.restore(); circle(ctx, 0, -390, 120); fillStroke(ctx, null, 10); }
  rrect(ctx, -45, -285, 90, 50, 10); fillStroke(ctx, skin, 9, ink);
  // spine
  for (let i = 0; i < 9; i++) { rrect(ctx, -16, -220 + i * 52, 32, 36, 8); fillStroke(ctx, o.xray ? 'rgba(191,227,255,.35)' : 'rgba(150,90,60,.25)', 4, o.xray ? '#bfe3ff' : 'rgba(34,28,34,.4)'); }
  if (o.left != null) { // left half (viewer's left = his left): forbidden
    ctx.save(); torso(); ctx.clip(); ctx.beginPath(); ctx.rect(-300, -320, 300, 640); ctx.clip(); ctx.fillStyle = `rgba(214,48,48,${.35 * o.left})`; ctx.fillRect(-300, -320, 300, 640);
    ctx.strokeStyle = `rgba(150,20,20,${.5 * o.left})`; ctx.lineWidth = 8; for (let k = -12; k < 12; k++) { ctx.beginPath(); ctx.moveTo(k * 50 - 300, -320); ctx.lineTo(k * 50 + 340, 320); ctx.stroke(); } ctx.restore();
  }
  if (o.right != null) { ctx.save(); torso(); ctx.clip(); ctx.fillStyle = `rgba(80,200,110,${.4 * o.right})`; ctx.fillRect(0, -320, 300, 640); ctx.restore(); }
  ctx.restore();
}
function bigX(ctx, x, y, r, k) { if (k <= 0) return; const e = backOut(clamp(k)); ctx.save(); ctx.translate(x, y); ctx.scale(e, e); ctx.rotate(-.1); for (const sd of [-1, 1]) { line(ctx, -r * sd, -r, r * sd, r, r * .34, INK); line(ctx, -r * sd, -r, r * sd, r, r * .22, '#e0392f'); } ctx.restore(); }
function bigCheck(ctx, x, y, r, k) { if (k <= 0) return; const e = backOut(clamp(k)); ctx.save(); ctx.translate(x, y); ctx.scale(e, e); ctx.beginPath(); ctx.moveTo(-r, 0); ctx.lineTo(-r * .3, r * .7); ctx.lineTo(r, -r * .8); ctx.lineWidth = r * .34; ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); ctx.lineWidth = r * .2; ctx.strokeStyle = '#3fa35b'; ctx.stroke(); ctx.restore(); }
function heart(ctx, x, y, r, col = '#e0392f') { ctx.beginPath(); ctx.moveTo(x, y + r * .9); ctx.bezierCurveTo(x - r * 1.6, y - r * .1, x - r * .7, y - r * 1.3, x, y - r * .45); ctx.bezierCurveTo(x + r * .7, y - r * 1.3, x + r * 1.6, y - r * .1, x, y + r * .9); fillStroke(ctx, col, r * .14); }
function insideBody(ctx, t, dim = 0) {
  const g = ctx.createRadialGradient(540, 800, 100, 540, 900, 1300); g.addColorStop(0, mix('#f08a84', '#3a0c14', dim)); g.addColorStop(1, mix('#a8344a', '#14040a', dim));
  ctx.fillStyle = g; ctx.fillRect(-900, -900, 2900, 3000);
  const R = rng(21);
  for (let i = 0; i < 26; i++) { const x = R() * 1300 - 110, y = R() * 2000 - 40, r = 60 + R() * 120; ellipse(ctx, x + Math.sin(t * .8 + i) * 10, y + Math.cos(t * .7 + i) * 10, r, r * .8, R() * 3); ctx.fillStyle = `rgba(255,190,190,${.12 + R() * .12})`; ctx.fill(); }
  // vessels
  ctx.strokeStyle = mix('#c2414e', '#2a0810', dim); ctx.lineWidth = 16; ctx.lineCap = 'round';
  for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-100, 200 + i * 380); ctx.bezierCurveTo(300, 100 + i * 380, 700, 420 + i * 340, 1200, 250 + i * 390); ctx.stroke(); }
}
function drawCalendar(ctx, x, y, s, month, day) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rrect(ctx, -260, -320, 520, 600, 26); fillStroke(ctx, '#fbf8f0', 10);
  ctx.save(); rrect(ctx, -260, -320, 520, 600, 26); ctx.clip(); ctx.fillStyle = '#c8323a'; ctx.fillRect(-270, -330, 540, 170); ctx.restore();
  rrect(ctx, -260, -320, 520, 600, 26); fillStroke(ctx, null, 10);
  for (const rx of [-150, 150]) { rrect(ctx, rx - 14, -350, 28, 70, 12); fillStroke(ctx, '#3b3a44', 6); }
  text(ctx, month, 0, -235, 92, '#fff', INK, 0, 'Lora', 700);
  text(ctx, String(day), 0, 60, 300, INK, INK, 0, 'Lora', 700);
  text(ctx, '1881', 0, 225, 54, '#8a7f72', INK, 0, 'Lora', 700);
  ctx.restore();
}
function drawPortrait(ctx, x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rrect(ctx, -230, -300, 460, 600, 20); fillStroke(ctx, '#c9963c', 12); rrect(ctx, -195, -265, 390, 530, 10); fillStroke(ctx, '#d9cdb0', 6);
  ctx.save(); rrect(ctx, -195, -265, 390, 530, 10); ctx.clip();
  person(ctx, GAR_SUIT, { x: 0, y: 470, s: 560, shadow: false, face: { eyes: 'normal', mouth: 'flat' }, arms: POSE.idle.arms });
  ctx.restore();
  // black mourning ribbon across the corner
  ctx.beginPath(); ctx.moveTo(90, -300); ctx.lineTo(230, -300); ctx.lineTo(230, -160); ctx.closePath(); fillStroke(ctx, '#141216', 8);
  ctx.beginPath(); ctx.moveTo(-230, -120); ctx.lineTo(-90, -300); ctx.lineTo(-30, -300); ctx.lineTo(-230, -40); ctx.closePath(); fillStroke(ctx, '#141216', 8);
  ctx.restore();
}
function candle(ctx, x, y, s, t) {
  rrect(ctx, x - 22 * s, y - 160 * s, 44 * s, 160 * s, 8 * s); fillStroke(ctx, '#f3ecd8', 6 * s);
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(x, y - 200 * s, 5, x, y - 200 * s, 260 * s); g.addColorStop(0, 'rgba(255,200,110,.6)'); g.addColorStop(1, 'rgba(255,170,60,0)'); ctx.fillStyle = g; ctx.fillRect(x - 300 * s, y - 500 * s, 600 * s, 600 * s); ctx.restore();
  const fl = 1 + Math.sin(t * 17) * .08; ellipse(ctx, x, y - 195 * s, 14 * s, 32 * s * fl); fillStroke(ctx, '#ffcf5a', 4 * s);
}
