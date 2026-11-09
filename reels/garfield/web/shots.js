// "The bullet didn't kill President Garfield. His doctors did." — shot list, in seconds of the voiceover
const walkLegs = (t, sp = 9, amp = .55) => ({ L: [Math.sin(t * sp) * amp + .05, -Math.max(0, Math.sin(t * sp + 1)) * .7], R: [-Math.sin(t * sp) * amp + .05, -Math.max(0, -Math.sin(t * sp + 1)) * .7] });
const walkArms = (t, sp = 9, amp = .6) => ({ L: [.3 - Math.sin(t * sp) * amp, -.3], R: [.3 + Math.sin(t * sp) * amp, -.3] });
const handheld = (t, a = 4) => shake(t * .35, a, 1, 2);
const blinkAt = (lt, ...ts) => ts.some(b => lt > b && lt < b + .13) ? 1 : 0;
function flash(ctx, a, col = '#fff') { if (a <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = clamp(a); ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.restore(); }
function tint(ctx, col, a) { if (a <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = clamp(a); ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.restore(); }
// Garfield sitting up in bed (bed front at y, person scale s)
function garfieldInBed(ctx, x, y, s, face, extra = {}) {
  drawBed(ctx, x, y, s / 720, Object.assign({ person: () => person(ctx, GAR, Object.assign({ x, y: y - 40 * s / 720, s, shadow: false, face, arms: { L: [.5, -.4], R: [.5, -.4] } }, extra.p || {})) }, extra.bed || {}));
}

const SHOTS = [];
// A — hook: a bullet with an innocent face next to Garfield in bed
SHOTS.push({ start: 0, end: 2.4, tr: 'whip', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 560 + hh[0], y: 860 + hh[1], z: 1.25 + lt * .05, r: -.01 };
  applyCam(ctx, cam, 1); drawRoom(ctx, .1);
  garfieldInBed(ctx, 420, 1330, 720, { eyes: lt > .8 ? 'wide' : 'normal', look: [.8, -.2], mouth: lt > .8 ? 'o' : 'flat', browUp: lt > .8 ? 1 : 0, blink: blinkAt(lt, .35) });
  // the bullet floats beside him and shakes its head on "didn't kill"
  const bob = Math.sin(t * 3) * 14, no = lt > .5 && lt < 1.3 ? Math.sin(lt * 26) * 18 : 0;
  const pop = backOut(clamp(lt / .3));
  drawBullet(ctx, 730 + no, 600 + bob, 1.75 * pop, -.15, { eyes: lt > .5 && lt < 1.4 ? 'closed' : 'normal', look: [-1, 0], mouth: lt > .5 && lt < 1.4 ? 'frown' : 'smile' });
  if (lt > .55 && lt < 1.35) { for (const sd of [-1, 1]) line(ctx, 730 + sd * 140, 560, 730 + sd * 175, 560, 8); }
  if (lt > 1.6) sweat(ctx, 300, 600, 30, clamp((lt - 1.6) * 4));
} });
// B — "His doctors did": three grinning doctors, germ fingers up
SHOTS.push({ start: 2.4, end: 3.68, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 4); const punch = kf(lt, [[.75, 0], [.85, 1], [1.2, .6]]);
  const cam = { x: 540 + hh[0], y: 900 + hh[1], z: 1.0 + lt * .06 + punch * .06, r: .02 };
  applyCam(ctx, cam, 1); drawRoom(ctx, .45);
  const xs = [230, 540, 850];
  xs.forEach((x, i) => {
    const up = backOut(clamp((lt - i * .1) / .3));
    person(ctx, DOCS[i], { x, y: 1640 + (1 - up) * 300, s: 680, shadow: false,
      arms: { L: [.4, -.2], R: { ik: [.22, -.95 - Math.sin(t * 9 + i) * .03] } },
      face: { eyes: i === 1 ? 'smug' : 'normal', look: [0, -.2], mouth: 'grin', browAng: -.25 } });
    // fingertip germs
    const fx = x + .22 * 680, fy = 1640 - .95 * 680;
    for (let k = 0; k < 3; k++) { const a = t * 3 + k * 2.1 + i; drawGerm(ctx, fx + 20 + Math.cos(a) * 55, fy - 40 + Math.sin(a) * 40, 16, t, k + i * 3); }
  });
  tint(ctx, '#3a0a14', .15 + punch * .1);
} });
// C — 1881, the train station: a gunman fires, Garfield falls, but he's alive
SHOTS.push({ start: 3.68, end: 8.48, tr: 'whip', draw(ctx, lt, t) {
  const shot = 5.76 - 3.68; // lt of the bang
  const hh = handheld(t, 3); const sh = lt > shot && lt < shot + .4 ? shake(t, 26 * (1 - (lt - shot) / .4), 4) : [0, 0];
  const cam = { x: 540 + hh[0] + sh[0], y: 900 + hh[1] + sh[1], z: kf(lt, [[0, 1.0], [shot, 1.08], [shot + .1, 1.16], [4.8, 1.24]]), r: 0 };
  applyCam(ctx, cam, 1); drawStation(ctx, t);
  // Garfield walks in from the right, then falls
  const walking = lt < shot;
  const gx = walking ? lerp(820, 640, lt / shot) : 640;
  const fall = kf(lt, [[shot + .05, 0], [shot + .55, 1, easeIn]]);
  ctx.save(); ctx.translate(gx, 1420); ctx.rotate(fall * .32); ctx.translate(-gx, -1420);
  person(ctx, GAR_SUIT, { x: gx, y: 1420, s: 560, squash: 1 - fall * .22, shadow: true, legs: walking ? walkLegs(lt, 8, .45) : { L: [.2, -.1], R: [.1, -.1] }, arms: walking ? walkArms(lt, 8, .4) : POSE.handsUp.arms,
    face: walking ? { eyes: 'normal', look: [-.4, 0], mouth: 'smile' } : { eyes: lt < 6.9 - 3.68 ? 'x' : 'normal', mouth: 'o' } });
  ctx.restore();
  // gunman in shadow on the left
  const aim = kf(lt, [[1.1, 0], [1.6, 1]]);
  drawStick(ctx, { x: 190, y: 1440, s: 560, sil: '#241d28', shadow: false, hat: 'none',
    arms: { L: [.3, -.1], R: aim > 0 ? { ik: [lerp(.2, .42, aim), lerp(-.35, -.62, aim)] } : [.3, -.1] },
    prop: (c, k, h) => { if (k === 'R' && aim > .5) { rrect(c, h[0] - .01, h[1] - .03, .11, .035, .01); c.fillStyle = '#241d28'; c.fill(); } } });
  if (lt > shot && lt < shot + .25) burst(ctx, 190 + .53 * 560, 1440 - .62 * 560, 90 * (1 + (lt - shot) * 3), 11, '#ffd23a', 5);
  flash(ctx, kf(lt, [[shot, .0], [shot + .03, .85], [shot + .2, 0]]));
  // "and somehow, he survives": a beating heart over him
  const hb = clamp((lt - (7.04 - 3.68)) * 4);
  if (hb > 0) { const pulse = 1 + .15 * Math.max(0, Math.sin(lt * 9)); heart(ctx, 900, 760, 70 * hb * pulse); }
} });
// D — doctor after doctor digs for the bullet; then the unwashed finger
SHOTS.push({ start: 8.48, end: 13.12, tr: 'whip', draw(ctx, lt, t) {
  const insert = 11.62 - 8.48;
  const hh = handheld(t, 3);
  if (lt < insert) {
    const cam = { x: 600 + hh[0], y: 960 + hh[1], z: 1.08 + lt * .03, r: 0 };
    applyCam(ctx, cam, 1); drawRoom(ctx, .2);
    const k = Math.min(2, Math.floor(lt / 1.05)), u = (lt - k * 1.05) / 1.05;
    const poking = u > .25 && u < .8;
    // queue of waiting doctors on the right
    for (let q = 2; q > k; q--) person(ctx, DOCS[q], { x: 1010 + (q - k - 1) * 150, y: 1540, s: 470, face: { eyes: 'normal', look: [-.8, 0], mouth: 'smirk' }, arms: POSE.idle.arms });
    garfieldInBed(ctx, 400, 1360, 560, poking ? { eyes: 'squint', mouth: 'teeth', browAng: .3 } : { eyes: 'wide', look: [.8, 0], mouth: 'o' });
    if (poking) { sweat(ctx, 260, 760, 26, 1); burst(ctx, 590, 1110, 40 + Math.sin(t * 40) * 6, 9, '#fff', 3); }
    const dx = u < .25 ? lerp(1000, 760, easeOut(u / .25)) : u > .8 ? lerp(760, 1000, easeIn((u - .8) / .2)) : 760;
    const wig = poking ? Math.sin(t * 30) * .02 : 0;
    person(ctx, DOCS[k], { x: dx, y: 1540, s: 560, flip: -1, face: { eyes: 'normal', look: [.6, .3], mouth: 'smile', browAng: -.15 },
      arms: { L: [.3, -.1], R: u > .2 ? { ik: [lerp(.2, .3, clamp((u - .2) * 6)) + wig, -.78 + wig] } : [.3, -.1] } });
    drawGerm(ctx, dx - 180, 1100 + Math.sin(t * 4) * 10, 15, t, k + 4);
  } else {
    const l2 = lt - insert;
    const cam = { x: 540 + hh[0], y: 960 + hh[1], z: 1 + l2 * .05, r: .02 };
    applyCam(ctx, cam, 1); drawRoom(ctx, .55);
    const rise = easeOut(clamp(l2 / .35));
    drawFinger(ctx, 520, lerp(1700, 560, rise), 1.55, -.08, 1);
    stinkLines(ctx, 470, 520, t, clamp((l2 - .25) * 4));
    for (let i = 0; i < 6; i++) { const a = i * 1.1 + t * 2; drawGerm(ctx, 470 + Math.cos(a) * (170 + i * 12), lerp(1700, 700, rise) + Math.sin(a) * 140, 22, t, i, 1); }
  }
} });
// E — Alexander Graham Bell rushes in with his metal detector
SHOTS.push({ start: 13.12, end: 18.0, tr: 'whip', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 560 + hh[0], y: 940 + hh[1], z: 1.05 + lt * .025, r: 0 };
  applyCam(ctx, cam, 1); drawRoom(ctx, .1);
  garfieldInBed(ctx, 280, 1320, 480, { eyes: 'normal', look: [.8, 0], mouth: lt > 3.9 ? 'smile' : 'flat', blink: blinkAt(lt, 1.6) });
  const tPh = 14.8 - 13.12, tRush = 16.08 - 13.12, tDet = 17.0 - 13.12;
  const bx = lt < 1.0 ? lerp(1250, 800, easeOut(lt)) : lt < tRush ? 800 : lerp(800, 690, easeOut(clamp((lt - tRush) / .4)));
  const running = lt < 1.0 || (lt > tRush && lt < tRush + .4);
  const raise = kf(lt, [[tDet - .1, 0], [tDet + .3, 1, backOut]]);
  const s = 600, hand = [bx - .32 * s, 1560 - .5 * s - raise * .2 * s];
  const tip = [hand[0] - 170 - raise * 40, hand[1] - 40 - raise * 120];
  if (raise > 0) drawDetector(ctx, hand, tip, 70, raise * (.6 + .4 * Math.sin(t * 8)));
  person(ctx, BELL, { x: bx, y: 1560, s, flip: -1, legs: running ? walkLegs(lt, 14, .6) : { L: [.12, -.05], R: [.12, -.05] },
    arms: raise > 0 ? { L: [.3, -.1], R: { ik: [.32, -.5 - raise * .2] } } : running ? walkArms(lt, 14, .5) : { L: [.3, -.1], R: [.9, -2.1] },
    face: { eyes: raise > .5 ? 'wide' : 'normal', look: [.6, -.2], mouth: raise > .5 ? 'grin' : 'smile', browUp: raise } });
  if (running) for (let i = 0; i < 4; i++) line(ctx, bx + 160 + i * 20, 1100 + i * 90, bx + 320 + i * 20, 1100 + i * 90, 8, 'rgba(34,28,34,.5)');
  // thought bubble: the telephone
  const bub = kf(lt, [[tPh - .1, 0], [tPh + .2, 1, backOut], [tRush - .1, 1], [tRush + .1, 0]]);
  if (bub > 0) { ctx.save(); ctx.translate(560, 560); ctx.scale(bub, bub); thoughtBubble(ctx, 0, 0, 210, 1); drawPhone(ctx, 0, -10, .9); ctx.restore(); circle(ctx, bx - 120, 840, 22 * bub); fillStroke(ctx, '#fff', 7); circle(ctx, bx - 70, 920, 14 * bub); fillStroke(ctx, '#fff', 6); }
  if (raise > .6) sparkle(ctx, tip[0], tip[1] - 70, 60 * raise, clamp(1.6 - (lt - tDet) * 1.2));
} });
// F — the head doctor: "only the right side"
SHOTS.push({ start: 18.0, end: 21.04, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 560 + hh[0], y: 900 + hh[1], z: 1.0 + lt * .035, r: 0 };
  applyCam(ctx, cam, 1);
  ctx.fillStyle = '#e8dcc0'; ctx.fillRect(-900, -900, 2900, 3000);
  rrect(ctx, 300, 230, 680, 1000, 18); fillStroke(ctx, '#f8f1de', 10); // chart board
  const tX = 19.04 - 18.0, tR = 20.3 - 18.0;
  drawBodyBack(ctx, 640, 800, .95, { left: clamp((lt - tX) * 3), right: clamp((lt - tR) * 3) });
  bigX(ctx, 520, 760, 110, (lt - tX) * 3.5);
  bigCheck(ctx, 760, 760, 100, (lt - tR) * 3.5);
  const wag = Math.sin(t * 12) * .25 * clamp((lt - .3) * 3);
  person(ctx, BLISS, { x: 170, y: 1600, s: 620, face: { eyes: 'half', look: [.4, 0], mouth: 'frown', browAng: .35 },
    arms: { L: [.3, -.1], R: { ik: [.3 + wag * .2, -.95] } } });
} });
// G — Bell scans; the bed's metal springs make everything buzz
SHOTS.push({ start: 21.04, end: 24.64, tr: 'whip', draw(ctx, lt, t) {
  const tSp = 21.6 - 21.04, tBz = 23.55 - 21.04;
  const bz = clamp((lt - tBz) * 5) * (lt > tBz ? 1 : 0);
  const hh = handheld(t, 3), sh = bz > 0 ? shake(t, 10, 3) : [0, 0];
  const cam = { x: 540 + hh[0] + sh[0], y: 1000 + hh[1] + sh[1], z: kf(lt, [[0, 1.0], [tSp, 1.05], [tSp + .5, 1.18]]), r: 0 };
  applyCam(ctx, cam, 1); drawRoom(ctx, .15);
  const see = kf(lt, [[tSp, 0], [tSp + .4, 1]]);
  garfieldInBed(ctx, 430, 1200, 540, { eyes: bz > 0 ? 'wide' : 'normal', look: [.6, -.4], mouth: bz > 0 ? 'o' : 'flat' }, { bed: { see, buzz: bz, t } });
  const sx = Math.sin(lt * 2.4) * 80;
  const hand = [800, 990], tip = [500 + sx, 900];
  drawDetector(ctx, hand, tip, 70, bz);
  person(ctx, BELL, { x: 900, y: 1480, s: 560, flip: -1, arms: { L: [.3, -.1], R: { ik: [.18, -.88] } },
    face: bz > 0 ? { eyes: 'spiral', mouth: 'teeth' } : { eyes: 'normal', look: [.8, .3], mouth: 'flat', browAng: .2 }, t });
  buzzLines(ctx, tip[0], tip[1], 90, t * 2, bz);
  if (bz > 0) for (let i = 0; i < 5; i++) buzzLines(ctx, 430 - 330 + i * 165 * .75, 1200 + 75, 30, t * 3 + i, bz * .8);
} });
// H — inside his body: the bullet, harmless, gets sealed off
SHOTS.push({ start: 24.64, end: 29.2, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 2);
  const cam = { x: 540 + hh[0], y: 880 + hh[1], z: 1.0 + lt * .04, r: 0 };
  applyCam(ctx, cam, 1); insideBody(ctx, t);
  const tH = 26.16 - 24.64, tS = 28.2 - 24.64;
  const seal = kf(lt, [[tS, 0], [tS + .6, 1, backOut]]);
  if (seal > 0) { ctx.save(); ellipse(ctx, 540, 820, 260 * seal, 190 * seal); ctx.fillStyle = 'rgba(255,240,215,.55)'; ctx.fill(); ctx.lineWidth = 12; ctx.strokeStyle = 'rgba(250,225,190,.95)'; ctx.stroke(); ctx.restore(); }
  const calm = lt > tH;
  drawBullet(ctx, 520, 820 + Math.sin(t * 1.5) * 8, 1.9, -.1, { eyes: calm ? 'closed' : 'normal', look: [0, 0], mouth: calm ? 'smile' : 'flat' });
  if (calm) for (let i = 0; i < 3; i++) { const k = ((lt - tH) * .7 + i / 3) % 1; text(ctx, 'z', 700 + k * 120, 650 - k * 220, 50 + k * 50, '#fff', INK, 8, 'Poppins', 700); }
  if (seal > .8) sparkle(ctx, 760, 650, 50, clamp(1.5 - (lt - tS)));
} });
// I — the real killer: germs from the fingers
SHOTS.push({ start: 29.2, end: 34.4, tr: 'whip', draw(ctx, lt, t) {
  const tF = 30.7 - 29.2, tG = 31.9 - 29.2;
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0], y: 900 + hh[1], z: 1.0 + lt * .03, r: 0 };
  applyCam(ctx, cam, 1); insideBody(ctx, t, clamp((lt - tG) * .12));
  ellipse(ctx, 260, 1080, 120, 90); ctx.fillStyle = 'rgba(255,240,215,.55)'; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = 'rgba(250,225,190,.95)'; ctx.stroke();
  drawBullet(ctx, 250, 1080, .9, -.1, { eyes: lt > tG ? 'wide' : 'closed', look: [1, -.6], mouth: lt > tG ? 'o' : 'smile' });
  const dip = kf(lt, [[tF - .3, 0], [tF, 1, easeOut], [tG + .4, 1], [tG + 1.0, 0, easeIn]]);
  drawFinger(ctx, 640, lerp(-900, 560, dip), 1.4, Math.PI + .08, 1);
  const n = Math.floor(clamp((lt - tG) / 2.2) * 34);
  const R = rng(44);
  for (let i = 0; i < n; i++) { const a = R() * TAU, d = 120 + R() * 420, born = tG + i * 2.2 / 34, age = lt - born; const k = easeOut(clamp(age * 2)); drawGerm(ctx, 640 + Math.cos(a + t * .3) * d * k, 640 + Math.sin(a + t * .3) * d * k * 1.2, 26 + R() * 18, t, i, 1); }
  tint(ctx, '#2c6b1a', clamp((lt - tG) * .12));
} });
// J — 79 days: the calendar runs out; a portrait in mourning
SHOTS.push({ start: 34.4, end: 37.76, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 2);
  const cam = { x: 540 + hh[0], y: 900 + hh[1], z: 1.0 + lt * .03, r: 0 };
  const tK = 36.6 - 34.4;
  const dim = kf(lt, [[0, .35], [tK, .55], [tK + .4, .82]]);
  applyCam(ctx, cam, 1); drawRoom(ctx, dim);
  const n = Math.round(kf(lt, [[0, 0], [tK - .3, 79]], x => 1 - Math.pow(1 - x, 1.6)));
  const d = new Date(1881, 6, 2 + n); const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];
  const calA = 1 - clamp((lt - tK) * 3);
  if (calA > 0) { ctx.save(); ctx.globalAlpha = calA; drawCalendar(ctx, 540, 760 - (1 - calA) * 80, 1.05, months[d.getMonth()], d.getDate()); ctx.restore(); }
  const pa = clamp((lt - tK) * 2.5);
  if (pa > 0) { ctx.save(); ctx.globalAlpha = pa; drawPortrait(ctx, 540, 760, 1.05, t); candle(ctx, 250, 1220, 1, t); candle(ctx, 830, 1220, 1, t); ctx.restore(); }
} });
// K — the twist: the bullet was on the left, where nobody was allowed to look
SHOTS.push({ start: 37.76, end: 42.9, tr: 'cut', draw(ctx, lt, t) {
  const tL = 39.28 - 37.76, tN = 40.8 - 37.76;
  const hh = handheld(t, 2);
  const cam = { x: kf(lt, [[0, 540], [tL, 540], [tL + .8, 470]]) + hh[0], y: 860 + hh[1], z: kf(lt, [[0, 1.0], [tL, 1.05], [tL + .8, 1.35], [5, 1.45]]), r: 0 };
  applyCam(ctx, cam, 1);
  ctx.fillStyle = '#0d1b2c'; ctx.fillRect(-900, -900, 2900, 3000);
  ctx.strokeStyle = 'rgba(120,180,230,.12)'; ctx.lineWidth = 3; for (let x = -900; x < 2000; x += 80) line(ctx, x, -900, x, 2100, 3, 'rgba(120,180,230,.12)'); for (let y = -900; y < 2100; y += 80) line(ctx, -900, y, 2000, y, 3, 'rgba(120,180,230,.12)');
  drawBodyBack(ctx, 540, 780, .95, { xray: true, left: .55 });
  // all the probing marks on the right side
  const R = rng(5); for (let i = 0; i < 14; i++) { const x = 600 + R() * 170, y = 600 + R() * 380; ctx.save(); ctx.globalAlpha = .8; line(ctx, x - 14, y - 14, x + 14, y + 14, 6, '#ffd23a'); line(ctx, x + 14, y - 14, x - 14, y + 14, 6, '#ffd23a'); ctx.restore(); }
  // the bullet on the left side, glowing
  const ping = clamp((lt - tL) * 2);
  const bx = 420, by = 860;
  if (ping > 0) { for (let k = 0; k < 3; k++) { const ph = ((lt - tL) * .8 + k / 3) % 1; circle(ctx, bx, by, 40 + ph * 220); ctx.lineWidth = 6; ctx.strokeStyle = `rgba(255,214,90,${(1 - ph) * .8 * ping})`; ctx.stroke(); } }
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; circle(ctx, bx, by, 110); ctx.fillStyle = `rgba(255,214,90,${.25 + .35 * ping})`; ctx.fill(); ctx.restore();
  drawBullet(ctx, bx, by, .8, -.3, { eyes: lt > tN ? 'closed' : 'normal', look: [1, 0], mouth: lt > tN ? 'frown' : 'flat' });
  flash(ctx, kf(lt, [[tL - .02, 0], [tL + .03, .35], [tL + .25, 0]]), '#ffe9a8');
  tint(ctx, '#000', kf(lt, [[4.3, 0], [4.8, .6]]));
} });
