// ---------- One Red Paperclip: characters, sets and props (all generic: no logos, no likenesses) ----------
const RED = '#e0392f', GOLDC = '#e8b23a';
const LIGHT = { day: ['#5fb2ee', '#d9effb'], golden: ['#e98a4a', '#fdd9a0'] };
function sky(ctx, light) { drawSky(ctx, LIGHT[light][0], LIGHT[light][1], -400, 1150); }
function goldenGrade(ctx, a = 1) { if (a <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'soft-light'; ctx.globalAlpha = .5 * a; ctx.fillStyle = '#ff9a3c'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
const KYLE = { cols: ['#3fa35b', '#3fa35b'], hat: 'none', belt: false, look: { hair: '#7a4a2a' } };
const PEOPLE = [
  { cols: ['#3f6fb2', '#3f6fb2'], hat: 'none', belt: false, look: { hair: '#2a2024' } },
  { cols: ['#7a4bc4', '#7a4bc4'], hat: 'none', belt: false, look: { hairLong: '#c9862a' } },
  { cols: ['#d8743a', '#d8743a'], hat: 'none', belt: false, look: { cap: '#2a3f8f' } },
  { cols: ['#c22a6a', '#c22a6a'], hat: 'none', belt: false, look: { hairLong: '#3a2a20' } },
  { cols: ['#5a5560', '#5a5560'], hat: 'none', belt: false, look: { bald: true, mous: '#8a8a8a' } },
];
const ACTOR = { cols: ['#2b2733', '#2b2733'], hat: 'none', belt: false, look: { hair: '#5a4a3a', tie: '#c22a2a' } };
function person(ctx, base, o) {
  const p = Object.assign({}, base, o); drawStick(ctx, p);
  const L = base.look || {}; const s = p.s, hx = p.x, hy = p.y - .765 * s * (p.squash || 1), hr = .19 * s, lw = s * .014;
  if (L.tie) { path(ctx, [[hx - .02 * s, p.y - .6 * s], [hx + .02 * s, p.y - .6 * s], [hx + .03 * s, p.y - .4 * s], [hx, p.y - .36 * s], [hx - .03 * s, p.y - .4 * s]]); fillStroke(ctx, L.tie, lw * .8); }
  if (L.hair) { ctx.beginPath(); ctx.arc(hx, hy - hr * .05, hr * 1.02, Math.PI * 1.08, Math.PI * 1.92); for (let i = 0; i <= 6; i++) ctx.lineTo(hx + hr * (.9 - i * .3), hy - hr * (.45 + (i % 2) * .18)); ctx.closePath(); fillStroke(ctx, L.hair, lw); }
  if (L.hairLong) { ctx.beginPath(); ctx.arc(hx, hy - hr * .05, hr * 1.05, Math.PI * .95, Math.PI * 2.05); ctx.lineTo(hx + hr * 1.05, hy + hr * 1.0); ctx.lineTo(hx + hr * .78, hy + hr * 1.0); ctx.lineTo(hx + hr * .8, hy - hr * .4); ctx.quadraticCurveTo(hx, hy - hr * .75, hx - hr * .8, hy - hr * .4); ctx.lineTo(hx - hr * .78, hy + hr * 1.0); ctx.lineTo(hx - hr * 1.05, hy + hr * 1.0); ctx.closePath(); fillStroke(ctx, L.hairLong, lw); }
  if (L.cap) { ctx.beginPath(); ctx.arc(hx, hy - hr * .35, hr * .95, Math.PI, 0); ctx.closePath(); fillStroke(ctx, L.cap, lw); ellipse(ctx, hx + hr * .55, hy - hr * .38, hr * .6, hr * .12); fillStroke(ctx, L.cap, lw); }
  if (L.bald) { for (const sd of [-1, 1]) { ellipse(ctx, hx + sd * hr * .92, hy - hr * .05, hr * .14, hr * .3); fillStroke(ctx, L.mous, lw); } }
  if (L.mous) { ctx.beginPath(); const my = hy + hr * .33; ctx.moveTo(hx, my - hr * .08); ctx.quadraticCurveTo(hx + hr * .35, my - hr * .2, hx + hr * .55, my + hr * .12); ctx.quadraticCurveTo(hx + hr * .3, my + hr * .05, hx, my + hr * .08); ctx.quadraticCurveTo(hx - hr * .3, my + hr * .05, hx - hr * .55, my + hr * .12); ctx.quadraticCurveTo(hx - hr * .35, my - hr * .2, hx, my - hr * .08); fillStroke(ctx, L.mous, lw); }
}
// ---------- props ----------
function paperclip(ctx, x, y, s, rot = 0, col = RED) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-20, 60); ctx.lineTo(-20, -60); ctx.arc(0, -60, 20, Math.PI, 0); ctx.lineTo(20, 80); ctx.arc(-5, 80, 25, 0, Math.PI); ctx.lineTo(-30, -40); ctx.arc(-5, -40, 25, Math.PI, 0); ctx.lineTo(20, 40);
  ctx.lineWidth = 15; ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); ctx.lineWidth = 9; ctx.strokeStyle = col; ctx.stroke();
  ctx.restore();
}
function houseKey(ctx, x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); circle(ctx, -50, 0, 34); fillStroke(ctx, GOLDC, 7); circle(ctx, -50, 0, 12); ctx.fillStyle = '#fff3c4'; ctx.fill(); rrect(ctx, -20, -10, 110, 20, 4); fillStroke(ctx, GOLDC, 6); for (const kx of [50, 72]) { rrect(ctx, kx, 6, 12, 22, 2); fillStroke(ctx, GOLDC, 5); } ctx.restore(); }
function hand(ctx, x, y, s, rot = 0, open = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); rrect(ctx, -60, 40, 120, 400, 30); fillStroke(ctx, '#3f6fb2', 8); ellipse(ctx, 0, 0, 95, 60 + open * 10); fillStroke(ctx, '#f0c39a', 8); rrect(ctx, 70, -40, 50, 90, 25); fillStroke(ctx, '#f0c39a', 7); ctx.restore(); }
function snowGlobe(ctx, x, y, s, t, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (o.spot) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(0, -60, 10, 0, -60, 320); g.addColorStop(0, 'rgba(255,245,200,.55)'); g.addColorStop(1, 'rgba(255,245,200,0)'); ctx.fillStyle = g; ctx.fillRect(-400, -400, 800, 700); ctx.restore(); }
  rrect(ctx, -150, 60, 300, 90, 20); fillStroke(ctx, o.base || '#2a2630', 8); rrect(ctx, -170, 130, 340, 40, 14); fillStroke(ctx, o.base || '#2a2630', 8);
  if (o.motor) for (let i = 0; i < 4; i++) { circle(ctx, -100 + i * 66, 105, 10); ctx.fillStyle = ['#e0392f', '#ffd23a', '#3fa35b', '#2f63c9'][(i + Math.floor(t * 6)) % 4]; ctx.fill(); }
  circle(ctx, 0, -60, 150); ctx.fillStyle = 'rgba(200,230,255,.55)'; ctx.fill();
  ctx.save(); circle(ctx, 0, -60, 150); ctx.clip();
  ellipse(ctx, 0, 70, 160, 40); ctx.fillStyle = '#fff'; ctx.fill();
  if (o.inside === 'house') { ctx.save(); ctx.translate(0, 40); ctx.rotate(Math.sin(t * 2) * .05); drawHouse(ctx, 0, 0, .28, 0); ctx.restore(); }
  else { ctx.save(); ctx.translate(0, 50); ctx.rotate(t * 2.5); for (let i = 0; i < 4; i++) { ctx.rotate(TAU / 4); drawStick(ctx, { x: 60, y: 0, s: 90, cols: ['#1d1a22', '#1d1a22'], hat: 'none', belt: false, shadow: false, arms: POSE.handsUp.arms }); } ctx.restore(); }
  const R = rng(5); ctx.fillStyle = '#fff'; for (let i = 0; i < 40; i++) { const sx = (R() - .5) * 280, sy = ((R() * 300 + t * 40 * (.5 + R())) % 300) - 210; circle(ctx, sx + Math.sin(t + i) * 8, sy, 4 + R() * 3); ctx.fill(); }
  ctx.restore();
  circle(ctx, 0, -60, 150); ctx.lineWidth = 9; ctx.strokeStyle = INK; ctx.stroke(); ctx.beginPath(); ctx.arc(-40, -110, 80, Math.PI * 1.1, Math.PI * 1.45); ctx.lineWidth = 12; ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.stroke();
  ctx.restore();
}
function drawHouse(ctx, x, y, s, bow = 0) { // two-storey house, base at (x, y)
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rrect(ctx, -260, -440, 520, 440, 6); fillStroke(ctx, '#f3e6c8', 9); path(ctx, [[-300, -440], [0, -640], [300, -440]]); fillStroke(ctx, '#7a4a3a', 9);
  for (const [wx, wy] of [[-160, -360], [100, -360], [-160, -180]]) { rrect(ctx, wx, wy, 80, 100, 6); fillStroke(ctx, '#7fc0e8', 7); line(ctx, wx + 40, wy, wx + 40, wy + 100, 5); }
  rrect(ctx, 80, -190, 100, 190, 8); fillStroke(ctx, '#9a3a2a', 8); circle(ctx, 160, -95, 7); ctx.fillStyle = GOLDC; ctx.fill();
  rrect(ctx, -300, -20, 600, 30, 6); fillStroke(ctx, '#cfc4a8', 7);
  if (bow > 0) { const e = backOut(clamp(bow)); ctx.save(); ctx.scale(e, e); line(ctx, -260, -300, 260, -300, 40, RED); line(ctx, 0, -440, 0, 0, 40, RED); for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sd * 90, -480, 100, 60, sd * .4, 0, TAU); fillStroke(ctx, RED, 9); } circle(ctx, 0, -470, 40); fillStroke(ctx, '#c22a2a', 8); ctx.restore(); }
  ctx.restore();
}
function fishPen(ctx, x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ellipse(ctx, 0, 0, 120, 50); fillStroke(ctx, '#3fb0c0', 7); path(ctx, [[110, 0], [170, -45], [170, 45]]); fillStroke(ctx, '#3fb0c0', 7); circle(ctx, -70, -10, 12); fillStroke(ctx, '#fff', 4); circle(ctx, -72, -10, 5); ctx.fillStyle = INK; ctx.fill(); path(ctx, [[-120, -6], [-190, 0], [-120, 6]]); fillStroke(ctx, '#d9d4c8', 5); ctx.restore(); }
function doorknob(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rrect(ctx, -25, -10, 50, 80, 10); fillStroke(ctx, '#8a6a4a', 6); circle(ctx, 0, -40, 60); fillStroke(ctx, '#c9a14a', 7); ctx.beginPath(); ctx.arc(-15, -55, 25, Math.PI, Math.PI * 1.6); ctx.lineWidth = 8; ctx.strokeStyle = '#fff1c4'; ctx.stroke(); ctx.restore(); }
function campStove(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rrect(ctx, -130, -60, 260, 100, 10); fillStroke(ctx, '#3fa35b', 7); for (const bx of [-60, 60]) { ellipse(ctx, bx, -60, 45, 12); fillStroke(ctx, '#2a2630', 6); } rrect(ctx, -130, -160, 260, 100, 6); fillStroke(ctx, '#3a8a4a', 7); ctx.restore(); }
function generator(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rrect(ctx, -150, -150, 300, 170, 14); fillStroke(ctx, '#f2b52a', 8); rrect(ctx, -110, -110, 140, 90, 8); fillStroke(ctx, '#2a2630', 6); circle(ctx, 80, -65, 30); fillStroke(ctx, '#e8e2d2', 6); line(ctx, -170, -160, 170, -160, 14); line(ctx, -170, -160, -170, 30, 14); line(ctx, 170, -160, 170, 30, 14); ctx.restore(); }
function keg(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rrect(ctx, -110, -260, 220, 260, 30); fillStroke(ctx, '#b9c0c8', 8); for (const ry of [-220, -40]) line(ctx, -110, ry, 110, ry, 8, '#8a929c'); rrect(ctx, -30, -290, 60, 30, 6); fillStroke(ctx, '#8a929c', 6); ctx.restore(); }
function iouNote(ctx, x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); rrect(ctx, -140, -90, 280, 180, 6); fillStroke(ctx, '#fff8d8', 6); text(ctx, 'IOU', 0, -15, 80, '#2a2630', INK, 0, 'Poppins', 700); line(ctx, -100, 50, 100, 50, 4, '#c9b896'); ctx.restore(); }
function snowmobile(ctx, x, y, s, t) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rrect(ctx, -260, -40, 460, 60, 20); fillStroke(ctx, '#3b3a44', 8); ctx.beginPath(); ctx.moveTo(-200, -40); ctx.quadraticCurveTo(-120, -200, 120, -150); ctx.lineTo(220, -60); ctx.lineTo(200, -40); ctx.closePath(); fillStroke(ctx, '#2f63c9', 8); path(ctx, [[60, -150], [120, -230], [150, -160]]); fillStroke(ctx, '#bfe3ff', 6); line(ctx, 160, 20, 300, 30, 10); ctx.restore(); }
function roadSign(ctx, x, y, s, label, col = '#2f7a3e') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); line(ctx, 0, 0, 0, -300, 16, '#6b4a2c'); rrect(ctx, -170, -440, 340, 150, 14); fillStroke(ctx, col, 9); rrect(ctx, -150, -420, 300, 110, 8); fillStroke(ctx, null, 5, '#fff'); text(ctx, label, 0, -365, 80, '#fff', INK, 0, 'Poppins', 700); ctx.restore(); }
function boxTruck(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rrect(ctx, -300, -340, 400, 300, 10); fillStroke(ctx, '#f3ecd8', 8); rrect(ctx, 100, -240, 160, 200, 20); fillStroke(ctx, '#2f63c9', 8); rrect(ctx, 150, -220, 90, 80, 10); fillStroke(ctx, '#bfe3ff', 6); for (const wx of [-200, 0, 180]) { circle(ctx, wx, -30, 50); fillStroke(ctx, '#2a2630', 8); circle(ctx, wx, -30, 20); ctx.fillStyle = '#b9c0c8'; ctx.fill(); } ctx.restore(); }
function studioMic(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); line(ctx, 0, 0, 0, 300, 14); ellipse(ctx, 0, 300, 120, 24); fillStroke(ctx, '#2a2630', 7); rrect(ctx, -60, -180, 120, 200, 60); fillStroke(ctx, '#8a929c', 8); for (let i = 0; i < 5; i++) line(ctx, -50, -140 + i * 30, 50, -140 + i * 30, 4, '#5a5560'); ctx.restore(); }
function rocker(ctx, x, y, s, t, a = 1) { // a generic long-haired rock-star silhouette, waving
  ctx.save(); ctx.globalAlpha = a;
  const wave = Math.sin(t * 8) * .4;
  drawStick(ctx, { x, y, s, sil: '#1d1a22', shadow: false, hat: 'none', arms: { L: [.3, -.1], R: [2.6 + wave, .2] } });
  const hx = x, hy = y - .765 * s, hr = .19 * s; ctx.beginPath(); ctx.arc(hx, hy, hr * 1.1, Math.PI * .9, Math.PI * 2.1); ctx.lineTo(hx + hr * 1.2, hy + hr * 1.9); ctx.lineTo(hx - hr * 1.2, hy + hr * 1.9); ctx.closePath(); ctx.fillStyle = '#1d1a22'; ctx.fill();
  ctx.restore();
}
function laptop(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rrect(ctx, -300, -400, 600, 380, 16); fillStroke(ctx, '#3b3a44', 9); rrect(ctx, -270, -370, 540, 320, 6); fillStroke(ctx, '#bfe3ff', 6); circle(ctx, 0, -385, 7); ctx.fillStyle = '#7fe08a'; ctx.fill(); path(ctx, [[-340, -20], [340, -20], [380, 20], [-380, 20]]); fillStroke(ctx, '#5a5560', 8); ctx.restore(); }
function room(ctx, light, dim = 0, wall = '#e8d6ae') { ctx.fillStyle = mix(wall, '#140f16', dim); ctx.fillRect(-900, -900, 2900, 2400); ctx.fillStyle = mix('#9a6a40', '#0d0906', dim); ctx.fillRect(-900, 1440, 2900, 1200); line(ctx, -900, 1440, 2000, 1440, 8, INK); }
function desk(ctx, y = 1180) { ctx.fillStyle = '#b07a4a'; ctx.fillRect(-900, y, 2900, 1200); line(ctx, -900, y, 2000, y, 10, INK); for (let i = 0; i < 6; i++) line(ctx, -900, y + 60 + i * 90, 2000, y + 60 + i * 90, 4, '#9a6a40'); }
function doorstep(ctx, light, t) {
  sky(ctx, light); drawCloud(ctx, 200 + t * 5, 250, 100, 1);
  ctx.fillStyle = '#c9a874'; ctx.fillRect(-900, 300, 2900, 1150); for (let y = 330; y < 1450; y += 50) line(ctx, -900, y, 2000, y, 3, '#b8955e');
  rrect(ctx, 390, 640, 300, 800, 10); fillStroke(ctx, '#9a3a2a', 9); circle(ctx, 640, 1060, 14); ctx.fillStyle = GOLDC; ctx.fill();
  ctx.fillStyle = '#9a8f80'; ctx.fillRect(-900, 1440, 2900, 1200); rrect(ctx, 300, 1420, 480, 50, 8); fillStroke(ctx, '#b9b2a8', 8); line(ctx, -900, 1440, 2000, 1440, 8, INK);
}
function snowRoad(ctx, t) { sky(ctx, 'day'); for (let i = 0; i < 6; i++) { path(ctx, [[-200 + i * 260, 1000], [-60 + i * 260, 700 - (i % 2) * 80], [80 + i * 260, 1000]]); fillStroke(ctx, '#e8f0f8', 7); } ctx.fillStyle = '#f6f9fc'; ctx.fillRect(-900, 1000, 2900, 1600); line(ctx, -900, 1000, 2000, 1000, 8, INK); ctx.fillStyle = '#9aa4b0'; ctx.fillRect(-900, 1300, 2900, 180); }
function prairieTown(ctx, light, t) { sky(ctx, light); drawCloud(ctx, 160 + t * 5, 260, 110, 2); drawCloud(ctx, 860 + t * 4, 180, 80, 3); ctx.fillStyle = '#e9c46a'; ctx.fillRect(-900, 1000, 2900, 1600); line(ctx, -900, 1000, 2000, 1000, 8, INK); for (let i = 0; i < 5; i++) { rrect(ctx, -100 + i * 260, 820, 180, 180, 4); fillStroke(ctx, ['#c9a874', '#e8e2d2', '#a8553a', '#d6c4a0', '#8a6a5a'][i], 7); path(ctx, [[-110 + i * 260, 820], [-10 + i * 260, 760], [90 + i * 260, 820]]); fillStroke(ctx, '#5a4a4a', 7); } rrect(ctx, 880, 560, 120, 440, 6); fillStroke(ctx, '#c9862a', 8); }
function park(ctx, light, t) { sky(ctx, light); drawCloud(ctx, 200 + t * 4, 220, 100, 4); ctx.fillStyle = '#7fc06a'; ctx.fillRect(-900, 1150, 2900, 1600); line(ctx, -900, 1150, 2000, 1150, 8, INK); for (const tx of [60, 1020]) { line(ctx, tx, 1150, tx, 880, 26, '#6b4a2c'); circle(ctx, tx, 820, 130); fillStroke(ctx, '#3fa35b', 8); } }
function scoreboard(ctx, x, y, s, flip, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rrect(ctx, -330, -200, 660, 330, 20); fillStroke(ctx, '#1d1a22', 10);
  const cell = (cx, label, val, k) => { text(ctx, label, cx, -120, 50, '#e8e2d2', INK, 0, 'Poppins', 700); ctx.save(); ctx.translate(cx, 20); ctx.scale(1, Math.max(.02, Math.abs(Math.cos(Math.min(k, 1) * Math.PI)))); rrect(ctx, -110, -90, 220, 180, 12); fillStroke(ctx, '#2f2b38', 7); text(ctx, k < .5 ? '0' : val, 0, 5, 140, '#ffd23a', INK, 0, 'Poppins', 700); ctx.restore(); };
  cell(-160, 'KYLE', '1', flip[0]); cell(160, 'KIPLING', '2', flip[1]);
  ctx.restore();
}
function camera(ctx, x, y, s, flashA) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rrect(ctx, -60, -40, 120, 80, 12); fillStroke(ctx, '#2a2630', 6); circle(ctx, 0, 0, 26); fillStroke(ctx, '#5a5560', 5); ctx.restore(); if (flashA > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; circle(ctx, x, y - 30 * s, 120 * s * flashA); ctx.fillStyle = `rgba(255,255,240,${.8 * flashA})`; ctx.fill(); ctx.restore(); } }
function shelf(ctx, x, y, w) { rrect(ctx, x - w / 2, y, w, 26, 6); fillStroke(ctx, '#8a5a32', 7); }
