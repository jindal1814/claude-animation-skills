// Scam Files #1: The Country That Never Existed. Shot list in seconds of the voiceover (see SCRIPT.md for the beat table).
const handheld = (t, a = 4) => shake(t * .35, a, 1, 2);
const walkLegs = (t, sp = 9, amp = .55) => ({ L: [Math.sin(t * sp) * amp + .05, -Math.max(0, Math.sin(t * sp + 1)) * .7], R: [-Math.sin(t * sp) * amp + .05, -Math.max(0, -Math.sin(t * sp + 1)) * .7] });
const walkArms = (t, sp = 9, amp = .6) => ({ L: [.3 - Math.sin(t * sp) * amp, -.3], R: [.3 + Math.sin(t * sp) * amp, -.3] });
function flash(ctx, a, col = '#fff') { if (a <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = clamp(a); ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.restore(); }
function tint(ctx, col, a) { if (a <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = clamp(a); ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.restore(); }
const at = (abs, start) => abs - start;
const pointArms = { L: [.3, -.1], R: [1.9, -.2] };

const SHOTS = [];
// 1 Hook (Day): a general unrolls a giant map across a cobbled London street; a crowd leans in
SHOTS.push({ start: 0, end: 3.45, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 3); const cam = { x: 540 + hh[0], y: 960 + hh[1], z: 1.0 + lt * .04, r: 0 };
  applyCam(ctx, cam, 1); londonStreet(ctx, 'day', t);
  const un = easeOut(clamp(lt / 1.6));
  const crowd = [[120, 0], [930, 1], [1010, 2], [70, 3]];
  crowd.forEach(([x, i], k) => person(ctx, SETTLERS[i], { x, y: 1560 + (k % 2) * 40, s: 520, flip: x > 540 ? -1 : 1, lean: 0, face: { eyes: lt > 1.2 ? 'wide' : 'normal', look: [x > 540 ? -.8 : .8, .3], mouth: lt > 1.6 ? 'o' : 'smile' }, arms: { L: [.3, -.1], R: [.3, -.1] } }));
  person(ctx, MAC, { x: 300, y: 1500, s: 560, face: { eyes: 'normal', look: [.8, .2], mouth: 'grin', browAng: -.2 }, arms: { L: [.3, -.1], R: { ik: [.42, -.42] } } });
  ctx.save(); ctx.translate(560, 1330); ctx.transform(1, 0, -.35, .42, 0, 0); bigMap(ctx, 230 * un, 0, 900, 620, un); ctx.restore();
} });
// 2 Setting (Day): a paper crown floats down onto MacGregor as he says "prince"
SHOTS.push({ start: 3.45, end: 10.0, tr: 'cut', draw(ctx, lt, t) {
  const pr = at(8.24, 3.45);
  const hh = handheld(t, 3); const cam = { x: 540 + hh[0], y: 1000 + hh[1], z: kf(lt, [[0, 1.0], [pr, 1.12], [6.5, 1.2]]), r: 0 };
  applyCam(ctx, cam, 1); londonStreet(ctx, 'day', t);
  person(ctx, MAC, { x: 540, y: 1700, s: 820, face: { eyes: lt > pr + .3 ? 'happy' : 'normal', look: [0, -.3], mouth: 'grin', browAng: -.15 }, arms: lt > 4.6 ? { L: [.3, -.1], R: { ik: [.32, -.92] } } : { L: [.9, -2.1], R: [.9, -2.1] } });
  const hx = 540, hy = 1700 - .765 * 820;
  const cy = kf(lt, [[pr - 1.2, -200], [pr + .3, hy - .19 * 820 * 1.9]], easeOut);
  paperCrown(ctx, hx + Math.sin(lt * 3) * 30 * clamp(pr + .3 - lt), cy, 110, Math.sin(lt * 4) * .15 * clamp(pr + .3 - lt));
  if (lt > pr + .3 && lt < pr + 1.0) for (let i = 0; i < 5; i++) sparkle(ctx, hx - 200 + i * 100, hy - 330 - (i % 2) * 50, 30, clamp(1 - (lt - pr - .3) * 1.5));
  flash(ctx, kf(lt, [[0, .9], [.25, 0]]));
} });
// 3 Pitch (Day): the map comes alive — boulevards, opera house, domed cathedral, bank, rivers of gold
SHOTS.push({ start: 10.0, end: 16.16, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 2); const cam = { x: 540 + hh[0], y: 1060 + hh[1], z: 1.0 + lt * .025, r: 0 };
  applyCam(ctx, cam, 1);
  ctx.fillStyle = '#f1dfb2'; ctx.fillRect(-900, -900, 2900, 3200);
  ctx.save(); ctx.globalAlpha = .35; bigMap(ctx, 540, 760, 1000, 900, 1, { city: false }); ctx.restore();
  dreamCity(ctx, t, [ (lt - at(11.6, 10)) * 3, (lt - at(12.4, 10)) * 3, (lt - at(13.0, 10)) * 3, (lt - at(13.9, 10)) * 3, (lt - at(14.5, 10)) * 3, (lt - at(15.5, 10)) * 2.5 ]);
  text(ctx, 'ST JOSEPH', 540, 330, 80, '#7a4a2a', INK, 0, 'Lora', 700);
} });
// 4 Escalation (Day): a huge book thumps onto a desk; the author's portrait is a blank outline
SHOTS.push({ start: 16.16, end: 20.76, tr: 'cut', draw(ctx, lt, t) {
  const land = .35, open = at(18.25, 16.16), gone = at(19.7, 16.16);
  const sh = lt > land && lt < land + .3 ? shake(t, 14, 4) : [0, 0];
  const hh = handheld(t, 2); const cam = { x: 540 + hh[0] + sh[0], y: 960 + hh[1] + sh[1], z: kf(lt, [[0, 1.0], [open, 1.0], [open + .4, 1.15]]), r: 0 };
  applyCam(ctx, cam, 1);
  ctx.fillStyle = '#5a3420'; ctx.fillRect(-900, -900, 2900, 3200); for (let i = 0; i < 12; i++) line(ctx, -900, 200 + i * 160, 2000, 200 + i * 160, 5, '#4a2a18');
  const y = kf(lt, [[0, -600], [land, 900, easeIn]]);
  guideBook(ctx, lt < open ? 540 : 540, y, lt < open ? 1.15 : 1.0, lt < open ? 0 : 1);
  if (lt > land && lt < land + .5) { puff(ctx, 250, 1260, 70, t, '#d9c9a8', 3, 1 - (lt - land) * 2); puff(ctx, 830, 1260, 70, t, '#d9c9a8', 4, 1 - (lt - land) * 2); }
  if (lt >= open) blankPortrait(ctx, 540 + 225, 900 - 40, 1.0, clamp((lt - gone) * 2));
} });
// 5 Escalation (Day): a queue outside a bank; the price board flips from 2s 3d to 4s an acre
SHOTS.push({ start: 20.76, end: 24.32, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 3); const cam = { x: 540 + hh[0], y: 1000 + hh[1], z: 1.0 + lt * .03, r: 0 };
  applyCam(ctx, cam, 1); bankFront(ctx, 'day', t);
  for (let i = 0; i < 6; i++) person(ctx, SETTLERS[i % 5], { x: 140 + i * 115, y: 1450 + (i % 2) * 15, s: 330, flip: -1, face: { eyes: 'normal', look: [-.6, 0], mouth: 'smile' }, legs: walkLegs(t + i, 3, .1) });
  priceBoard(ctx, 830, 1080, .95, clamp((lt - at(23.6, 20.76)) * 3), t);
} });
// 6 Escalation (Day): a respected London bank sells £200,000 of Poyais bonds
SHOTS.push({ start: 24.32, end: 27.56, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 2); const cam = { x: 540 + hh[0], y: 960 + hh[1], z: 1.0 + lt * .03, r: 0 };
  applyCam(ctx, cam, 1);
  ctx.fillStyle = '#e8dcc0'; ctx.fillRect(-900, -900, 2900, 3200); for (let x = -800; x < 1900; x += 220) { rrect(ctx, x, 0, 80, 1300, 0); fillStroke(ctx, '#f6f2ea', 6); }
  rrect(ctx, -100, 1200, 1300, 600, 0); fillStroke(ctx, '#6b3e22', 9);
  for (let i = 0; i < 6; i++) { const k = clamp((lt - .15 * i) * 3); if (k > 0) bond(ctx, 540 + (i % 2 ? 40 : -40), 1120 - i * 34, .95, (i % 2 ? .05 : -.04), clamp((lt - at(26.9, 24.32)) * 3) * (i === 5 ? 1 : 0)); }
  person(ctx, BANKER, { x: 200, y: 1620, s: 560, face: { eyes: 'half', look: [.8, -.2], mouth: 'smirk' }, arms: { L: [.3, -.1], R: { ik: [.4, -.6] } } });
} });
// 7 Escalation (Golden): hundreds sign up; an Edinburgh cobbler holds up a tiny royal shoe
SHOTS.push({ start: 27.56, end: 31.76, tr: 'cut', draw(ctx, lt, t) {
  const shoe = at(30.3, 27.56);
  const hh = handheld(t, 3); const cam = { x: 540 + hh[0], y: 1000 + hh[1], z: kf(lt, [[0, 1.0], [shoe - .3, 1.02], [shoe + .3, 1.2]]), r: 0 };
  applyCam(ctx, cam, 1); londonStreet(ctx, 'golden', t);
  if (lt < shoe - .2) {
    rrect(ctx, 240, 1280, 600, 60, 8); fillStroke(ctx, '#6b3e22', 8); rrect(ctx, 300, 1230, 300, 60, 4); fillStroke(ctx, '#f6ecd2', 5);
    for (let i = 0; i < 7; i++) { const x = 100 + i * 140, dy = (i % 2) * 40; person(ctx, SETTLERS[i % 5], { x, y: 1820 + dy, s: 380 - dy, face: { eyes: 'normal', look: [0, -.4], mouth: 'smile' } }); }
    for (let i = 0; i < 5; i++) { const k = ((lt * 1.5 + i * .2) % 1); line(ctx, 330 + i * 50, 1250, 330 + i * 50 + 20, 1250 - k * 30, 5, '#2a2630'); }
  } else {
    person(ctx, COBBLER, { x: 540, y: 1760, s: 760, face: { eyes: 'happy', mouth: 'grin' }, arms: { L: [.3, -.1], R: { ik: [.18, -1.0] } } });
    tinyShoe(ctx, 540 + .2 * 760, 1760 - 1.02 * 760, 1.3);
    for (let i = 0; i < 4; i++) sparkle(ctx, 600 + Math.cos(i * 1.6 + t) * 150, 900 + Math.sin(i * 1.6 + t) * 90, 30, clamp(lt - shoe));
  }
  goldenGrade(ctx);
} });
// 8 Escalation (Golden): gold coins over the counter for bright Poyais banknotes, fresh from the press
SHOTS.push({ start: 31.76, end: 35.12, tr: 'fade', draw(ctx, lt, t) {
  const pr = at(33.5, 31.76);
  const hh = handheld(t, 2); const cam = { x: 540 + hh[0], y: 960 + hh[1], z: 1.0 + lt * .03, r: 0 };
  applyCam(ctx, cam, 1);
  ctx.fillStyle = '#8a5a36'; ctx.fillRect(-900, -900, 2900, 3200);
  if (lt < pr - .1) {
    rrect(ctx, -100, 1050, 1300, 120, 8); fillStroke(ctx, '#6b3e22', 9);
    person(ctx, SETTLERS[1], { x: 230, y: 1950, s: 560, face: { eyes: 'normal', look: [.8, -.3], mouth: 'smile' }, arms: { L: [.3, -.1], R: { ik: [.45, -.95] } } });
    person(ctx, BANKER, { x: 860, y: 1950, s: 560, flip: -1, face: { eyes: 'half', look: [.8, -.2], mouth: 'smirk' }, arms: { L: [.3, -.1], R: { ik: [.45, -.95] } } });
    for (let i = 0; i < 5; i++) { const k = clamp(lt * 1.6 - i * .2); coin(ctx, lerp(380, 640, k) + i * 8, 1020 - Math.sin(k * Math.PI) * 120 - i * 14, 32); }
    for (let i = 0; i < 4; i++) { const k = clamp(lt * 1.6 - .5 - i * .2); banknote(ctx, lerp(720, 470, k), 960 - i * 30, .7, -.1 + i * .06); }
  } else {
    const l2 = lt - pr, press = Math.max(0, Math.sin(l2 * 7));
    printPress(ctx, 540, 1200, 1.4, press);
    for (let i = 0; i < 8; i++) { const k = ((l2 * .9 + i / 8) % 1); banknote(ctx, 540 + 300 + k * 500, 1180 - Math.sin(k * 3) * 220 - i * 6, .7, k * 2); }
    banknote(ctx, 540, 1270, .9, 0);
  }
  goldenGrade(ctx);
} });
// 9 Departure (Golden): two sailing ships leave harbour; follow the flag
SHOTS.push({ start: 35.12, end: 37.12, tr: 'fade', draw(ctx, lt, t) {
  const hh = handheld(t, 2); const cam = { x: 540 + hh[0] + lt * 60, y: 960 + hh[1], z: 1.0 + lt * .03, r: 0 };
  applyCam(ctx, cam, 1); harbour(ctx, 'golden', t);
  sailShip(ctx, 560 + lt * 90, 1120, .9, t, { ph: 0 }); sailShip(ctx, 900 + lt * 70, 1000, .55, t, { ph: 1 });
  goldenGrade(ctx);
} });
// 10 Mystery (Day): settlers step onto a jungle beach, bags in hand. "Wait. Where's the capital?"
SHOTS.push({ start: 37.12, end: 40.04, tr: 'cut', draw(ctx, lt, t) {
  const wait = at(39.2, 37.12);
  const hh = handheld(t, 3); const cam = { x: 540 + hh[0], y: 1000 + hh[1], z: kf(lt, [[0, 1.0], [wait, 1.05], [wait + .3, 1.18]]), r: 0 };
  applyCam(ctx, cam, 1); jungle(ctx, 'day', t);
  for (let i = 0; i < 4; i++) {
    const x = 180 + i * 230, walkIn = clamp(lt * 1.2 - i * .15);
    const bag = (c, k, h) => { if (k === 'L') { rrect(c, h[0] - .07, h[1], .14, .1, .02); c.fillStyle = '#7a4a2a'; c.fill(); c.lineWidth = .01; c.strokeStyle = INK; c.stroke(); } };
    person(ctx, SETTLERS[i], { x: x - (1 - walkIn) * 120, y: 1850, s: 460, prop: bag, legs: walkIn < 1 ? walkLegs(lt + i, 8, .4) : undefined,
      face: { eyes: lt > wait ? 'wide' : 'normal', look: [Math.sin(lt * 2 + i) * .9, -.2], mouth: lt > wait ? 'o' : 'flat', browUp: lt > wait ? 1 : 0 } });
  }
  if (lt > wait) { const k = backOut(clamp((lt - wait) * 3)); ctx.save(); ctx.translate(560, 700); ctx.scale(k, k); text(ctx, '?', 0, 0, 260, '#fff', INK, 18, 'Poppins', 700); ctx.restore(); }
} });
// 11 Reveal (Day): a search party pulls back leaves — a few stones and rubble
SHOTS.push({ start: 40.04, end: 42.88, tr: 'fade', draw(ctx, lt, t) {
  const pull = at(41.3, 40.04);
  const hh = handheld(t, 3); const cam = { x: 540 + hh[0], y: 1050 + hh[1], z: 1.08 + lt * .03, r: 0 };
  applyCam(ctx, cam, 1); jungle(ctx, 'day', t, { seed: 5 });
  rubble(ctx, 540, 1300, 1.6);
  const open = easeOut(clamp((lt - pull) * 2.5));
  for (const sd of [-1, 1]) { ctx.save(); ctx.translate(540 + sd * (60 + open * 480), 1250); for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.ellipse(0, -80 + k * 70, 230, 70, sd * (.3 + k * .1), 0, TAU); fillStroke(ctx, ['#2f8a3e', '#3fa35b'][k % 2], 8); } ctx.restore(); }
  person(ctx, SETTLERS[4], { x: 140, y: 1870, s: 480, face: { eyes: lt > pull + .3 ? 'wide' : 'normal', look: [.8, .3], mouth: lt > pull + .3 ? 'o' : 'flat' }, arms: { L: [.3, -.1], R: { ik: [.42, -.6] } } });
  person(ctx, SETTLERS[2], { x: 940, y: 1870, s: 480, flip: -1, face: { eyes: lt > pull + .3 ? 'wide' : 'normal', look: [.8, .3], mouth: lt > pull + .3 ? 'frown' : 'flat' }, arms: { L: [.3, -.1], R: { ik: [.42, -.6] } } });
} });
// 12 You see (Golden): a slick fake site next to a sloppy one; then the book, bonds and banknotes; nobody checked the country
SHOTS.push({ start: 42.88, end: 50.0, tr: 'fade', draw(ctx, lt, t) {
  const stack = at(46.9, 42.88), nobody = at(49.0, 42.88);
  const hh = handheld(t, 2); const cam = { x: 540 + hh[0], y: 960 + hh[1], z: 1.0 + lt * .02, r: 0 };
  applyCam(ctx, cam, 1);
  ctx.fillStyle = '#f3dcb8'; ctx.fillRect(-900, -900, 2900, 3200);
  if (lt < stack) {
    const slick = at(44.3, 42.88);
    const a = clamp((lt - slick) * 3);
    browser(ctx, 300, 820, 420, 620, true); browser(ctx, 790, 860, 360, 520, false);
    for (let i = 0; i < 6; i++) { const k = clamp(a - i * .12); drawStick(ctx, { x: 120 + i * 75, y: 1660, s: 220, cols: SETTLERS[i % 5].cols, hat: 'none', belt: false, face: { eyes: 'happy', mouth: 'grin' }, alpha: k }); }
    drawStick(ctx, { x: 800, y: 1660, s: 220, cols: PAL.green, hat: 'none', belt: false, face: { eyes: 'half', mouth: 'flat', look: [.6, -.6] } });
  } else {
    const l2 = lt - stack;
    guideBook(ctx, 540, 1020 - 0, .55, 0);
    if (l2 > .55) bond(ctx, 540, 820, .8, -.06);
    if (l2 > 1.2) for (let i = 0; i < 3; i++) banknote(ctx, 540 + (i - 1) * 30, 690 - i * 18, .75, (i - 1) * .1);
    globe(ctx, 860, 1350, 120, t);
    if (lt > nobody) { const k = backOut(clamp((lt - nobody) * 3)); ctx.save(); ctx.translate(860, 1350); ctx.scale(k, k); for (let i = 0; i < 6; i++) { ctx.save(); ctx.globalAlpha = .6; ellipse(ctx, -60 + i * 25, -40 + (i % 2) * 40, 26, 10); ctx.fillStyle = '#a89d8c'; ctx.fill(); ctx.restore(); } ctx.restore(); line(ctx, 700, 1240, 1000, 1460, 16, '#c22a2a'); }
  }
  goldenGrade(ctx, .8);
} });
// 13 Snap (Golden, dark): fever in the tents; graves fill the beach — at least 180 die; fewer than 50 get home
SHOTS.push({ start: 50.0, end: 54.24, tr: 'fade', draw(ctx, lt, t) {
  const die = at(51.2, 50.0), boat = at(52.8, 50.0);
  const hh = handheld(t, 3); const cam = { x: 540 + hh[0], y: 1000 + hh[1], z: 1.0 + lt * .03, r: 0 };
  applyCam(ctx, cam, 1);
  if (lt < die) {
    jungle(ctx, 'golden', t, { seed: 9 }); tint(ctx, '#1a1830', .35);
    sickInTent(ctx, 300, 1300, 1.0, t, 1); sickInTent(ctx, 800, 1360, .85, t + 1, 1);
    rain(ctx, t, 1);
  } else if (lt < boat) {
    jungle(ctx, 'golden', t, { seed: 9 }); tint(ctx, '#1a1830', .45);
    const n = 30; for (let i = 0; i < n; i++) { const r = Math.floor(i / 6), c = i % 6; grave(ctx, 120 + c * 168 + (r % 2) * 50, 1240 + r * 95, .8 + r * .12, (lt - die) * 3 - i * .05); }
    const cnt = Math.round(kf(lt, [[die, 0], [die + 1.0, 180]], easeOut));
    bigFigure(ctx, 'AT LEAST', String(cnt), 540, 640, clamp((lt - die) * 4));
    rain(ctx, t, .8);
  } else {
    harbour(ctx, 'golden', t); tint(ctx, '#2a2040', .35);
    sailShip(ctx, 420 + (lt - boat) * 40, 1130, .5, t, { ph: 2 });
    drawStick(ctx, { x: 400 + (lt - boat) * 40, y: 1090, s: 110, cols: PAL.blue, hat: 'none', belt: false, shadow: false, face: { eyes: 'half', mouth: 'frown' } });
    bigFigure(ctx, 'FEWER THAN', '50', 540, 560, clamp((lt - boat) * 4));
    rain(ctx, t, .6);
  }
  goldenGrade(ctx, .6);
} });
// 14 Luckily / Unluckily (Day): a French courtroom; the gavel bangs; MacGregor strolls out tipping his hat
SHOTS.push({ start: 54.24, end: 57.84, tr: 'fade', draw(ctx, lt, t) {
  const catchT = at(54.64, 54.24), bang = at(56.85, 54.24);
  const sh = lt > bang && lt < bang + .25 ? shake(t, 12, 4) : [0, 0];
  const hh = handheld(t, 2); const cam = { x: 540 + hh[0] + sh[0], y: 1000 + hh[1] + sh[1], z: 1.0 + lt * .03, r: 0 };
  applyCam(ctx, cam, 1); courtroom(ctx, t);
  person(ctx, JUDGE, { x: 540, y: 1010, s: 420, face: { eyes: 'half', mouth: 'flat' }, arms: { L: [.3, -.1], R: { ik: [.3, -.55] } } });
  gavel(ctx, 640, 760, 1, lt > bang - .2 && lt < bang ? -.9 : (lt > bang ? 0 : -.3));
  const free = lt > bang + .15;
  const mx = free ? 380 + (lt - bang - .15) * 260 : 380;
  person(ctx, MAC, { x: mx, y: 1910, s: 520, face: { eyes: free ? 'happy' : 'normal', look: [.6, -.3], mouth: free ? 'grin' : 'flat' }, legs: free ? walkLegs(lt, 7, .4) : undefined, arms: free ? { L: [.3, -.1], R: { ik: [.08, -1.05] } } : { L: [.3, -.1], R: [.3, -.1] } });
  if (!free) person(ctx, GENDARME, { x: 170, y: 1910, s: 520, face: { eyes: 'normal', look: [.8, 0], mouth: 'smirk' }, arms: { L: [.3, -.1], R: { ik: [.42, -.6] } } });
} });
// 15 Callback (Golden): a military salute at a cathedral; the old map blows away like loose paper
SHOTS.push({ start: 57.84, end: 63.95, tr: 'cut', draw(ctx, lt, t) {
  const blow = at(61.8, 57.84);
  const hh = handheld(t, 2); const cam = { x: 540 + hh[0], y: kf(lt, [[0, 1000], [blow, 1000], [6, 820]]) + hh[1], z: kf(lt, [[0, 1.0], [6, 1.1]]), r: 0 };
  applyCam(ctx, cam, 1); cathedral(ctx, 'golden', t);
  coffin(ctx, 540, 1420, 1.0);
  { const k = backOut(clamp((lt - at(57.9, 57.84)) * 3)); ctx.save(); ctx.translate(540, 470); ctx.scale(k, k); rrect(ctx, -170, -70, 340, 140, 16); fillStroke(ctx, '#2a3a2e', 8); text(ctx, '1845', 0, 4, 96, '#f3d27a', INK, 0, 'Lora', 700); ctx.restore(); }
  for (const [x, f] of [[160, 1], [920, -1]]) person(ctx, SOLDIER, { x, y: 1860, s: 460, flip: f, face: { eyes: 'normal', look: [.6, 0], mouth: 'flat' }, arms: { L: [.3, -.1], R: { ik: [.1, -.82] } } });
  const k = clamp((lt - blow) / 2);
  ctx.save(); ctx.translate(540 + k * 700, 1180 - k * 900); ctx.rotate(k * 5); ctx.scale(1 - k * .4, 1 - k * .4); bigMap(ctx, 0, 0, 420, 300, 1); ctx.restore();
  goldenGrade(ctx);
} });
