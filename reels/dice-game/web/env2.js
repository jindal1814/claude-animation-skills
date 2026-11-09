// ---------- The Dice Game: characters drawn with dignity (calm faces, traditional dress, no religious symbols) ----------
const GOLDC = '#e8b23a', GOLD_D = '#b9822a';
function goldenGrade(ctx, a = 1) { if (a <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'soft-light'; ctx.globalAlpha = .5 * a; ctx.fillStyle = '#ff9a3c'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
function tint(ctx, col, a) { if (a <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = clamp(a); ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.restore(); }
const YUDH = { cols: ['#f3ecd8', '#f3ecd8'], hat: 'none', belt: false, look: { crown: true, sash: '#d8743a', beard: '#3a2a20', short: true } };
const SHAKUNI = { cols: ['#5a2438', '#5a2438'], hat: 'none', belt: false, look: { turban: '#2a1a24', jewel: '#3fa35b', goatee: '#2a2024', sash: '#1d1a22' } };
const DHRITA = { cols: ['#4a3a6a', '#4a3a6a'], hat: 'none', belt: false, look: { crown: true, beard: '#e8e2d2', sash: '#c9a14a', hairWhite: true } };
const ELDERS = [
  { cols: ['#f6f2ea', '#f6f2ea'], hat: 'none', belt: false, look: { beard: '#f0ece2', hairWhite: true, sash: '#c9a14a' } },   // the eldest, white-bearded
  { cols: ['#e8dcc0', '#e8dcc0'], hat: 'none', belt: false, look: { beard: '#b9b2a8', sash: '#8a5a32' } },
  { cols: ['#d8c9a8', '#d8c9a8'], hat: 'none', belt: false, look: { beard: '#5a4a3a', sash: '#3f6f8a' } },
];
const MESSENGER = { cols: ['#3f6f8a', '#3f6f8a'], hat: 'none', belt: false, look: { turban: '#e8dcc0' } };
const BRO = { cols: ['#e8dcc0', '#e8dcc0'], hat: 'none', belt: false, look: { crown: true, short: true, beard: '#3a2a20' } };
const MODERN = [{ cols: ['#2f63c9', '#2f63c9'], hat: 'none', belt: false, look: { hair: '#2a2024' } }, { cols: ['#3fa35b', '#3fa35b'], hat: 'none', belt: false, look: { hair: '#5a3a24' } }];

function person(ctx, base, o) {
  const p = Object.assign({}, base, o); drawStick(ctx, p);
  const L = base.look || {}; const s = p.s, hx = p.x, hy = p.y - .765 * s * (p.squash || 1), hr = .19 * s, lw = s * .014;
  if (L.sash) { ctx.beginPath(); ctx.moveTo(hx - .1 * s, p.y - .61 * s); ctx.lineTo(hx + .12 * s, p.y - .3 * s); ctx.lineTo(hx + .12 * s, p.y - .38 * s); ctx.lineTo(hx - .05 * s, p.y - .62 * s); ctx.closePath(); fillStroke(ctx, L.sash, lw); }
  if (L.hairWhite) for (const sd of [-1, 1]) { ellipse(ctx, hx + sd * hr * .92, hy - hr * .05, hr * .16, hr * .36); fillStroke(ctx, '#f0ece2', lw); }
  if (L.hair) { ctx.beginPath(); ctx.arc(hx, hy - hr * .05, hr * 1.02, Math.PI * 1.08, Math.PI * 1.92); for (let i = 0; i <= 6; i++) ctx.lineTo(hx + hr * (.9 - i * .3), hy - hr * (.45 + (i % 2) * .18)); ctx.closePath(); fillStroke(ctx, L.hair, lw); }
  if (L.beard) {
    const len = L.short ? 1.15 : 1.55;
    ctx.beginPath(); ctx.moveTo(hx - hr * .95, hy + hr * .05); ctx.quadraticCurveTo(hx - hr * 1.0, hy + hr * len * .8, hx, hy + hr * len); ctx.quadraticCurveTo(hx + hr * 1.0, hy + hr * len * .8, hx + hr * .95, hy + hr * .05);
    ctx.quadraticCurveTo(hx + hr * .6, hy + hr * .32, hx + hr * .2, hy + hr * .32); ctx.quadraticCurveTo(hx, hy + hr * .25, hx - hr * .2, hy + hr * .32); ctx.quadraticCurveTo(hx - hr * .6, hy + hr * .32, hx - hr * .95, hy + hr * .05); ctx.closePath(); fillStroke(ctx, L.beard, lw);
    const m = (p.face || {}).mouth || 'flat', my = hy + hr * .5;
    if (m === 'frown') { ctx.beginPath(); ctx.arc(hx, my + hr * .18, hr * .16, Math.PI + .6, -.6); ctx.lineWidth = lw; ctx.strokeStyle = '#2a140f'; ctx.stroke(); }
    else if (m === 'smile' || m === 'smirk') { ctx.beginPath(); ctx.arc(hx, my - hr * .1, hr * .15, .5, Math.PI - .5); ctx.lineWidth = lw; ctx.strokeStyle = '#2a140f'; ctx.stroke(); }
    else if (m === 'o') { ellipse(ctx, hx, my, hr * .1, hr * .12); fillStroke(ctx, '#4a1c22', lw * .8); }
    else line(ctx, hx - hr * .12, my, hx + hr * .12, my, lw, '#2a140f');
  }
  if (L.goatee) { path(ctx, [[hx - hr * .25, hy + hr * .62], [hx + hr * .25, hy + hr * .62], [hx, hy + hr * 1.25]]); fillStroke(ctx, L.goatee, lw); line(ctx, hx - hr * .4, hy + hr * .3, hx + hr * .4, hy + hr * .3, lw * 1.4, L.goatee); }
  if (L.crown) { ctx.beginPath(); const cb = hy - hr * .7, ct = hy - hr * 1.6; ctx.moveTo(hx - hr * .72, cb); ctx.lineTo(hx - hr * .66, ct + hr * .4); ctx.lineTo(hx - hr * .33, ct + hr * .18); ctx.lineTo(hx, ct); ctx.lineTo(hx + hr * .33, ct + hr * .18); ctx.lineTo(hx + hr * .66, ct + hr * .4); ctx.lineTo(hx + hr * .72, cb); ctx.closePath(); fillStroke(ctx, GOLDC, lw); circle(ctx, hx, cb - hr * .4, hr * .12); fillStroke(ctx, '#c22a2a', lw * .7); rrect(ctx, hx - hr * .78, cb - hr * .1, hr * 1.56, hr * .2, hr * .05); fillStroke(ctx, GOLD_D, lw); }
  if (L.turban) { ctx.beginPath(); ctx.ellipse(hx, hy - hr * .6, hr * 1.02, hr * .62, 0, Math.PI, 0); ctx.lineTo(hx + hr * .98, hy - hr * .35); ctx.quadraticCurveTo(hx, hy - hr * .55, hx - hr * .98, hy - hr * .35); ctx.closePath(); fillStroke(ctx, L.turban, lw); if (L.jewel) { circle(ctx, hx, hy - hr * .78, hr * .13); fillStroke(ctx, L.jewel, lw * .7); } }
}
// ---------- sets ----------
function hall(ctx, t, dim = 0) {
  const g = ctx.createLinearGradient(0, -400, 0, 1900); g.addColorStop(0, mix('#3a1f18', '#0a0506', dim)); g.addColorStop(1, mix('#6a3420', '#0a0506', dim));
  ctx.fillStyle = g; ctx.fillRect(-900, -900, 2900, 3200);
  for (const px of [60, 1020, -260, 1340]) { rrect(ctx, px - 60, -200, 120, 1500, 8); fillStroke(ctx, mix('#8a4a2a', '#0a0506', dim), 8); for (let y = 0; y < 1300; y += 260) { rrect(ctx, px - 70, y, 140, 30, 8); fillStroke(ctx, mix(GOLD_D, '#0a0506', dim), 6); } }
  for (const [tx, ty] of [[60, 360], [1020, 360]]) torch(ctx, tx, ty, t, 1 - dim * .6);
  ctx.fillStyle = mix('#4a2618', '#0a0506', dim); ctx.fillRect(-900, 1300, 2900, 1400); line(ctx, -900, 1300, 2000, 1300, 8, INK);
}
function torch(ctx, x, y, t, a = 1) {
  rrect(ctx, x - 14, y, 28, 110, 6); fillStroke(ctx, '#5a3a24', 6);
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(x, y - 30, 5, x, y - 30, 420); g.addColorStop(0, `rgba(255,190,90,${.55 * a})`); g.addColorStop(1, 'rgba(255,150,60,0)'); ctx.fillStyle = g; ctx.fillRect(x - 450, y - 450, 900, 900); ctx.restore();
  const f = 1 + Math.sin(t * 13) * .08 + Math.sin(t * 7.3) * .06;
  ctx.beginPath(); ctx.moveTo(x - 26, y); ctx.quadraticCurveTo(x - 30, y - 50 * f, x, y - 90 * f); ctx.quadraticCurveTo(x + 30, y - 50 * f, x + 26, y); ctx.closePath(); fillStroke(ctx, '#ffb43a', 5);
  ctx.beginPath(); ctx.moveTo(x - 12, y); ctx.quadraticCurveTo(x - 12, y - 30 * f, x, y - 52 * f); ctx.quadraticCurveTo(x + 12, y - 30 * f, x + 12, y); ctx.closePath(); ctx.fillStyle = '#fff1a8'; ctx.fill();
}
function courtyard(ctx, t) {
  drawSky(ctx, '#5fb2ee', '#d9effb', -400, 1150); drawCloud(ctx, 200 + t * 5, 260, 110, 1);
  for (const px of [120, 960]) { rrect(ctx, px - 70, 300, 140, 1000, 8); fillStroke(ctx, '#f3e6c8', 8); ctx.beginPath(); ctx.arc(px, 300, 90, Math.PI, 0); ctx.closePath(); fillStroke(ctx, '#d98a4a', 8); }
  rrect(ctx, 190, 420, 700, 880, 0); fillStroke(ctx, '#ecd9b0', 8); ctx.beginPath(); ctx.moveTo(380, 1300); ctx.lineTo(380, 760); ctx.arc(540, 760, 160, Math.PI, 0); ctx.lineTo(700, 1300); ctx.closePath(); fillStroke(ctx, '#8a4a2a', 8);
  ctx.fillStyle = '#e8d6ae'; ctx.fillRect(-900, 1300, 2900, 1400); line(ctx, -900, 1300, 2000, 1300, 8, INK);
}
function diceBoard(ctx, x, y, w, h) { // a low cloth board with a square grid, seen at an angle
  ctx.save(); ctx.translate(x, y);
  path(ctx, [[-w * .5, h * .5], [w * .5, h * .5], [w * .4, -h * .5], [-w * .4, -h * .5]]); fillStroke(ctx, '#7a1f2a', 9);
  ctx.strokeStyle = 'rgba(232,178,58,.8)'; ctx.lineWidth = 4;
  for (let i = 1; i < 8; i++) { const k = i / 8; ctx.beginPath(); ctx.moveTo(-w * .4 + (w * .8) * k - (k - .5) * w * .2 * 0, -h * .5); ctx.lineTo(-w * .5 + w * k, h * .5); ctx.stroke(); }
  for (let j = 1; j < 4; j++) { const k = j / 4, hw = w * (.4 + .1 * k); line(ctx, -hw, -h * .5 + h * k, hw, -h * .5 + h * k, 4, 'rgba(232,178,58,.8)'); }
  ctx.restore();
}
function die(ctx, x, y, s, rot, face = 5) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  rrect(ctx, -40, -40, 80, 80, 14); fillStroke(ctx, '#f6ecd2', 7);
  const P = { 1: [[0, 0]], 2: [[-18, -18], [18, 18]], 3: [[-20, -20], [0, 0], [20, 20]], 4: [[-18, -18], [18, -18], [-18, 18], [18, 18]], 5: [[-20, -20], [20, -20], [0, 0], [-20, 20], [20, 20]], 6: [[-18, -22], [18, -22], [-18, 0], [18, 0], [-18, 22], [18, 22]] }[face];
  for (const [dx, dy] of P) { circle(ctx, dx, dy, 8); ctx.fillStyle = '#7a1f2a'; ctx.fill(); }
  ctx.restore();
}
function kingHand(ctx, x, y, s, open = 0, rot = 0) { // the king's arm from the lower left: gold bangle, cream sleeve
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  rrect(ctx, -500, -45, 470, 90, 40); fillStroke(ctx, '#f3ecd8', 8); rrect(ctx, -60, -50, 34, 100, 12); fillStroke(ctx, GOLDC, 6);
  ellipse(ctx, 30, 0, 70, 52); fillStroke(ctx, '#c98a5a', 8);
  for (let i = 0; i < 4; i++) { const a = -.6 + i * .4; ctx.save(); ctx.translate(70, -10 + i * 14); ctx.rotate(a * open); rrect(ctx, 0, -12, 60 + open * 10, 24, 12); fillStroke(ctx, '#c98a5a', 6); ctx.restore(); }
  ctx.restore();
}
function coinPile(ctx, x, y, n, s = 1) { const R = rng(n * 7 + 1); for (let i = 0; i < n; i++) { const cx = x + (R() - .5) * 140 * s, cy = y - Math.floor(i / 6) * 14 * s + (R() - .5) * 20 * s; ellipse(ctx, cx, cy, 30 * s, 14 * s); fillStroke(ctx, GOLDC, 5 * s); } }
function cityModel(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rrect(ctx, -150, -20, 300, 40, 8); fillStroke(ctx, '#c9a874', 6); for (const [dx, h, c] of [[-100, 90, '#f3e6c8'], [-30, 140, '#e8d6ae'], [50, 110, '#f3e6c8'], [110, 70, '#d9c49a']]) { rrect(ctx, dx - 28, -20 - h, 56, h, 4); fillStroke(ctx, c, 5); ctx.beginPath(); ctx.arc(dx, -20 - h, 28, Math.PI, 0); ctx.closePath(); fillStroke(ctx, '#d98a4a', 5); } ctx.restore(); }
function crownProp(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); path(ctx, [[-70, 0], [-65, -60], [-32, -36], [0, -80], [32, -36], [65, -60], [70, 0]]); fillStroke(ctx, GOLDC, 7); circle(ctx, 0, -40, 12); fillStroke(ctx, '#c22a2a', 5); rrect(ctx, -76, -10, 152, 20, 6); fillStroke(ctx, GOLD_D, 6); ctx.restore(); }
function phone(ctx, x, y, s, t, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rrect(ctx, -150, -290, 300, 580, 36); fillStroke(ctx, '#1d1a22', 9); rrect(ctx, -130, -260, 260, 520, 20); fillStroke(ctx, '#f6f6f2', 5);
  // generic chart drifting down in red
  ctx.beginPath(); const R = rng(9); let v = -150; for (let i = 0; i <= 20; i++) { v += (R() - .35) * 26; ctx.lineTo(-110 + i * 11, v + Math.min(220, i * 9)); } ctx.lineWidth = 8; ctx.strokeStyle = '#e0392f'; ctx.lineJoin = 'round'; ctx.stroke();
  if (o.buy) { rrect(ctx, -90, 150, 180, 70, 35); fillStroke(ctx, '#3fa35b', 6); text(ctx, 'BUY', 0, 186, 40, '#fff', INK, 0, 'Poppins', 700); }
  ctx.restore();
}
function forest(ctx, t) {
  drawSky(ctx, '#2a2a4a', '#5a4a6a', -400, 1150);
  for (let i = 0; i < 9; i++) { const x = -100 + i * 150; line(ctx, x, 1300, x + 10, 500 - (i % 3) * 80, 30, '#2a1f1a'); circle(ctx, x + 10, 500 - (i % 3) * 80, 140); ctx.fillStyle = ['#1f3a2a', '#26452f', '#1a3324'][i % 3]; ctx.fill(); }
  ctx.fillStyle = '#2a2a1f'; ctx.fillRect(-900, 1300, 2900, 1400); line(ctx, -900, 1300, 2000, 1300, 8, INK);
}
function stakeCard(ctx, x, y, s, k) { if (k <= 0) return; const e = backOut(clamp(k)); ctx.save(); ctx.translate(x, y); ctx.scale(e * s, e * s); rrect(ctx, -230, -110, 460, 220, 18); fillStroke(ctx, '#f6ecd2', 9); rrect(ctx, -205, -85, 410, 170, 10); fillStroke(ctx, null, 5, '#7a1f2a'); text(ctx, '13 YEARS', 0, 4, 92, '#7a1f2a', INK, 0, 'Lora', 700); ctx.restore(); }
