// ---------- The Man Who Sold Rocks: 1970s cast, sets and props (all generic; boxes say PET ROCK in plain lettering) ----------
const GOLDC = '#e8b23a', CARD = '#c9a06a', CARD_D = '#a87e4a';
const LIGHT = { day: ['#5fb2ee', '#d9effb'], golden: ['#e98a4a', '#fdd9a0'] };
function sky(ctx, light) { drawSky(ctx, LIGHT[light][0], LIGHT[light][1], -400, 1150); }
function goldenGrade(ctx, a = 1) { if (a <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'soft-light'; ctx.globalAlpha = .5 * a; ctx.fillStyle = '#ff9a3c'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
function glowAt(ctx, x, y, r, col, a) { if (a <= 0) return; ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore(); }

const GARY = { cols: ['#8a5a32', '#8a5a32'], hat: 'none', belt: false, look: { hair70: '#5a3a24', mous: '#5a3a24', lapels: '#6b4426', tie: '#d8743a' } };
const FRIENDS = [
  { cols: ['#3f8a6a', '#3f8a6a'], hat: 'none', belt: false, look: { hair70: '#2a2024', lapels: '#2f6a52', tie: '#e8c04a' } },
  { cols: ['#c9862a', '#c9862a'], hat: 'none', belt: false, look: { hairLong: '#7a4a2a' } },
  { cols: ['#7a4bc4', '#7a4bc4'], hat: 'none', belt: false, look: { hair70: '#c9a26a', mous: '#c9a26a' } },
  { cols: ['#d8506a', '#d8506a'], hat: 'none', belt: false, look: { hairLong: '#2a2024' } },
];
const INVESTOR = { cols: ['#2b2733', '#2b2733'], hat: 'none', belt: false, look: { bald: '#8a8a8a', lapels: '#1d1a22', tie: '#c22a2a' } };
function person(ctx, base, o) {
  const p = Object.assign({}, base, o); drawStick(ctx, p);
  const L = base.look || {}; const s = p.s, hx = p.x, hy = p.y - .765 * s * (p.squash || 1), hr = .19 * s, lw = s * .014;
  if (L.lapels) { for (const sd of [-1, 1]) path(ctx, [[hx + sd * .02 * s, p.y - .6 * s], [hx + sd * .1 * s, p.y - .6 * s], [hx + sd * .03 * s, p.y - .42 * s]]); ctx.fillStyle = L.lapels; ctx.fill(); }
  if (L.tie) { path(ctx, [[hx - .025 * s, p.y - .6 * s], [hx + .025 * s, p.y - .6 * s], [hx + .045 * s, p.y - .4 * s], [hx, p.y - .35 * s], [hx - .045 * s, p.y - .4 * s]]); fillStroke(ctx, L.tie, lw * .8); }
  if (L.hair70) { ctx.beginPath(); ctx.ellipse(hx, hy - hr * .35, hr * 1.12, hr * .78, 0, Math.PI * .95, Math.PI * 2.05); ctx.quadraticCurveTo(hx + hr * .6, hy - hr * .55, hx, hy - hr * .5); ctx.quadraticCurveTo(hx - hr * .6, hy - hr * .55, hx - hr * 1.1, hy - hr * .1); ctx.closePath(); fillStroke(ctx, L.hair70, lw); for (const sd of [-1, 1]) { rrect(ctx, hx + sd * hr * .95 - hr * .1, hy - hr * .3, hr * .2, hr * .6, hr * .08); fillStroke(ctx, L.hair70, lw * .8); } }
  if (L.hairLong) { ctx.beginPath(); ctx.arc(hx, hy - hr * .05, hr * 1.06, Math.PI * .95, Math.PI * 2.05); ctx.lineTo(hx + hr * 1.06, hy + hr * 1.0); ctx.lineTo(hx + hr * .8, hy + hr * 1.0); ctx.lineTo(hx + hr * .8, hy - hr * .4); ctx.quadraticCurveTo(hx, hy - hr * .75, hx - hr * .8, hy - hr * .4); ctx.lineTo(hx - hr * .8, hy + hr * 1.0); ctx.lineTo(hx - hr * 1.06, hy + hr * 1.0); ctx.closePath(); fillStroke(ctx, L.hairLong, lw); }
  if (L.bald) for (const sd of [-1, 1]) { ellipse(ctx, hx + sd * hr * .92, hy - hr * .05, hr * .14, hr * .3); fillStroke(ctx, L.bald, lw); }
  if (L.mous) { ctx.beginPath(); const my = hy + hr * .33; ctx.moveTo(hx, my - hr * .08); ctx.quadraticCurveTo(hx + hr * .35, my - hr * .2, hx + hr * .55, my + hr * .12); ctx.quadraticCurveTo(hx + hr * .3, my + hr * .05, hx, my + hr * .08); ctx.quadraticCurveTo(hx - hr * .3, my + hr * .05, hx - hr * .55, my + hr * .12); ctx.quadraticCurveTo(hx - hr * .35, my - hr * .2, hx, my - hr * .08); fillStroke(ctx, L.mous, lw); }
}
// ---------- props ----------
function rock(ctx, x, y, s, seed = 1, rot = 0) { // a smooth grey beach stone
  const R = rng(seed);
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ellipse(ctx, 0, 52, 120, 22); ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fill();
  ctx.beginPath(); for (let i = 0; i <= 24; i++) { const a = i / 24 * TAU; const rr = 1 + .06 * Math.sin(a * 3 + seed) + .03 * Math.sin(a * 5 + seed * 2); const px = Math.cos(a) * 125 * rr, py = Math.sin(a) * 78 * rr; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath();
  ctx.save(); ctx.clip();
  const g = ctx.createLinearGradient(-80, -80, 80, 90); g.addColorStop(0, '#bdbab4'); g.addColorStop(1, '#7d7a76'); ctx.fillStyle = g; ctx.fillRect(-140, -100, 280, 200);
  for (let i = 0; i < 40; i++) { circle(ctx, (R() - .5) * 240, (R() - .5) * 150, 1.5 + R() * 3.5); ctx.fillStyle = R() > .5 ? 'rgba(60,58,56,.45)' : 'rgba(235,232,226,.5)'; ctx.fill(); }
  ellipse(ctx, -35, -38, 52, 18, -.25); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fill();
  ctx.restore();
  ctx.lineWidth = 7; ctx.strokeStyle = INK; ctx.stroke();
  ctx.restore();
}
function straw(ctx, x, y, w, h, seed = 3) { const R = rng(seed); for (let i = 0; i < 60; i++) { const sx = x + (R() - .5) * w, sy = y + (R() - .5) * h, a = (R() - .5) * 1.6; line(ctx, sx - Math.cos(a) * 30, sy - Math.sin(a) * 30, sx + Math.cos(a) * 30, sy + Math.sin(a) * 30, 5, R() > .5 ? '#e8c46a' : '#c9a24a'); } }
function petBox(ctx, x, y, s, o = {}) { // a cardboard pet-carrier box with air holes; o.open 0..1 lifts the lid; o.inside draws the rock on straw
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rrect(ctx, -220, -240, 440, 240, 10); fillStroke(ctx, CARD, 8);
  if (o.inside !== false && (o.open || 0) > .05) { ctx.save(); rrect(ctx, -205, -235, 410, 120, 6); ctx.clip(); straw(ctx, 0, -170, 400, 110); ctx.restore(); if (o.inside) rock(ctx, 0, -215, .9, 4); }
  for (let i = 0; i < 4; i++) { circle(ctx, -150 + i * 100, -150, 16); ctx.fillStyle = '#3a2a1a'; ctx.fill(); }
  if (!o.noLabel) text(ctx, 'PET ROCK', 0, -60, 54, '#3a2414', INK, 0, 'Poppins', 700);
  const open = o.open || 0;
  ctx.save(); ctx.translate(-220, -240); ctx.rotate(-open * 1.9);
  rrect(ctx, 0, -40, 440, 40, 8); fillStroke(ctx, CARD_D, 8); for (let i = 0; i < 3; i++) { circle(ctx, 120 + i * 100, -20, 10); ctx.fillStyle = '#3a2a1a'; ctx.fill(); }
  ctx.restore(); ctx.restore();
}
function manual(ctx, x, y, s, page = null, open = 0) { // the TRAINING MANUAL booklet; page = a command shown on its open spread
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (open < .5) { rrect(ctx, -150, -200, 300, 400, 10); fillStroke(ctx, '#e8dcc0', 8); rrect(ctx, -150, -200, 300, 90, [10, 10, 0, 0]); ctx.fillStyle = '#2f63c9'; ctx.fill(); text(ctx, 'TRAINING', 0, -50, 46, '#1d1a22', INK, 0, 'Poppins', 700); text(ctx, 'MANUAL', 0, 10, 46, '#1d1a22', INK, 0, 'Poppins', 700); rock(ctx, 0, 110, .55, 2); }
  else { rrect(ctx, -320, -220, 640, 440, 10); fillStroke(ctx, '#f6efe0', 8); line(ctx, 0, -220, 0, 220, 6, '#c9b896'); for (let i = 0; i < 6; i++) line(ctx, -280, -150 + i * 50, -40, -150 + i * 50, 8, '#d8ccb0'); if (page) text(ctx, page, 160, 0, page.length > 6 ? 54 : 70, '#1d1a22', INK, 0, 'Poppins', 700); }
  ctx.restore();
}
function goldStar(ctx, x, y, r, k) { if (k <= 0) return; const e = backOut(clamp(k)); star5(ctx, x, y, r * e, k * .3, '#ffd23a'); }
function cashFan(ctx, x, y, s, spread = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (let i = -3; i <= 3; i++) { ctx.save(); ctx.rotate(i * .16 * spread); rrect(ctx, -40, -170, 80, 170, 6); fillStroke(ctx, '#8fd09a', 5); rrect(ctx, -26, -150, 52, 130, 4); fillStroke(ctx, null, 3, '#3f8a52'); circle(ctx, 0, -85, 18); fillStroke(ctx, '#bfe3c0', 3, '#3f8a52'); ctx.restore(); } ctx.restore(); }
function cashPile(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const R = rng(7); for (let i = 0; i < 40; i++) { const px = (R() - .5) * 520 * (1 - i / 60), py = -i * 7 + (R() - .5) * 20; ctx.save(); ctx.translate(px, py); ctx.rotate((R() - .5) * .8); rrect(ctx, -60, -26, 120, 52, 5); fillStroke(ctx, '#8fd09a', 4); circle(ctx, 0, 0, 12); fillStroke(ctx, '#bfe3c0', 3, '#3f8a52'); ctx.restore(); } ctx.restore(); }
function sign(ctx, x, y, s, label, col = '#f3ecd8', txt = '#1d1a22', w = 420) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); line(ctx, 0, 0, 0, 260, 14, '#6b4a2c'); rrect(ctx, -w / 2, -120, w, 130, 12); fillStroke(ctx, col, 8); text(ctx, label, 0, -55, label.length > 12 ? 40 : 56, txt, INK, 0, 'Poppins', 700); ctx.restore(); }
function calendarPage(ctx, x, y, s, month, year) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); rrect(ctx, -240, -300, 480, 560, 20); fillStroke(ctx, '#fbf8f0', 9); ctx.save(); rrect(ctx, -240, -300, 480, 560, 20); ctx.clip(); ctx.fillStyle = '#c8323a'; ctx.fillRect(-250, -310, 500, 160); ctx.restore(); rrect(ctx, -240, -300, 480, 560, 20); fillStroke(ctx, null, 9); text(ctx, month, 0, -222, month.length > 6 ? 62 : 80, '#fff', INK, 0, 'Lora', 700); text(ctx, year, 0, 40, 150, '#1d1a22', INK, 0, 'Lora', 700); ctx.restore(); }
function priceTag(ctx, x, y, s, label) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-.18); path(ctx, [[-170, -70], [130, -70], [190, 0], [130, 70], [-170, 70]]); fillStroke(ctx, '#ffd23a', 8); circle(ctx, 120, 0, 14); ctx.fillStyle = INK; ctx.fill(); text(ctx, label, -30, 4, 80, '#1d1a22', INK, 0, 'Poppins', 700); ctx.restore(); }
function shelves(ctx, x, y, w, rows, t, fly = 0) { for (let r = 0; r < rows; r++) { const sy = y + r * 260; rrect(ctx, x - w / 2, sy, w, 26, 6); fillStroke(ctx, '#8a5a32', 7); for (let i = 0; i < 4; i++) { const k = clamp(fly * 4 - (r * 4 + i) * .15); if (k >= 1) continue; ctx.save(); ctx.translate(x - w / 2 + 90 + i * (w - 180) / 3, sy - k * 900); ctx.rotate(k * 3); petBox(ctx, 0, 0, .32, {}); ctx.restore(); } } }
function tvSet(ctx, t) { // a generic late-night set: city skyline backdrop, desk, guest chair
  ctx.fillStyle = '#1a2240'; ctx.fillRect(-900, -900, 2900, 3200);
  for (let i = 0; i < 14; i++) { const h = 300 + (i * 97 % 380); rrect(ctx, -100 + i * 90, 1100 - h, 80, h, 0); ctx.fillStyle = '#26305a'; ctx.fill(); for (let k = 0; k < h / 60; k++) if ((i + k) % 3) { rrect(ctx, -84 + i * 90, 1120 - h + k * 60, 16, 20, 2); ctx.fillStyle = '#ffd98a'; ctx.fill(); } }
  ctx.fillStyle = '#5a2a3a'; ctx.fillRect(-900, 1100, 2900, 1200); line(ctx, -900, 1100, 2000, 1100, 8, INK);
  rrect(ctx, 40, 1050, 420, 260, 16); fillStroke(ctx, '#7a4a2a', 8); // host desk (empty)
  rrect(ctx, 560, 1000, 360, 140, 40); fillStroke(ctx, '#3a6aa8', 8); rrect(ctx, 580, 1120, 320, 160, 30); fillStroke(ctx, '#3a6aa8', 8); // guest chair
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; path(ctx, [[700, -100], [800, -100], [960, 1250], [560, 1250]]); ctx.fillStyle = 'rgba(255,240,200,.10)'; ctx.fill(); ctx.restore();
}
function bar70s(ctx, t) {
  ctx.fillStyle = '#5a3420'; ctx.fillRect(-900, -900, 2900, 3200);
  for (let x = -800; x < 1900; x += 120) line(ctx, x, -900, x, 1200, 6, '#4a2a18');
  for (const lx of [200, 540, 880]) { line(ctx, lx, 0, lx, 300, 6, INK); ctx.beginPath(); ctx.moveTo(lx - 90, 380); ctx.lineTo(lx - 40, 290); ctx.lineTo(lx + 40, 290); ctx.lineTo(lx + 90, 380); ctx.closePath(); fillStroke(ctx, '#d8743a', 6); glowAt(ctx, lx, 420, 300, '255,190,110', .35); }
  rrect(ctx, -100, 860, 1280, 70, 10); fillStroke(ctx, '#8a4a24', 9); rrect(ctx, -100, 930, 1280, 600, 0); fillStroke(ctx, '#6b3a1e', 9);
  for (let i = 0; i < 7; i++) { rrect(ctx, 40 + i * 150, 600, 50, 120, 10); fillStroke(ctx, ['#3f8a52', '#c9862a', '#7a1f2a'][i % 3], 5); }
  rrect(ctx, -100, 720, 1280, 20, 4); fillStroke(ctx, '#8a4a24', 6);
}
function beach(ctx, light, t, o = {}) {
  sky(ctx, light); if (o.sun) drawSun(ctx, 820, 420, 80, t, .8);
  drawCloud(ctx, 200 + t * 5, 260, 100, 1);
  drawSea(ctx, 900, t, 1180, ['#9fe0e0', '#3fb0c0', '#1d8fa6']);
  ctx.fillStyle = '#ecd9a8'; ctx.fillRect(-900, 1180, 2900, 1600); line(ctx, -900, 1180, 2000, 1180, 6, INK);
  if (o.foam != null) { ctx.save(); ctx.globalAlpha = .8; ctx.beginPath(); ctx.moveTo(-900, 1180); for (let x = -900; x <= 2000; x += 40) ctx.lineTo(x, 1180 + o.foam + Math.sin(x * .02 + t * 2) * 18); ctx.lineTo(2000, 1180); ctx.closePath(); ctx.fillStyle = '#f6fbfc'; ctx.fill(); ctx.restore(); }
}
function bulb(ctx, x, y, s, on = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); glowAt(ctx, 0, -40, 260, '255,230,140', .6 * on); circle(ctx, 0, -60, 110); fillStroke(ctx, '#fff6c4', 8); rrect(ctx, -50, 40, 100, 70, 8); fillStroke(ctx, '#b9b2a8', 7); ctx.restore(); }
function horseshoe(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.arc(0, 0, 110, Math.PI * .85, Math.PI * 2.15, false); ctx.lineWidth = 60; ctx.strokeStyle = INK; ctx.stroke(); ctx.lineWidth = 46; ctx.strokeStyle = '#b9c0c8'; ctx.stroke(); for (let i = 0; i < 6; i++) { const a = Math.PI * .95 + i * .26; circle(ctx, Math.cos(a) * 110, Math.sin(a) * 110, 7); ctx.fillStyle = INK; ctx.fill(); } ctx.restore(); }
function noteGlyph(ctx, x, y, s, a = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; text(ctx, '♪', x, y, 90 * s, '#ffe9a8', INK, 6, 'Poppins', 700); ctx.restore(); }
