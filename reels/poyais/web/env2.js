// ---------- Poyais (1822): characters, sets and props. All generic: no real logos, flags or likenesses. ----------
const GOLDC = '#e8b23a';
const LIGHT = {
  day: { top: '#5fb2ee', bot: '#d9effb', warm: 0 },
  golden: { top: '#e98a4a', bot: '#fdd9a0', warm: 1 },
};
function sky(ctx, light) { const L = LIGHT[light]; drawSky(ctx, L.top, L.bot, -400, 1150); }
function goldenGrade(ctx, a = 1) { if (a <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'soft-light'; ctx.globalAlpha = .55 * a; ctx.fillStyle = '#ff9a3c'; ctx.fillRect(0, 0, W, H); ctx.restore(); }

// people: drawStick plus hats, hair and uniforms drawn on top (keep lean/headTilt at 0)
const MAC = { cols: ['#c22a2a', '#c22a2a'], hat: 'none', belt: false, look: { bicorne: true, side: '#8a5a32', epaulette: true } };
const SETTLERS = [
  { cols: ['#3f6fb2', '#3f6fb2'], hat: 'none', belt: false, look: { tophat: '#2a2630', side: '#5a3e2c' } },
  { cols: ['#7a4bc4', '#7a4bc4'], hat: 'none', belt: false, look: { bonnet: '#f2d27a' } },
  { cols: ['#3fa35b', '#3fa35b'], hat: 'none', belt: false, look: { cap: '#5a4a3a', mous: '#5a3e2c' } },
  { cols: ['#d8743a', '#d8743a'], hat: 'none', belt: false, look: { bonnet: '#e8e2d2' } },
  { cols: ['#5a5560', '#5a5560'], hat: 'none', belt: false, look: { tophat: '#1d1a22', mous: '#cfc8bd' } },
];
const COBBLER = { cols: ['#8a5a32', '#8a5a32'], hat: 'none', belt: false, look: { apron: true, cap: '#3a3a44', side: '#b9b2a8' } };
const BANKER = { cols: ['#2b2733', '#2b2733'], hat: 'none', belt: false, look: { tophat: '#1b1820', mous: '#5a3e2c' } };
const JUDGE = { cols: ['#1d1a22', '#1d1a22'], hat: 'none', belt: false, look: { toque: true, mous: '#e8e2d2' } };
const GENDARME = { cols: ['#2a3f8f', '#2a3f8f'], hat: 'none', belt: false, look: { bicorne: true, mous: '#3a2a20' } };
const SOLDIER = { cols: ['#2a3f8f', '#2a3f8f'], hat: 'none', belt: false, look: { shako: true } };

function person(ctx, base, o) {
  const p = Object.assign({}, base, o);
  drawStick(ctx, p);
  const L = base.look || {}; const s = p.s, hx = p.x, hy = p.y - .765 * s * (p.squash || 1), hr = .19 * s, lw = s * .014;
  if (L.apron) { rrect(ctx, hx - .1 * s, p.y - .55 * s, .2 * s, .3 * s, .03 * s); fillStroke(ctx, '#e8e2d2', lw); }
  if (L.epaulette) { for (const sd of [-1, 1]) { ellipse(ctx, hx + sd * .11 * s, p.y - .6 * s, .06 * s, .025 * s); fillStroke(ctx, GOLDC, lw); } for (let i = 0; i < 3; i++) { circle(ctx, hx, p.y - .56 * s + i * .07 * s, .012 * s); ctx.fillStyle = GOLDC; ctx.fill(); } }
  if (L.side) for (const sd of [-1, 1]) { ellipse(ctx, hx + sd * hr * .93, hy - hr * .1, hr * .16, hr * .36, sd * .2); fillStroke(ctx, L.side, lw); }
  if (L.mous) { ctx.beginPath(); const my = hy + hr * .33; ctx.moveTo(hx, my - hr * .08); ctx.quadraticCurveTo(hx + hr * .35, my - hr * .2, hx + hr * .55, my + hr * .12); ctx.quadraticCurveTo(hx + hr * .3, my + hr * .05, hx, my + hr * .08); ctx.quadraticCurveTo(hx - hr * .3, my + hr * .05, hx - hr * .55, my + hr * .12); ctx.quadraticCurveTo(hx - hr * .35, my - hr * .2, hx, my - hr * .08); fillStroke(ctx, L.mous, lw); }
  if (L.tophat) { rrect(ctx, hx - hr * .68, hy - hr * 2.05, hr * 1.36, hr * 1.25, hr * .08); fillStroke(ctx, L.tophat, lw); ellipse(ctx, hx, hy - hr * .8, hr * 1.1, hr * .16); fillStroke(ctx, L.tophat, lw); }
  if (L.bicorne) { ctx.beginPath(); ctx.moveTo(hx - hr * 1.5, hy - hr * .7); ctx.quadraticCurveTo(hx, hy - hr * 2.2, hx + hr * 1.5, hy - hr * .7); ctx.quadraticCurveTo(hx, hy - hr * 1.0, hx - hr * 1.5, hy - hr * .7); fillStroke(ctx, '#1d1a22', lw); line(ctx, hx - hr * 1.2, hy - hr * .82, hx + hr * 1.2, hy - hr * .82, lw, GOLDC); circle(ctx, hx + hr * .4, hy - hr * 1.15, hr * .16); fillStroke(ctx, L.mous ? '#e8e2d2' : '#c22a2a', lw * .7); }
  if (L.bonnet) { ctx.beginPath(); ctx.arc(hx, hy - hr * .1, hr * 1.12, Math.PI * 1.05, Math.PI * 1.95); ctx.quadraticCurveTo(hx + hr * 1.3, hy + hr * .3, hx + hr * 1.0, hy + hr * .35); ctx.lineTo(hx + hr * .85, hy - hr * .35); ctx.quadraticCurveTo(hx, hy - hr * 1.1, hx - hr * .85, hy - hr * .35); ctx.lineTo(hx - hr * 1.0, hy + hr * .35); ctx.quadraticCurveTo(hx - hr * 1.3, hy + hr * .3, hx - hr * 1.12, hy - hr * .2); fillStroke(ctx, L.bonnet, lw); }
  if (L.cap) { ctx.beginPath(); ctx.arc(hx, hy - hr * .35, hr * .95, Math.PI, 0); ctx.closePath(); fillStroke(ctx, L.cap, lw); ellipse(ctx, hx + hr * .5, hy - hr * .38, hr * .6, hr * .12); fillStroke(ctx, L.cap, lw); }
  if (L.toque) { rrect(ctx, hx - hr * .75, hy - hr * 1.6, hr * 1.5, hr * .85, hr * .2); fillStroke(ctx, '#1d1a22', lw); line(ctx, hx - hr * .75, hy - hr * 1.0, hx + hr * .75, hy - hr * 1.0, lw, GOLDC); rrect(ctx, hx - .12 * s, p.y - .6 * s, .24 * s, .08 * s, .02 * s); fillStroke(ctx, '#f6f2ea', lw); }
  if (L.shako) { path(ctx, [[hx - hr * .7, hy - hr * .7], [hx + hr * .7, hy - hr * .7], [hx + hr * .6, hy - hr * 1.9], [hx - hr * .6, hy - hr * 1.9]]); fillStroke(ctx, '#1d1a22', lw); circle(ctx, hx, hy - hr * 2.0, hr * .18); fillStroke(ctx, '#c22a2a', lw * .7); }
}
function paperCrown(ctx, x, y, r, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  path(ctx, [[-r, 0], [-r, -r * .7], [-r * .5, -r * .3], [0, -r * .9], [r * .5, -r * .3], [r, -r * .7], [r, 0]]); fillStroke(ctx, '#f6e7b0', r * .08);
  for (const [px, py] of [[-r, -r * .7], [0, -r * .9], [r, -r * .7]]) { circle(ctx, px, py, r * .1); fillStroke(ctx, '#e0392f', r * .05); }
  ctx.restore();
}
// ---------- sets ----------
function londonStreet(ctx, light, t) {
  sky(ctx, light);
  drawCloud(ctx, 200 + t * 6, 230, 110, 1); drawCloud(ctx, 860 + t * 4, 150, 80, 2);
  const cols = ['#a8553a', '#c9a874', '#8a6a5a', '#b8603e', '#d6c4a0'];
  for (let i = 0; i < 6; i++) { const x = -160 + i * 240; const h = 620 + (i % 3) * 70;
    rrect(ctx, x, 1150 - h, 236, h, 0); fillStroke(ctx, cols[i % 5], 8);
    path(ctx, [[x - 10, 1150 - h], [x + 118, 1150 - h - 90], [x + 246, 1150 - h]]); fillStroke(ctx, '#5a4a4a', 8);
    rrect(ctx, x + 150, 1150 - h - 120, 40, 90, 4); fillStroke(ctx, '#7a3a2a', 6);
    for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) { rrect(ctx, x + 40 + c * 100, 1150 - h + 70 + r * 170, 60, 100, 4); fillStroke(ctx, '#2f4a6a', 6); line(ctx, x + 70 + c * 100, 1150 - h + 70 + r * 170, x + 70 + c * 100, 1150 - h + 170 + r * 170, 4); }
    rrect(ctx, x + 90, 1010, 60, 140, 4); fillStroke(ctx, '#2a2630', 6);
  }
  // gas lamps
  for (const lx of [80, 1000]) { line(ctx, lx, 1250, lx, 860, 12, INK); rrect(ctx, lx - 28, 800, 56, 70, 8); fillStroke(ctx, '#ffe9a8', 7); }
  // cobbles
  ctx.fillStyle = '#9a8f80'; ctx.fillRect(-900, 1150, 2900, 1400); line(ctx, -900, 1150, 2000, 1150, 9, INK);
  const R = rng(3); for (let r = 0; r < 14; r++) for (let c = 0; c < 20; c++) { const y = 1170 + r * r * 4 + r * 40, x = -300 + c * 90 + (r % 2) * 45; ellipse(ctx, 540 + (x - 540) * (1 + r * .08), y, 34 + r * 3, 12 + r, 0); ctx.fillStyle = R() > .5 ? '#a89d8c' : '#8c8274'; ctx.fill(); }
}
function bigMap(ctx, x, y, w, h, unroll = 1, o = {}) {
  // a parchment map (fictional "POYAIS" coast)
  const ww = w * unroll;
  ctx.save(); rrect(ctx, x - ww / 2, y - h / 2, ww, h, 14); fillStroke(ctx, '#f1dfb2', 9); ctx.clip();
  ctx.fillStyle = '#9fd0e0'; ctx.beginPath(); ctx.moveTo(x - w / 2, y - h / 2); ctx.lineTo(x + w * .05, y - h / 2); ctx.bezierCurveTo(x - w * .05, y - h * .1, x + w * .12, y + h * .1, x - w * .02, y + h / 2); ctx.lineTo(x - w / 2, y + h / 2); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x + w * .05, y - h / 2); ctx.bezierCurveTo(x - w * .05, y - h * .1, x + w * .12, y + h * .1, x - w * .02, y + h / 2); ctx.lineWidth = 6; ctx.strokeStyle = '#8a6a3a'; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x + w * .45, y - h * .3); ctx.bezierCurveTo(x + w * .25, y - h * .1, x + w * .3, y + h * .05, x + w * .06, y + h * .02); ctx.lineWidth = 8; ctx.strokeStyle = '#5fa8c8'; ctx.stroke();
  for (let i = 0; i < 7; i++) { const tx = x + w * (.15 + (i % 4) * .08), ty = y - h * .3 + Math.floor(i / 4) * h * .4; path(ctx, [[tx - 16, ty + 14], [tx, ty - 18], [tx + 16, ty + 14]]); fillStroke(ctx, '#6a9a4a', 4); }
  if (o.city !== false) { circle(ctx, x + w * .1, y + h * .02, 14); fillStroke(ctx, '#c22a2a', 5); }
  text(ctx, 'POYAIS', x + w * .28, y + h * .28, h * .12, '#7a4a2a', INK, 0, 'Lora', 700);
  line(ctx, x - w * .42, y + h * .38, x - w * .25, y + h * .38, 4, '#7a4a2a'); // scale bar
  ctx.restore();
  if (unroll < 1) { rrect(ctx, x + ww / 2 - 18, y - h / 2 - 10, 36, h + 20, 18); fillStroke(ctx, '#e6cf9a', 8); }
}
function dreamCity(ctx, t, k) {
  // St Joseph as the guidebook described it: boulevards, opera house, domed cathedral, bank, a river of gold
  const show = i => backOut(clamp(k[i] || 0));
  // boulevards
  const b = show(0); if (b > 0) { ctx.save(); ctx.globalAlpha = clamp(b); for (const [x1, y1, x2, y2] of [[100, 1180, 980, 1000], [200, 900, 900, 1300]]) { line(ctx, x1, y1, x2, y2, 60, '#d9c9a8'); line(ctx, x1, y1, x2, y2, 4, '#b8a888'); } ctx.restore(); }
  const bld = (i, x, y, draw) => { const e = show(i); if (e <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(e, e); draw(); ctx.restore(); };
  bld(1, 260, 1000, () => { rrect(ctx, -130, -200, 260, 200, 6); fillStroke(ctx, '#e9c9d8', 8); ctx.beginPath(); ctx.moveTo(-140, -200); ctx.lineTo(0, -290); ctx.lineTo(140, -200); ctx.closePath(); fillStroke(ctx, '#c86a8a', 8); for (let i = 0; i < 4; i++) { rrect(ctx, -105 + i * 60, -170, 30, 170, 4); fillStroke(ctx, '#fff', 5); } });           // opera house
  bld(2, 780, 960, () => { rrect(ctx, -120, -170, 240, 170, 6); fillStroke(ctx, '#f3ecd8', 8); ctx.beginPath(); ctx.arc(0, -170, 100, Math.PI, 0); ctx.closePath(); fillStroke(ctx, '#7fb0d8', 8); line(ctx, 0, -270, 0, -330, 8); line(ctx, -22, -305, 22, -305, 8); rrect(ctx, -25, -80, 50, 80, 20); fillStroke(ctx, '#7a4a2a', 6); }); // domed cathedral
  bld(3, 560, 1250, () => { rrect(ctx, -110, -150, 220, 150, 4); fillStroke(ctx, '#e8e2d2', 8); path(ctx, [[-125, -150], [0, -215], [125, -150]]); fillStroke(ctx, '#d6c9a8', 8); for (let i = 0; i < 5; i++) { rrect(ctx, -90 + i * 40, -130, 16, 130, 3); fillStroke(ctx, '#fff', 4); } text(ctx, 'BANK', 0, -178, 30, INK, INK, 0, 'Lora', 700); });  // bank
  // river with gold
  const r = show(4); if (r > 0) { ctx.save(); ctx.globalAlpha = clamp(r); ctx.beginPath(); ctx.moveTo(-100, 1450); ctx.bezierCurveTo(300, 1350, 700, 1550, 1200, 1420); ctx.lineWidth = 110; ctx.strokeStyle = '#5fb0d8'; ctx.stroke(); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.restore(); }
  const g = clamp(k[5] || 0); if (g > 0) { const R = rng(4); for (let i = 0; i < 16; i++) { const x = R() * 1100, y = 1430 + (R() - .5) * 90 + Math.sin(x / 200) * 30; ellipse(ctx, x, y, 16 * g, 11 * g, R()); fillStroke(ctx, GOLDC, 4); sparkle(ctx, x + 8, y - 10, 14, g * clamp(Math.sin(t * 4 + i))); } }
}
function guideBook(ctx, x, y, s, open = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (open < .5) { rrect(ctx, -230, -300, 460, 600, 18); fillStroke(ctx, '#7a3a24', 10); rrect(ctx, -200, -270, 400, 540, 10); fillStroke(ctx, null, 5, GOLDC); text(ctx, 'POYAIS', 0, -150, 70, GOLDC, INK, 0, 'Lora', 700); text(ctx, 'A GUIDE', 0, -70, 40, GOLDC, INK, 0, 'Lora', 700); text(ctx, '355 PAGES', 0, 200, 34, '#e8c98a', INK, 0, 'Lora', 700); }
  else {
    rrect(ctx, -460, -300, 920, 600, 18); fillStroke(ctx, '#7a3a24', 10);
    rrect(ctx, -440, -285, 430, 570, 8); fillStroke(ctx, '#f6ecd2', 6); rrect(ctx, 10, -285, 430, 570, 8); fillStroke(ctx, '#f6ecd2', 6);
    for (let i = 0; i < 9; i++) line(ctx, -400, -200 + i * 50, -50, -200 + i * 50, 6, '#c9b896');
    text(ctx, 'by', 225, -230, 34, '#7a6a52', INK, 0, 'Lora', 700); text(ctx, 'CAPT. THOMAS', 225, 170, 38, INK, INK, 0, 'Lora', 700); text(ctx, 'STRANGEWAYS', 225, 220, 38, INK, INK, 0, 'Lora', 700);
    rrect(ctx, 115, -190, 220, 300, 8); fillStroke(ctx, '#e8dcc0', 7, GOLDC);
  }
  ctx.restore();
}
function blankPortrait(ctx, x, y, s, fade = 0) { // dashed outline of nobody
  ctx.save(); ctx.globalAlpha = 1 - fade; ctx.setLineDash([14, 12]); ctx.lineWidth = 6; ctx.strokeStyle = '#7a6a52';
  ctx.beginPath(); ctx.arc(x, y - 50 * s, 50 * s, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - 80 * s, y + 90 * s); ctx.quadraticCurveTo(x, y - 20 * s, x + 80 * s, y + 90 * s); ctx.stroke(); ctx.restore();
  if (fade > 0) text(ctx, '?', x, y, 140 * s, '#c22a2a', INK, 0, 'Poppins', 700);
}
function bankFront(ctx, light, t, o = {}) {
  sky(ctx, light);
  drawCloud(ctx, 200 + t * 6, 250, 100, 3);
  ctx.fillStyle = '#9a8f80'; ctx.fillRect(-900, 1250, 2900, 1400); line(ctx, -900, 1250, 2000, 1250, 9, INK);
  rrect(ctx, 60, 520, 960, 730, 0); fillStroke(ctx, '#e8e2d2', 9);
  path(ctx, [[30, 520], [540, 300], [1050, 520]]); fillStroke(ctx, '#d6c9a8', 9);
  for (let i = 0; i < 6; i++) { rrect(ctx, 120 + i * 160, 600, 60, 650, 6); fillStroke(ctx, '#f6f2ea', 7); }
  rrect(ctx, 30, 1200, 1020, 60, 4); fillStroke(ctx, '#cfc4a8', 8);
  text(ctx, 'BANK', 540, 450, 70, INK, INK, 0, 'Lora', 700);
}
function priceBoard(ctx, x, y, s, flip, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  line(ctx, -120, 160, -120, 400, 14); line(ctx, 120, 160, 120, 400, 14);
  rrect(ctx, -230, -180, 460, 340, 16); fillStroke(ctx, '#2a3a2e', 10);
  text(ctx, 'POYAIS LAND', 0, -120, 46, '#f3d27a', INK, 0, 'Lora', 700); text(ctx, 'PER ACRE', 0, 120, 36, '#e8e2d2', INK, 0, 'Lora', 700);
  const sc = Math.abs(Math.cos(Math.min(flip, 1) * Math.PI));
  ctx.save(); ctx.scale(1, Math.max(.02, sc)); rrect(ctx, -170, -70, 340, 140, 10); fillStroke(ctx, '#f6f2ea', 7);
  text(ctx, flip < .5 ? '2s 3d' : '4s', 0, 2, 96, flip < .5 ? INK : '#c22a2a', INK, 0, 'Lora', 700); ctx.restore();
  ctx.restore();
}
function bond(ctx, x, y, s, rot = 0, stamp = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  rrect(ctx, -200, -130, 400, 260, 10); fillStroke(ctx, '#f3ecd0', 8); rrect(ctx, -180, -110, 360, 220, 6); fillStroke(ctx, null, 5, '#8a6a3a');
  text(ctx, 'POYAIS LOAN', 0, -60, 40, '#5a3a1a', INK, 0, 'Lora', 700); text(ctx, '£200,000', 0, 10, 52, INK, INK, 0, 'Lora', 700);
  for (let i = 0; i < 3; i++) line(ctx, -140, 60 + i * 18, 140, 60 + i * 18, 4, '#c9b896');
  if (stamp > 0) { ctx.save(); ctx.globalAlpha = clamp(stamp); ctx.rotate(-.2); ctx.scale(1 + (1 - clamp(stamp)) * .6, 1 + (1 - clamp(stamp)) * .6); rrect(ctx, 40, 30, 150, 70, 10); ctx.lineWidth = 8; ctx.strokeStyle = '#c22a2a'; ctx.stroke(); text(ctx, 'SOLD', 115, 66, 40, '#c22a2a', INK, 0, 'Poppins', 700); ctx.restore(); }
  ctx.restore();
}
function banknote(ctx, x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  rrect(ctx, -180, -90, 360, 180, 10); fillStroke(ctx, '#bfe3c0', 7); rrect(ctx, -160, -72, 320, 144, 6); fillStroke(ctx, null, 4, '#3f8a52');
  circle(ctx, -95, 0, 48); fillStroke(ctx, '#e8f5e0', 5, '#3f8a52'); star5(ctx, -95, 0, 30, 0, '#e8b23a');
  text(ctx, 'POYAIS', 55, -25, 36, '#2f6a3e', INK, 0, 'Lora', 700); text(ctx, 'DOLLAR', 55, 25, 28, '#2f6a3e', INK, 0, 'Lora', 700);
  ctx.restore();
}
function coin(ctx, x, y, r) { circle(ctx, x, y, r); fillStroke(ctx, GOLDC, r * .14); circle(ctx, x, y, r * .62); fillStroke(ctx, null, r * .08, '#b9822a'); }
function tinyShoe(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-60, 0); ctx.lineTo(-60, -50); ctx.quadraticCurveTo(-40, -70, -10, -50); ctx.quadraticCurveTo(40, -20, 70, -10); ctx.quadraticCurveTo(80, 10, 50, 10); ctx.closePath(); fillStroke(ctx, '#c86a8a', 6);
  rrect(ctx, -62, 0, 30, 18, 4); fillStroke(ctx, '#7a3a24', 5); circle(ctx, 20, -32, 9); fillStroke(ctx, GOLDC, 4);
  paperCrown(ctx, -40, -62, 26, -.15);
  ctx.restore();
}
function printPress(ctx, x, y, s, press = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rrect(ctx, -200, -40, 400, 60, 8); fillStroke(ctx, '#6b4a2c', 8); for (const sd of [-1, 1]) { rrect(ctx, sd * 170 - 20, -380, 40, 400, 6); fillStroke(ctx, '#3b3a44', 7); }
  rrect(ctx, -200, -400, 400, 50, 8); fillStroke(ctx, '#3b3a44', 7); line(ctx, 0, -350, 0, -170 + press * 90, 18);
  rrect(ctx, -140, -190 + press * 90, 280, 50, 6); fillStroke(ctx, '#5a5560', 7);
  ctx.restore();
}
function harbour(ctx, light, t) {
  sky(ctx, light); drawSun(ctx, 820, 620, 80, t, .9);
  drawCloud(ctx, 200 + t * 5, 300, 100, 5); drawCloud(ctx, 900 + t * 4, 200, 70, 6);
  drawSea(ctx, 900, t, 2600, ['#f0b88a', '#3f8aa8', '#1d5f80']);
  // quay and warehouses on the left
  rrect(ctx, -300, 760, 420, 160, 0); fillStroke(ctx, '#8a6a5a', 7); path(ctx, [[-300, 760], [-90, 660], [120, 760]]); fillStroke(ctx, '#5a4a4a', 7);
}
function sailShip(ctx, x, y, s, t, o = {}) {
  ctx.save(); ctx.translate(x, y + Math.sin(t * 1.6 + (o.ph || 0)) * 8 * s); ctx.rotate(Math.sin(t * 1.3 + (o.ph || 0)) * .03); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-260, -40); ctx.lineTo(260, -40); ctx.quadraticCurveTo(230, 60, 170, 70); ctx.lineTo(-180, 70); ctx.quadraticCurveTo(-240, 50, -260, -40); fillStroke(ctx, '#7a4a2a', 9);
  line(ctx, -250, -10, 250, -10, 8, '#c9a14a');
  for (const mx of [-90, 90]) { line(ctx, mx, -40, mx, -470, 12); for (const [yy, w] of [[-430, 110], [-300, 140], [-170, 160]]) { ctx.beginPath(); ctx.moveTo(mx - w, yy); ctx.quadraticCurveTo(mx, yy - 20, mx + w, yy); ctx.lineTo(mx + w * .95, yy + 110); ctx.quadraticCurveTo(mx, yy + 90, mx - w * .95, yy + 110); ctx.closePath(); fillStroke(ctx, '#f3ecd8', 7); } }
  // a generic green-and-white pennant
  ctx.beginPath(); ctx.moveTo(90, -470); ctx.lineTo(90 + 120, -455 + Math.sin(t * 6) * 10); ctx.lineTo(90, -430); ctx.closePath(); fillStroke(ctx, '#3fa35b', 6);
  ctx.restore();
}
function jungle(ctx, light, t, o = {}) {
  sky(ctx, light);
  drawSea(ctx, 980, t, 2600, ['#9fe0e0', '#3fb0c0', '#1d8fa6']);
  ctx.fillStyle = '#f0dca0'; ctx.fillRect(-900, 1180, 2900, 1400); line(ctx, -900, 1180, 2000, 1180, 8, INK);
  // dense jungle wall behind the beach
  const R = rng(o.seed || 2);
  for (let i = 0; i < 18; i++) { const x = -150 + i * 80, h = 260 + R() * 260; line(ctx, x, 1180, x + 20, 1180 - h, 18, '#6a4a2a'); for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI + Math.PI + Math.sin(t * 1.5 + i) * .08; ctx.beginPath(); ctx.moveTo(x + 20, 1180 - h); ctx.quadraticCurveTo(x + 20 + Math.cos(a) * 90, 1180 - h + Math.sin(a) * 90 - 30, x + 20 + Math.cos(a) * 170, 1180 - h + Math.sin(a) * 150 + 50); ctx.lineWidth = 34; ctx.strokeStyle = INK; ctx.stroke(); ctx.lineWidth = 24; ctx.strokeStyle = ['#2f8a3e', '#3fa35b', '#4fb86a'][(i + k) % 3]; ctx.stroke(); } }
  for (let i = 0; i < 14; i++) { const x = -100 + i * 95; ellipse(ctx, x, 1170, 90, 60); fillStroke(ctx, ['#2f7a3e', '#3f9a4e'][i % 2], 7); }
}
function rubble(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (const [dx, dy, w, h] of [[-160, 0, 120, 60], [-20, 10, 160, 50], [150, -5, 110, 70], [-80, -50, 90, 50], [60, -45, 70, 40]]) { rrect(ctx, dx - w / 2, dy - h / 2, w, h, 10); fillStroke(ctx, '#a8a29a', 7); }
  line(ctx, -230, 30, 230, 30, 6, '#7a746a');
  ctx.restore();
}
function browser(ctx, x, y, w, h, slick) {
  rrect(ctx, x - w / 2, y - h / 2, w, h, 18); fillStroke(ctx, slick ? '#ffffff' : '#e8e4d8', 8);
  rrect(ctx, x - w / 2, y - h / 2, w, 60, [18, 18, 0, 0]); fillStroke(ctx, slick ? '#2a3f8f' : '#b9b2a8', 8);
  for (let i = 0; i < 3; i++) { circle(ctx, x - w / 2 + 30 + i * 30, y - h / 2 + 30, 9); ctx.fillStyle = '#fff'; ctx.fill(); }
  if (slick) {
    rrect(ctx, x - w / 2 + 30, y - h / 2 + 90, w - 60, h * .35, 12); fillStroke(ctx, '#7fc0e8', 6);
    path(ctx, [[x - w / 2 + 60, y - h / 2 + 90 + h * .35], [x - 20, y - h / 2 + 140], [x + w / 2 - 60, y - h / 2 + 90 + h * .35]]); ctx.fillStyle = '#3fa35b'; ctx.fill();
    for (let i = 0; i < 3; i++) line(ctx, x - w / 2 + 40, y + 30 + i * 40, x + w / 2 - 40 - i * 60, y + 30 + i * 40, 12, '#c9d4e8');
    rrect(ctx, x - 110, y + h / 2 - 110, 220, 70, 35); fillStroke(ctx, '#3fa35b', 6); text(ctx, 'BUY', x, y + h / 2 - 75, 40, '#fff', INK, 0, 'Poppins', 700);
    for (let i = 0; i < 5; i++) star5(ctx, x - 100 + i * 50, y - h / 2 + 110 + h * .35 + 30, 18, 0);
  } else {
    for (let i = 0; i < 5; i++) line(ctx, x - w / 2 + 40, y - h / 2 + 120 + i * 50, x - w / 2 + 40 + (i * 53 % 160) + 90, y - h / 2 + 120 + i * 50 + (i % 2 ? 8 : -6), 10, '#b9b2a8');
    text(ctx, '?!', x + 60, y + 60, 70, '#c22a2a', INK, 0, 'Poppins', 700);
  }
}
function globe(ctx, x, y, r, t) {
  circle(ctx, x, y, r); fillStroke(ctx, '#7fc0e8', 9);
  ctx.save(); circle(ctx, x, y, r); ctx.clip(); const off = (t * 40) % (r * 2);
  for (let i = -1; i < 3; i++) { ellipse(ctx, x - r + off + i * r * 1.1 - r * .3, y - r * .2, r * .35, r * .5, .3); ctx.fillStyle = '#6aba6a'; ctx.fill(); }
  ctx.restore(); circle(ctx, x, y, r); fillStroke(ctx, null, 9);
  line(ctx, x, y + r, x, y + r + 60, 14); rrect(ctx, x - 90, y + r + 60, 180, 30, 10); fillStroke(ctx, '#7a4a2a', 7);
}
function tent(ctx, x, y, s, lit = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  path(ctx, [[-170, 0], [0, -200], [170, 0]]); fillStroke(ctx, '#d9cfa8', 8); path(ctx, [[-40, 0], [0, -110], [40, 0]]); ctx.fillStyle = lit > 0 ? `rgba(255,190,90,${.9 * lit})` : '#2a2630'; ctx.fill();
  ctx.restore();
}
function rain(ctx, t, a = 1) {
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = a; ctx.strokeStyle = 'rgba(200,220,255,.55)'; ctx.lineWidth = 4;
  const R = rng(31); for (let i = 0; i < 160; i++) { const x = R() * 1300 - 100, sp = 1800 + R() * 600, y = ((R() * 2000 + t * sp) % 2100) - 100; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 18, y + 60); ctx.stroke(); }
  ctx.restore();
}
function courtroom(ctx, t) {
  ctx.fillStyle = '#7a4a2c'; ctx.fillRect(-900, -900, 2900, 3000);
  for (let x = -800; x < 1900; x += 180) { rrect(ctx, x, 200, 150, 900, 6); fillStroke(ctx, '#8a5a36', 6); }
  ctx.fillStyle = '#5a3420'; ctx.fillRect(-900, 1250, 2900, 1400); line(ctx, -900, 1250, 2000, 1250, 9, INK);
  rrect(ctx, 260, 760, 560, 330, 10); fillStroke(ctx, '#6b3e22', 9); // bench
  rrect(ctx, 240, 740, 600, 50, 8); fillStroke(ctx, '#4e2c1a', 8);
  // tall window light
  lightShaft(ctx, 900, 80, 160, 380, 1300, .5);
}
function gavel(ctx, x, y, s, ang) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  line(ctx, 0, 0, 0, -160, 14, '#6b4a2c'); rrect(ctx, -60, -200, 120, 55, 14); fillStroke(ctx, '#8a5a32', 8); ctx.restore();
}
function cathedral(ctx, light, t) {
  sky(ctx, light);
  drawCloud(ctx, 200 + t * 4, 260, 100, 7);
  ctx.fillStyle = '#c9b896'; ctx.fillRect(-900, 1250, 2900, 1400); line(ctx, -900, 1250, 2000, 1250, 9, INK);
  rrect(ctx, 180, 560, 720, 690, 6); fillStroke(ctx, '#f3ecd8', 9);
  path(ctx, [[160, 560], [540, 380], [920, 560]]); fillStroke(ctx, '#e8dcc0', 9);
  for (const tx of [90, 990]) { rrect(ctx, tx - 90, 330, 180, 920, 6); fillStroke(ctx, '#f3ecd8', 9); ctx.beginPath(); ctx.arc(tx, 330, 90, Math.PI, 0); ctx.closePath(); fillStroke(ctx, '#d98a4a', 9); }
  ctx.beginPath(); ctx.moveTo(470, 1250); ctx.lineTo(470, 960); ctx.arc(540, 960, 70, Math.PI, 0); ctx.lineTo(610, 1250); ctx.closePath(); fillStroke(ctx, '#6b3e22', 7);
  circle(ctx, 540, 720, 70); fillStroke(ctx, '#e8b23a', 8);
}
function coffin(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); path(ctx, [[-240, -40], [-180, -90], [200, -90], [260, -40], [200, 20], [-180, 20]]); fillStroke(ctx, '#5a3420', 8); rrect(ctx, -150, -75, 280, 30, 6); fillStroke(ctx, '#c22a2a', 5); ctx.restore(); }
