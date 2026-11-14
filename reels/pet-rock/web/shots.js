// Zero to Empire #2: The Man Who Sold Rocks. Shot list in seconds of the voiceover (see SCRIPT.md).
// Loop: frame 1 is an extreme close-up of one rock, filling the screen. The opening pulls back from it to its box;
// the last shot zooms into a beach rock at the same spot until it fills the screen again.
const END = 55.082 + 0.1;
const at = (abs, start) => abs - start;
const handheld = (t, a = 3) => shake(t * .35, a, 1, 2);
const walkLegs = (t, sp = 9, amp = .55) => ({ L: [Math.sin(t * sp) * amp + .05, -Math.max(0, Math.sin(t * sp + 1)) * .7], R: [-Math.sin(t * sp) * amp + .05, -Math.max(0, -Math.sin(t * sp + 1)) * .7] });
function flash(ctx, a) { if (a <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = clamp(a); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
const RX = 540, RY = 1000, RS = .9, Z0 = 16;           // the loop rock: world position, size, and the fill-the-screen zoom
const loopRock = ctx => rock(ctx, RX, RY, RS, 4, 0);
const holdOut = { L: [.3, -.1], R: { ik: [.4, -.62] } };

// tau >= 0: pull back from the rock to its box, stacks of boxes and a 1970s man fanning cash
function hookScene(ctx, tau) {
  const z = tau <= 0 ? Z0 : lerp(Z0, 1.0, easeOut(clamp(tau / 2.4)));
  applyCam(ctx, { x: RX, y: RY + (1 - clamp(z / Z0)) * 0, z, r: 0 }, 1);
  sky(ctx, 'day'); ctx.fillStyle = '#e8dcc0'; ctx.fillRect(-900, -900, 2900, 2000); ctx.fillStyle = '#b9a07a'; ctx.fillRect(-900, 1240, 2900, 1600); line(ctx, -900, 1240, 2000, 1240, 8, INK);
  for (const [bx, by] of [[150, 1240], [150, 1000], [930, 1240], [930, 1000], [930, 760]]) petBox(ctx, bx, by, .5, {});
  petBox(ctx, RX, RY + 215 * 1.0 + 25, 1.0, { open: 1, inside: false, noLabel: true });
  ctx.save(); rrect(ctx, RX - 205, RY + 25, 410, 120, 6); ctx.clip(); straw(ctx, RX, RY + 80, 400, 110); ctx.restore();
  const cash = clamp((tau - 2.2) * 2);
  if (cash > 0) { person(ctx, GARY, { x: 300, y: 1880, s: 560, alpha: 1, face: { eyes: 'happy', mouth: 'grin' }, arms: { L: [.3, -.1], R: { ik: [.35, -.95] } } }); cashFan(ctx, 300 + .35 * 560, 1880 - .95 * 560, .9 * backOut(cash), cash); }
  loopRock(ctx);
}
// tau < 0: waves wash over a beach of ordinary rocks; the camera settles on one rock until it fills the screen
function beachSettle(ctx, tau, t) {
  const u = clamp((tau + 2.0) / 2.0); const z = lerp(1.0, Z0, Math.pow(u, 2.6));
  applyCam(ctx, { x: RX, y: RY, z, r: 0 }, 1);
  beach(ctx, 'golden', t, { foam: 60 + Math.sin(t * 1.5) * 50, sun: true });
  const R = rng(12); for (let i = 0; i < 22; i++) { const x = R() * 1200 - 60, y = 1220 + R() * 700; if (Math.abs(x - RX) < 200 && Math.abs(y - RY) < 160) continue; rock(ctx, x, y, .35 + R() * .4, i + 20, (R() - .5) * .6); }
  rock(ctx, 300, 1050, .5, 31, .2); rock(ctx, 820, 1080, .6, 32, -.3);
  loopRock(ctx);
  goldenGrade(ctx, 1 - u);
}

const SHOTS = [];
// 1 Hook (Day): already moving — pull back from the rock to its box, stacks of boxes, a man fanning cash
SHOTS.push({ start: 0, end: 3.92, tr: 'cut', draw(ctx, lt) { hookScene(ctx, lt); } });
// 2 Stakes (Day): a tiny booklet titled TRAINING MANUAL flips open beside the rock
SHOTS.push({ start: 3.92, end: 5.76, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 2); applyCam(ctx, { x: 540 + hh[0], y: 960 + hh[1], z: 1.05 + lt * .04, r: 0 }, 1);
  ctx.fillStyle = '#e8dcc0'; ctx.fillRect(-900, -900, 2900, 3200); ctx.fillStyle = '#c9a874'; ctx.fillRect(-900, 1150, 2900, 1600); line(ctx, -900, 1150, 2000, 1150, 8, INK);
  rock(ctx, 300, 1100, 1.1, 4);
  const op = clamp((lt - at(5.2, 3.92)) * 4);
  manual(ctx, 720, 900, .95 + op * .1, op > .5 ? 'COME' : null, op);
  flash(ctx, kf(lt, [[0, .9], [.25, 0]]));
} });
// 3 Bar (Golden): a 1970s bar — one friend holds up a chewed shoe, another a tangled leash; Gary listens, grinning
SHOTS.push({ start: 5.76, end: 8.96, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 2); applyCam(ctx, { x: 540 + hh[0], y: 1000 + hh[1], z: 1.0 + lt * .03, r: 0 }, 1);
  bar70s(ctx, t);
  person(ctx, FRIENDS[0], { x: 200, y: 1900, s: 560, face: { eyes: 'half', mouth: 'frown', browAng: .3 }, arms: { L: [.3, -.1], R: { ik: [.3, -.95] } } });
  ctx.save(); ctx.translate(200 + .3 * 560, 1900 - .95 * 560 - 40); ctx.rotate(-.3); ctx.beginPath(); ctx.moveTo(-70, 20); ctx.quadraticCurveTo(-60, -40, 10, -40); ctx.lineTo(70, -10); ctx.lineTo(70, 20); ctx.closePath(); fillStroke(ctx, '#7a4a2a', 6); for (let i = 0; i < 4; i++) { circle(ctx, -40 + i * 25, 20, 9); ctx.fillStyle = '#5a3420'; ctx.fill(); } ctx.restore();
  person(ctx, FRIENDS[1], { x: 880, y: 1900, s: 560, flip: -1, face: { eyes: 'half', mouth: 'frown' }, arms: { L: [.3, -.1], R: { ik: [.3, -.95] } } });
  ctx.save(); ctx.translate(880 - .3 * 560, 1900 - .95 * 560); ctx.beginPath(); for (let i = 0; i < 40; i++) { const a = i * .6; ctx.lineTo(Math.cos(a) * (20 + i * 1.5) + Math.sin(i) * 10, i * 4 + Math.sin(a) * 18); } ctx.lineWidth = 7; ctx.strokeStyle = '#c22a2a'; ctx.stroke(); ctx.restore();
  person(ctx, GARY, { x: 540, y: 1960, s: 600, face: { eyes: 'normal', look: [Math.sin(lt * 1.5), -.2], mouth: 'grin' }, arms: POSE.idle.arms });
  goldenGrade(ctx);
} });
// 4 Joke (Golden): Gary sets a rock on the bar and pats it like a dog; his friends burst out laughing
SHOTS.push({ start: 8.96, end: 13.12, tr: 'cut', draw(ctx, lt, t) {
  const set = at(10.3, 8.96), laugh = at(10.96, 8.96);
  const hh = handheld(t, 2); applyCam(ctx, { x: 540 + hh[0], y: 1000 + hh[1], z: 1.0 + lt * .025, r: 0 }, 1);
  bar70s(ctx, t);
  const rx = 560, ry = 860, d = lt > set ? 0 : (set - lt) * 300;
  if (lt > set - .8) rock(ctx, rx, ry - d, .9, 5);
  const pat = lt > set ? Math.abs(Math.sin((lt - set) * 7)) : 0;
  person(ctx, GARY, { x: 300, y: 1880, s: 620, face: { eyes: lt > set ? 'happy' : 'normal', mouth: 'grin' }, arms: { L: [.3, -.1], R: { ik: [.42, -.92 + pat * .06] } } });
  for (const [i, x, f] of [[0, 760, -1], [2, 990, -1]]) { const l = lt > laugh; const bob = l ? Math.abs(Math.sin(lt * 14 + i)) * .02 : 0; person(ctx, FRIENDS[i], { x, y: 1880, s: 560, flip: f, bob: -bob, face: { eyes: l ? 'happy' : 'normal', mouth: l ? 'grin' : 'o' }, arms: l ? { L: { ik: [-.05, -.45] }, R: { ik: [.05, -.45] } } : POSE.idle.arms }); }
  goldenGrade(ctx);
} });
// 5 Stones (Day): a sunny beach — Gary scoops smooth stones into a sack beside a sign reading LESS THAN 1¢ EACH
SHOTS.push({ start: 13.12, end: 16.16, tr: 'fade', draw(ctx, lt, t) {
  const hh = handheld(t, 2); applyCam(ctx, { x: 540 + hh[0], y: 1000 + hh[1], z: 1.0 + lt * .03, r: 0 }, 1);
  beach(ctx, 'day', t, { sun: true, foam: 30 + Math.sin(t * 1.5) * 25 });
  sign(ctx, 830, 1200, .95, 'LESS THAN 1¢ EACH', '#f3ecd8', '#1d1a22', 470);
  ctx.save(); ctx.translate(560, 1720); ctx.beginPath(); ctx.moveTo(-110, 0); ctx.quadraticCurveTo(-130, -200, -60, -240); ctx.lineTo(60, -240); ctx.quadraticCurveTo(130, -200, 110, 0); ctx.closePath(); fillStroke(ctx, '#c9a874', 8); ctx.restore();
  const R = rng(3); for (let i = 0; i < 9; i++) rock(ctx, 100 + R() * 900, 1500 + R() * 380, .25 + R() * .2, i + 40);
  const scoop = (lt * 1.4) % 1;
  person(ctx, GARY, { x: 300, y: 1880, s: 580, lean: 0, face: { eyes: 'happy', mouth: 'grin' }, arms: { L: [.3, -.1], R: { ik: [lerp(.45, .5, scoop), lerp(-.2, -.6, Math.sin(scoop * Math.PI))] } } });
  rock(ctx, 300 + .48 * 580, 1880 - lerp(.2, .6, Math.sin(scoop * Math.PI)) * 580 - 10, .3, 50);
} });
// 6 Box (Day): a rock is laid on straw in a box with air holes, and the lid closes gently
SHOTS.push({ start: 16.16, end: 19.36, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 2); applyCam(ctx, { x: 540 + hh[0], y: 1000 + hh[1], z: 1.15 + lt * .03, r: 0 }, 1);
  ctx.fillStyle = '#e8dcc0'; ctx.fillRect(-900, -900, 2900, 3200); ctx.fillStyle = '#c9a874'; ctx.fillRect(-900, 1180, 2900, 1600); line(ctx, -900, 1180, 2000, 1180, 8, INK);
  const drop = easeOut(clamp(lt / .8)), close = ease(clamp((lt - at(18.4, 16.16)) / .8));
  petBox(ctx, 540, 1280, 1.3, { open: 1 - close, inside: false, noLabel: true });
  if (close < .6) { ctx.save(); rrect(ctx, 540 - 205 * 1.3, 1280 - 235 * 1.3, 410 * 1.3, 120 * 1.3, 6); ctx.clip(); straw(ctx, 540, 1280 - 170 * 1.3, 520, 140); ctx.restore(); rock(ctx, 540, lerp(700, 1280 - 215 * 1.3, drop), 1.1, 4); }
  for (let i = 0; i < 4; i++) circle(ctx, 540 - 195 + i * 130, 1280 - 150 * 1.3, 20);
} });
// 7 Manual (Day): pages flip — COME, STAY, ROLL OVER, and the rock doesn't budge; then PLAY DEAD, and it earns a gold star
SHOTS.push({ start: 19.36, end: 23.12, tr: 'cut', draw(ctx, lt, t) {
  const pages = [[at(20.24, 19.36), 'COME'], [at(20.56, 19.36), 'STAY'], [at(21.04, 19.36), 'ROLL OVER'], [at(22.4, 19.36), 'PLAY DEAD']];
  const hh = handheld(t, 2); applyCam(ctx, { x: 540 + hh[0], y: 960 + hh[1], z: 1.0 + lt * .03, r: 0 }, 1);
  ctx.fillStyle = '#e8dcc0'; ctx.fillRect(-900, -900, 2900, 3200); ctx.fillStyle = '#c9a874'; ctx.fillRect(-900, 1180, 2900, 1600); line(ctx, -900, 1180, 2000, 1180, 8, INK);
  let page = null; for (const [pt, p] of pages) if (lt >= pt) page = p;
  manual(ctx, 540, 600, 1.15, page, 1);
  rock(ctx, 540, 1150, 1.0, 4);
  if (page && page !== 'PLAY DEAD') { const q = (lt * 2) % 1; text(ctx, '...', 700, 1020 - q * 20, 70, '#1d1a22', INK, 0, 'Poppins', 700); }
  goldStar(ctx, 720, 1010, 80, (lt - pages[3][0] - .15) * 4);
} });
// 8 Share moment (Day): in a gift shop, a friend grabs something purely because its box is funny; another rolls her eyes
SHOTS.push({ start: 23.12, end: 25.68, tr: 'fade', draw(ctx, lt, t) {
  const hh = handheld(t, 2); applyCam(ctx, { x: 540 + hh[0], y: 1000 + hh[1], z: 1.0 + lt * .03, r: 0 }, 1);
  ctx.fillStyle = '#f0d8c0'; ctx.fillRect(-900, -900, 2900, 3200); ctx.fillStyle = '#c98a5a'; ctx.fillRect(-900, 1350, 2900, 1600); line(ctx, -900, 1350, 2000, 1350, 8, INK);
  for (let r = 0; r < 3; r++) { rrect(ctx, 80, 420 + r * 250, 920, 24, 6); fillStroke(ctx, '#8a5a32', 7); for (let i = 0; i < 5; i++) { const c = ['#e0392f', '#3fa35b', '#2f63c9', '#f2b52a', '#7a4bc4'][(i + r) % 5]; rrect(ctx, 120 + i * 180, 420 + r * 250 - 110, 120, 110, 8); fillStroke(ctx, c, 6); } }
  const grab = easeOut(clamp((lt - .4) / .5));
  person(ctx, FRIENDS[2], { x: 300, y: 1900, s: 600, face: { eyes: 'happy', mouth: 'grin' }, arms: { L: [.3, -.1], R: { ik: [.3, -.95] } } });
  ctx.save(); ctx.translate(lerp(420, 300 + .3 * 600, grab), lerp(920, 1900 - .95 * 600 - 60, grab)); ctx.rotate(grab * .2);
  rrect(ctx, -90, -80, 180, 160, 10); fillStroke(ctx, '#ff8ac8', 7); circle(ctx, -35, -20, 22); fillStroke(ctx, '#fff', 5); circle(ctx, 35, -20, 22); fillStroke(ctx, '#fff', 5); circle(ctx, -30, -16, 9); ctx.fillStyle = INK; ctx.fill(); circle(ctx, 40, -26, 9); ctx.fill(); ctx.beginPath(); ctx.arc(0, 30, 30, .2, Math.PI - .2); ctx.lineWidth = 7; ctx.strokeStyle = INK; ctx.stroke(); ctx.restore();
  person(ctx, FRIENDS[3], { x: 820, y: 1900, s: 580, flip: -1, face: { eyes: 'normal', look: [Math.sin(lt * 3) * .6, -1], mouth: 'flat', browUp: 1 }, arms: { L: [.3, -.1], R: [.9, -2.1] } });
} });
// 9 Launch (Day): a calendar page for August 1975 and a price tag reading $3.95
SHOTS.push({ start: 25.68, end: 28.56, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 2); applyCam(ctx, { x: 540 + hh[0], y: 960 + hh[1], z: 1.0 + lt * .03, r: 0 }, 1);
  ctx.fillStyle = '#d9e8f0'; ctx.fillRect(-900, -900, 2900, 3200);
  const c = backOut(clamp(lt * 4)); ctx.save(); ctx.translate(540, 660); ctx.scale(c, c); calendarPage(ctx, 0, 0, 1.0, 'AUGUST', '1975'); ctx.restore();
  const p = backOut(clamp((lt - at(26.96, 25.68)) * 4)); if (p > 0) { ctx.save(); ctx.translate(560, 1060); ctx.scale(p, p); priceTag(ctx, 0, 0, 1.1, '$3.95'); ctx.restore(); }
} });
// 10 Boom (Golden): a counter spins to 10,000 A DAY as boxes fly off shop shelves
SHOTS.push({ start: 28.56, end: 30.80, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 3); applyCam(ctx, { x: 540 + hh[0], y: 960 + hh[1], z: 1.0 + lt * .04, r: 0 }, 1);
  ctx.fillStyle = '#f0d8c0'; ctx.fillRect(-900, -900, 2900, 3200);
  shelves(ctx, 540, 820, 900, 3, t, lt / 2.2);
  const spun = lt > at(29.84, 28.56);
  rrect(ctx, 190, 220, 700, 220, 20); fillStroke(ctx, '#1d1a22', 9);
  if (spun) text(ctx, '10,000 A DAY', 540, 332, 86, '#ffd23a', INK, 0, 'Poppins', 700);
  else { for (let i = 0; i < 5; i++) { rrect(ctx, 240 + i * 125, 260, 100, 140, 10); fillStroke(ctx, '#2f2b38', 5); const y = 330 + ((lt * 40 + i * .3) % 1) * 40 - 20; line(ctx, 260 + i * 125, y, 320 + i * 125, y, 10, '#ffd23a'); } }
  goldenGrade(ctx);
} });
// 11 Fame (Golden): a generic late-night TV set with a rock on the guest chair; then a crooner sings to a rock under a spotlight
SHOTS.push({ start: 30.80, end: 33.68, tr: 'fade', draw(ctx, lt, t) {
  const song = at(32.24, 30.80);
  const hh = handheld(t, 2); applyCam(ctx, { x: 540 + hh[0], y: 1000 + hh[1], z: 1.0 + lt * .03, r: 0 }, 1);
  if (lt < song) { tvSet(ctx, t); rock(ctx, 740, 1110, .9, 4); for (let i = 0; i < 6; i++) { const ph = (lt * 1.2 + i / 6) % 1; ctx.save(); ctx.globalAlpha = 1 - ph; star5(ctx, 640 + Math.cos(i) * 260, 900 - ph * 200, 20, 0, '#ffd23a'); ctx.restore(); } }
  else {
    ctx.fillStyle = '#1a1424'; ctx.fillRect(-900, -900, 2900, 3200);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; path(ctx, [[460, -200], [620, -200], [900, 1600], [180, 1600]]); ctx.fillStyle = 'rgba(255,235,190,.18)'; ctx.fill(); ctx.restore();
    ctx.fillStyle = '#2a2034'; ctx.fillRect(-900, 1500, 2900, 1000);
    rrect(ctx, 600, 1300, 260, 200, 10); fillStroke(ctx, '#3a2a4a', 7); rock(ctx, 730, 1290, .8, 4);
    person(ctx, FRIENDS[0], { x: 330, y: 1880, s: 620, face: { eyes: 'closed', mouth: 'o' }, arms: { L: [.3, -.1], R: { ik: [.12, -.82] } } });
    for (let i = 0; i < 3; i++) { const ph = ((lt - song) * .9 + i / 3) % 1; noteGlyph(ctx, 470 + ph * 200, 1100 - ph * 300, 1, 1 - ph); }
  }
  goldenGrade(ctx);
} });
// 12 Mystery (Day): a shopper holds a rock in one hand and four dollars in the other, puzzled
SHOTS.push({ start: 33.68, end: 36.00, tr: 'fade', draw(ctx, lt, t) {
  const hh = handheld(t, 2); applyCam(ctx, { x: 540 + hh[0], y: 1000 + hh[1], z: 1.05 + lt * .04, r: 0 }, 1);
  ctx.fillStyle = '#d9e8f0'; ctx.fillRect(-900, -900, 2900, 3200);
  person(ctx, FRIENDS[3], { x: 540, y: 2000, s: 760, face: { eyes: 'normal', look: [Math.sin(lt * 3), -.4], mouth: 'flat', browOne: 1 }, arms: { L: { ik: [-.42, -.75] }, R: { ik: [.42, -.75] } } });
  rock(ctx, 540 - .42 * 760, 2000 - .75 * 760 - 50, .7, 4);
  ctx.save(); ctx.translate(540 + .42 * 760, 2000 - .75 * 760 - 40); for (let i = 0; i < 4; i++) { ctx.save(); ctx.rotate(-.3 + i * .2); rrect(ctx, -30, -130, 60, 130, 5); fillStroke(ctx, '#8fd09a', 4); ctx.restore(); } ctx.restore();
  const q = backOut(clamp((lt - .5) * 3)); ctx.save(); ctx.translate(540, 560); ctx.scale(q, q); text(ctx, '?', 0, 0, 220, '#fff', INK, 16, 'Poppins', 700); ctx.restore();
} });
// 13 You see (Golden): under a Christmas tree, a wrapped gift opens to reveal a rock on straw; the whole family cracks up
SHOTS.push({ start: 36.00, end: 40.56, tr: 'fade', draw(ctx, lt, t) {
  const open = at(38.2, 36.0), laugh = at(38.8, 36.0);
  const hh = handheld(t, 2); applyCam(ctx, { x: 540 + hh[0], y: 1000 + hh[1], z: 1.0 + lt * .02, r: 0 }, 1);
  ctx.fillStyle = '#7a3a2a'; ctx.fillRect(-900, -900, 2900, 3200); ctx.fillStyle = '#5a2a1e'; ctx.fillRect(-900, 1350, 2900, 1600); line(ctx, -900, 1350, 2000, 1350, 8, INK);
  for (let k = 0; k < 4; k++) { const w = 380 - k * 80, y = 1250 - k * 220; path(ctx, [[540 - w, y], [540 + w, y], [540, y - 300]]); fillStroke(ctx, '#2f7a3e', 8); }
  star5(ctx, 540, 360, 60, 0, '#ffd23a');
  for (let i = 0; i < 10; i++) { circle(ctx, 300 + (i * 97 % 480), 600 + (i * 131 % 600), 16); fillStroke(ctx, ['#e0392f', '#ffd23a', '#2f63c9'][i % 3], 4); glowAt(ctx, 300 + (i * 97 % 480), 600 + (i * 131 % 600), 50, '255,220,140', .3 + .2 * Math.sin(t * 3 + i)); }
  const o = clamp((lt - open) * 2.5);
  petBox(ctx, 540, 1430, .75, { open: o, inside: true, noLabel: true });
  if (o < 1) { ctx.save(); ctx.globalAlpha = 1 - o; rrect(ctx, 540 - 170, 1430 - 185, 340, 190, 8); ctx.fillStyle = '#c22a2a'; ctx.fill(); line(ctx, 540, 1245, 540, 1430, 22, '#ffd23a'); ctx.restore(); }
  const l = lt > laugh;
  for (const [i, x, s, f] of [[0, 160, 520, 1], [1, 930, 520, -1], [3, 760, 380, -1]]) { const bob = l ? Math.abs(Math.sin(lt * 14 + i)) * .02 : 0; person(ctx, FRIENDS[i], { x, y: 1920, s, flip: f, bob: -bob, face: { eyes: l ? 'happy' : 'normal', look: [f * .7, .3], mouth: l ? 'grin' : 'smile' }, arms: l ? { L: { ik: [-.05, -.45] }, R: { ik: [.05, -.45] } } : POSE.idle.arms }); }
  goldenGrade(ctx);
} });
// 14 Total (Day): a tally board shows 1.5 MILLION as each box drops 95¢ into a jar
SHOTS.push({ start: 40.56, end: 44.80, tr: 'fade', draw(ctx, lt, t) {
  const board = at(42.6, 40.56), cents = at(43.2, 40.56);
  const hh = handheld(t, 2); applyCam(ctx, { x: 540 + hh[0], y: 960 + hh[1], z: 1.0 + lt * .02, r: 0 }, 1);
  ctx.fillStyle = '#d9e8f0'; ctx.fillRect(-900, -900, 2900, 3200);
  rrect(ctx, 140, 220, 800, 240, 20); fillStroke(ctx, '#1d1a22', 9);
  if (lt > board) { const b = backOut(clamp((lt - board) * 4)); ctx.save(); ctx.translate(540, 340); ctx.scale(b, b); text(ctx, '1.5 MILLION', 0, 0, 110, '#ffd23a', INK, 0, 'Poppins', 700); ctx.restore(); }
  rrect(ctx, 400, 780, 280, 380, 40); ctx.fillStyle = 'rgba(200,230,240,.55)'; ctx.fill(); ctx.lineWidth = 9; ctx.strokeStyle = INK; ctx.stroke(); rrect(ctx, 380, 760, 320, 40, 12); fillStroke(ctx, '#b9b2a8', 7);
  const n = Math.floor(lt * 3); for (let i = 0; i < Math.min(n, 12); i++) { circle(ctx, 450 + (i % 4) * 60, 1130 - Math.floor(i / 4) * 40, 26); fillStroke(ctx, GOLDC, 5); }
  for (let i = 0; i < 3; i++) { const ph = (lt * .9 + i / 3) % 1; const bx = lerp(-150, 540, Math.min(1, ph * 1.6)); petBox(ctx, bx, 620, .38, {}); if (ph > .55) { const k = (ph - .55) / .45; ctx.save(); ctx.translate(540, lerp(640, 1060, k)); circle(ctx, 0, 0, 34); fillStroke(ctx, GOLDC, 6); if (lt > cents) text(ctx, '95¢', 0, 2, 26, '#5a3a14', INK, 0, 'Poppins', 700); ctx.restore(); } }
} });
// 15 Fall (Day): a February calendar; unsold boxes pile up; two investors in suits wave legal papers
SHOTS.push({ start: 44.80, end: 48.48, tr: 'fade', draw(ctx, lt, t) {
  const inv = at(46.9, 44.8);
  const hh = handheld(t, 2); applyCam(ctx, { x: 540 + hh[0], y: 1000 + hh[1], z: 1.0 + lt * .025, r: 0 }, 1);
  ctx.fillStyle = '#c9ced4'; ctx.fillRect(-900, -900, 2900, 3200); ctx.fillStyle = '#8a8f96'; ctx.fillRect(-900, 1400, 2900, 1600); line(ctx, -900, 1400, 2000, 1400, 8, INK);
  if (lt < inv) { calendarPage(ctx, 540, 640, .9, 'FEBRUARY', '1976'); for (let i = 0; i < 9; i++) { const k = clamp(lt * 3 - i * .25); if (k > 0) petBox(ctx, 160 + (i % 5) * 190, 1400 - Math.floor(i / 5) * 105 - (1 - k) * 400, .42, {}); } }
  else {
    for (let i = 0; i < 9; i++) petBox(ctx, 160 + (i % 5) * 190, 1400 - Math.floor(i / 5) * 105, .42, {});
    for (const [x, f] of [[300, 1], [790, -1]]) { const wave = Math.sin((lt - inv) * 10) * .1; person(ctx, INVESTOR, { x, y: 1880, s: 560, flip: f, face: { eyes: 'half', mouth: 'frown', browAng: .35 }, arms: { L: [.3, -.1], R: { ik: [.3 + wave, -1.0] } } }); ctx.save(); ctx.translate(x + f * .3 * 560, 1880 - 1.0 * 560 - 70); ctx.rotate(wave * 3); rrect(ctx, -55, -75, 110, 150, 4); fillStroke(ctx, '#f6f2ea', 5); for (let k = 0; k < 4; k++) line(ctx, -35, -45 + k * 25, 35, -45 + k * 25, 4, '#b9b2a8'); ctx.restore(); }
  }
} });
// 16 Millionaire (Golden): Gary leans back on a pile of cash, smiling
SHOTS.push({ start: 48.48, end: 49.92, tr: 'fade', draw(ctx, lt, t) {
  const hh = handheld(t, 2); applyCam(ctx, { x: 540 + hh[0], y: 1000 + hh[1], z: 1.0 + lt * .04, r: 0 }, 1);
  ctx.fillStyle = '#e8c8a0'; ctx.fillRect(-900, -900, 2900, 3200);
  cashPile(ctx, 540, 1500, 1.4);
  ctx.save(); ctx.translate(540, 1220); ctx.rotate(-.5); person(ctx, GARY, { x: 0, y: 0, s: 620, shadow: false, face: { eyes: 'happy', mouth: 'grin' }, arms: { L: [2.6, .3], R: [2.6, .3] }, legs: { L: [1.2, -.6], R: [1.0, -.4] } }); ctx.restore();
  for (let i = 0; i < 5; i++) { const ph = (lt * .8 + i / 5) % 1; ctx.save(); ctx.translate(150 + i * 190, -100 + ph * 1500); ctx.rotate(ph * 6 + i); rrect(ctx, -50, -22, 100, 44, 4); fillStroke(ctx, '#8fd09a', 4); ctx.restore(); }
  goldenGrade(ctx);
} });
// 17 Debate moment (Day): split screen — a lightbulb labelled GENIUS and a horseshoe labelled LUCK, with the rock between them
SHOTS.push({ start: 49.92, end: 53.04, tr: 'fade', draw(ctx, lt, t) {
  const hh = handheld(t, 2); applyCam(ctx, { x: 540 + hh[0], y: 960 + hh[1], z: 1.0 + lt * .02, r: 0 }, 1);
  ctx.fillStyle = '#2f63c9'; ctx.fillRect(-900, -900, 1440, 3200); ctx.fillStyle = '#3fa35b'; ctx.fillRect(540, -900, 1500, 3200); line(ctx, 540, -900, 540, 2200, 10, INK);
  const g = backOut(clamp((lt - at(50.4, 49.92)) * 3)), l = backOut(clamp((lt - at(51.7, 49.92)) * 3));
  ctx.save(); ctx.translate(270, 700); ctx.scale(g, g); bulb(ctx, 0, 0, 1.1, 1); text(ctx, 'GENIUS', 0, 220, 70, '#fff', INK, 10, 'Poppins', 700); ctx.restore();
  ctx.save(); ctx.translate(810, 700); ctx.scale(l, l); horseshoe(ctx, 0, 0, 1.1); text(ctx, 'LUCK', 0, 220, 70, '#fff', INK, 10, 'Poppins', 700); ctx.restore();
  rock(ctx, 540, 1110 + Math.sin(t * 2) * 8, 1.0, 4);
} });
// 18 Callback (Golden): waves over a beach of ordinary rocks; the camera settles on one rock, matching the first frame
SHOTS.push({ start: 53.04, end: END, tr: 'cut', draw(ctx, lt, t) { beachSettle(ctx, t - END, t); } });
