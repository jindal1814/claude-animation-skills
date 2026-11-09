// Epic Money #1: The Dice Game. Shot list in seconds of the voiceover (see SCRIPT.md). The video loops: the last
// frames play the throw that the first frame is already in the middle of.
const LOOP_END = 41.515 + 0.1;        // last word ends 41.515; END_PAD 0.1 (index.html)
const at = (abs, start) => abs - start;
function flash(ctx, a, col = '#fff') { if (a <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = clamp(a); ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.restore(); }
const calm = (o = {}) => Object.assign({ eyes: 'normal', mouth: 'flat' }, o);
const seated = { L: [1.4, -1.4], R: [1.4, -1.4] };

// The throw. tau < 0: the king's hand reaches in and releases the dice; tau = 0: dice mid-tumble (the first frame);
// tau > 1: dice at rest, the king watching. Everything here depends only on tau, so the loop joins exactly.
function hookScene(ctx, tau) {
  const hh = shake((tau + 50) * .35, 3, 1, 2);
  const cam = { x: 540 + hh[0], y: 930 + hh[1], z: 1.18 + (tau + 1.3) * .012, r: 0 };
  applyCam(ctx, cam, 1); hall(ctx, tau + 100);
  person(ctx, YUDH, { x: 540, y: 1150, s: 560, shadow: false, legs: seated, arms: { L: [.5, -.6], R: [.5, -.6] }, face: calm({ look: [-.3, .7], blink: (tau > 2.2 && tau < 2.33) ? 1 : 0 }) });
  diceBoard(ctx, 540, 1210, 860, 300);
  const rel = -.25;
  // the hand: reaches in from the lower left, opens, pulls back
  const reach = tau < rel ? easeOut(clamp((tau + 1.3) / (1.3 + rel))) : 1 - easeIn(clamp((tau - rel) / .7));
  if (reach > 0) kingHand(ctx, lerp(-250, 360, reach), 1250, 1.0, tau < rel ? 0 : clamp((tau - rel) * 5), -.15);
  const dice = [[560, 1180, 5, 0], [660, 1215, 3, .7]];
  dice.forEach(([ex, ey, face, ph], i) => {
    let x, y, r;
    if (tau < rel) { x = lerp(-250, 360, reach) + 90 + i * 30; y = 1235 - i * 10; r = .2 * i; }
    else { const u = clamp((tau - rel) / 1.25); x = lerp(450 + i * 30, ex, easeOut(u)); y = lerp(1225, ey, u) - Math.abs(Math.sin(u * Math.PI * 2.5 + ph)) * 130 * (1 - u); r = (1 - easeOut(u)) * (9 + i * 3) + ph; }
    die(ctx, x, y, .7, r, face);
  });
  goldenGrade(ctx);
}

const SHOTS = [];
// 1 Hook (Golden): already in motion — the dice tumble across the board as the crowned king watches
SHOTS.push({ start: 0, end: 5.84, tr: 'cut', draw(ctx, lt) { hookScene(ctx, lt); } });
// 2 Stakes (Golden): flash-forward — gold and the crown slide back to the king; he reaches for the dice again
SHOTS.push({ start: 5.84, end: 8.0, tr: 'cut', draw(ctx, lt, t) {
  const cam = { x: 540, y: 1020, z: 1.05 + lt * .03, r: 0 };
  applyCam(ctx, cam, 1); hall(ctx, t);
  person(ctx, YUDH, { x: 540, y: 1150, s: 560, shadow: false, legs: seated, arms: lt > 1.4 ? { L: [.5, -.6], R: { ik: [.25, -.25] } } : { L: [.5, -.6], R: [.5, -.6] }, face: calm({ look: [0, .6] }) });
  diceBoard(ctx, 540, 1210, 860, 300);
  const k = easeOut(clamp(lt / 1.2));
  coinPile(ctx, lerp(900, 330, k), 1215, 14, .9); crownProp(ctx, lerp(980, 470, k), 1170, .8);
  die(ctx, 700, 1200, .7, .3, 5); die(ctx, 760, 1230, .7, 1.0, 2);
  goldenGrade(ctx);
  flash(ctx, kf(lt, [[0, .9], [.25, 0]]));
} });
// 3 Vow (Day): a messenger bows and holds out a dice board; the king rises and nods, hand on heart
SHOTS.push({ start: 8.0, end: 10.08, tr: 'cut', draw(ctx, lt, t) {
  const cam = { x: 540, y: 1000, z: 1.0 + lt * .03, r: 0 };
  applyCam(ctx, cam, 1); courtyard(ctx, t);
  const rise = easeOut(clamp((lt - .5) / .6)), nod = lt > 1.3 ? Math.sin((lt - 1.3) * 7) * .5 * clamp(2 - (lt - 1.3) * 2) : 0;
  person(ctx, YUDH, { x: 740, y: 1900 - rise * 60, s: 640, flip: -1, squash: .9 + .1 * rise, arms: rise > .5 ? { L: [.3, -.1], R: { ik: [.06, -.62] } } : { L: [.3, -.1], R: [.3, -.1] }, face: calm({ look: [.6, .2 + nod * .4] }) });
  ctx.save(); ctx.translate(300, 1880); ctx.rotate(.25); person(ctx, MESSENGER, { x: 0, y: 0, s: 560, arms: { L: { ik: [-.05, -.45] }, R: { ik: [.4, -.45] } }, face: calm({ eyes: 'closed' }) }); ctx.restore();
  diceBoard(ctx, 480, 1560, 260, 90);
} });
// 4 Opponent (Golden): across the board, Shakuni smiles and rolls the dice with a sleight-of-hand flourish
SHOTS.push({ start: 10.08, end: 12.72, tr: 'cut', draw(ctx, lt, t) {
  const cam = { x: 540, y: 980, z: 1.08 + lt * .03, r: 0 };
  applyCam(ctx, cam, 1); hall(ctx, t, .15);
  person(ctx, SHAKUNI, { x: 540, y: 1150, s: 600, shadow: false, legs: seated, arms: { L: [.5, -.6], R: { ik: [.35 + Math.sin(lt * 9) * .06, -.35 - Math.max(0, Math.sin(lt * 6)) * .2] } }, face: calm({ eyes: 'half', mouth: 'smirk', look: [.3, .5] }) });
  diceBoard(ctx, 540, 1210, 860, 300);
  const hx = 540 + .38 * 600, hy = 1150 - .45 * 600;
  for (let i = 0; i < 2; i++) die(ctx, hx + Math.cos(lt * 8 + i * 3) * 40, hy + Math.sin(lt * 8 + i * 3) * 25, .55, lt * 6 + i, 6 - i);
  if (lt > 1.0) for (let i = 0; i < 3; i++) sparkle(ctx, hx + 60 - i * 50, hy - 60 + i * 30, 26, clamp(Math.sin(lt * 5 + i)));
  goldenGrade(ctx);
} });
// 5 Escalation (Golden): each throw sweeps a pile off the king's side — gold, then a tiny model of his city
SHOTS.push({ start: 12.72, end: 15.68, tr: 'fade', draw(ctx, lt, t) {
  const g1 = at(13.68, 12.72), g2 = at(15.2, 12.72);
  const cam = { x: 540, y: 1100, z: 1.18 + lt * .02, r: 0 };
  applyCam(ctx, cam, 1); hall(ctx, t);
  diceBoard(ctx, 540, 1210, 1000, 340);
  const k1 = easeIn(clamp((lt - g1 + .25) / .4)), k2 = easeIn(clamp((lt - g2 + .25) / .4));
  if (k1 < 1) coinPile(ctx, lerp(330, 1300, k1), 1230, 16, 1);
  if (k2 < 1) cityModel(ctx, lerp(320, 1300, k2), 1150, .9);
  for (const [th, i] of [[0, 0], [at(14.08, 12.72), 1]]) { const u = clamp((lt - th) / .6); if (lt >= th) { die(ctx, lerp(820, 600, easeOut(u)), 1190 - Math.abs(Math.sin(u * 7)) * 80 * (1 - u), .65, (1 - u) * 8, 6); die(ctx, lerp(860, 690, easeOut(u)), 1225 - Math.abs(Math.sin(u * 6)) * 70 * (1 - u), .65, (1 - u) * 7 + 1, 6); } }
  goldenGrade(ctx);
} });
// 6 Share moment (Day): modern cutaway — a young man stares at a red chart and mutters; his friend facepalms
SHOTS.push({ start: 15.68, end: 19.12, tr: 'fade', draw(ctx, lt, t) {
  const cam = { x: 540, y: 1000, z: 1.0 + lt * .03, r: 0 };
  applyCam(ctx, cam, 1);
  ctx.fillStyle = '#e8eef4'; ctx.fillRect(-900, -900, 2900, 3200); rrect(ctx, 620, 300, 340, 420, 10); fillStroke(ctx, '#bfe3ff', 8); line(ctx, 790, 300, 790, 720, 6);
  ctx.fillStyle = '#c9b896'; ctx.fillRect(-900, 1450, 2900, 1200); line(ctx, -900, 1450, 2000, 1450, 8, INK);
  person(ctx, MODERN[0], { x: 330, y: 2080, s: 700, arms: { L: [.3, -.1], R: { ik: [.26, -.8] } }, face: { eyes: 'normal', look: [.6, -.6], mouth: Math.sin(lt * 14) > 0 ? 'o' : 'flat', browAng: .25 } });
  phone(ctx, 330 + .26 * 700 + 40, 2080 - .8 * 700 - 40, .4, t);
  const palm = lt > 1.5;
  person(ctx, MODERN[1], { x: 840, y: 2080, s: 640, flip: -1, arms: palm ? { L: [.3, -.1], R: { ik: [.02, -.78] } } : { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: palm ? 'closed' : 'half', mouth: 'frown' } });
} });
// 7 Escalation (Golden): four brothers' shadows fade from the king's side of the hall, then the king's own shadow
SHOTS.push({ start: 19.12, end: 20.64, tr: 'cut', draw(ctx, lt, t) {
  const self = at(20.08, 19.12);
  const cam = { x: 540, y: 1000, z: 1.0 + lt * .03, r: 0 };
  applyCam(ctx, cam, 1); hall(ctx, t, .2);
  for (let i = 0; i < 4; i++) { const a = 1 - clamp((lt - .1 - i * .18) * 4); if (a > 0) drawStick(ctx, { x: 140 + i * 150, y: 1500, s: 520, sil: '#140a08', shadow: false, hat: 'none', alpha: .75 * a, arms: { L: [.3, -.1], R: [.3, -.1] } }); }
  const a = 1 - clamp((lt - self) * 3);
  drawStick(ctx, { x: 860, y: 1500, s: 600, sil: '#140a08', shadow: false, hat: 'none', alpha: .8 * a, arms: { L: [.3, -.1], R: [.3, -.1] } });
  if (a > 0) { const hx = 860, hy = 1500 - .765 * 600, hr = .19 * 600; ctx.save(); ctx.globalAlpha = .8 * a; path(ctx, [[hx - hr * .7, hy - hr * .7], [hx - hr * .6, hy - hr * 1.5], [hx, hy - hr * 1.2], [hx + hr * .6, hy - hr * 1.5], [hx + hr * .7, hy - hr * .7]]); ctx.fillStyle = '#140a08'; ctx.fill(); ctx.restore(); }
  goldenGrade(ctx);
} });
// 8 Draupadi (Golden): Shakuni gestures across the hall; the king hesitates, then throws; the elders cover their faces
SHOTS.push({ start: 20.64, end: 26.08, tr: 'cut', draw(ctx, lt, t) {
  const hes = at(23.68, 20.64), thr = at(24.64, 20.64), react = at(25.2, 20.64);
  const cam = { x: 540, y: 1000, z: 1.0 + lt * .02, r: 0 };
  applyCam(ctx, cam, 1); hall(ctx, t, .1);
  if (lt < hes) {
    person(ctx, SHAKUNI, { x: 540, y: 1150, s: 600, shadow: false, legs: seated, arms: { L: [.5, -.6], R: [1.9, -.2] }, face: calm({ eyes: 'half', mouth: 'smirk', look: [.9, -.2] }) });
    diceBoard(ctx, 540, 1210, 860, 300);
  } else if (lt < react) {
    const shake2 = lt < thr ? Math.sin(lt * 20) * .02 : 0;
    person(ctx, YUDH, { x: 540, y: 1150, s: 600, shadow: false, legs: seated, arms: { L: [.5, -.6], R: { ik: [.3 + shake2, lt < thr ? -.45 : -.25] } }, face: calm({ eyes: lt < thr ? 'closed' : 'normal', mouth: 'frown', look: [0, .6] }) });
    diceBoard(ctx, 540, 1210, 860, 300);
    if (lt > thr) { const u = clamp((lt - thr) / .5); die(ctx, lerp(720, 600, u), 1190 - Math.abs(Math.sin(u * 6)) * 60 * (1 - u), .65, (1 - u) * 6, 1); }
  } else {
    // the elders' reaction: heads bowed, hands over their faces
    const R = [0, 1, 2];
    R.forEach(i => person(ctx, ELDERS[i], { x: 200 + i * 340, y: 1900, s: 560, arms: { L: { ik: [-.04, -.76] }, R: { ik: [.04, -.76] } }, face: calm({ eyes: 'closed', mouth: 'frown' }) }));
    for (let i = 0; i < 3; i++) sweat(ctx, 270 + i * 340, 1350, 24, clamp((lt - react) * 3));
  }
  goldenGrade(ctx);
} });
// 9 Mystery (Golden): close on the king's hand, still holding the dice
SHOTS.push({ start: 26.08, end: 27.36, tr: 'fade', draw(ctx, lt, t) {
  const cam = { x: 560, y: 1000, z: 1.4 + lt * .05, r: 0 };
  applyCam(ctx, cam, 1); hall(ctx, t, .35);
  kingHand(ctx, 420, 1050, 1.6, 0, -.1);
  die(ctx, 640, 1030, .9, .2, 5); die(ctx, 690, 1070, .9, .9, 3);
  goldenGrade(ctx);
} });
// 10 You see (Day): a phone with a red chart; four little traders, three still tapping BUY after a row of red days
SHOTS.push({ start: 27.36, end: 32.88, tr: 'fade', draw(ctx, lt, t) {
  const sebi = at(29.3, 27.36);
  const cam = { x: 540, y: 960, z: 1.0 + lt * .02, r: 0 };
  applyCam(ctx, cam, 1); ctx.fillStyle = '#e8eef4'; ctx.fillRect(-900, -900, 2900, 3200);
  if (lt < sebi) phone(ctx, 540, 860, 1.6, t);
  else {
    for (let i = 0; i < 7; i++) { rrect(ctx, 150 + i * 115, 300 + (i % 3) * 10, 80, 120 + i * 12, 8); fillStroke(ctx, '#e0392f', 6); }
    for (let i = 0; i < 4; i++) {
      const x = 170 + i * 250, still = i < 3, tap = still ? Math.max(0, Math.sin((lt - sebi) * 9 + i)) : 0;
      phone(ctx, x, 1000, .38, t, { buy: still });
      drawStick(ctx, { x, y: 1700, s: 360, cols: [['#2f63c9', '#3fa35b', '#d8743a', '#7a4bc4'][i], ['#2f63c9', '#3fa35b', '#d8743a', '#7a4bc4'][i]], hat: 'none', belt: false, arms: still ? { L: [.3, -.1], R: { ik: [.18, -.86 - tap * .05] } } : { L: [.3, -.1], R: [.3, -.1] }, face: calm({ eyes: still ? 'normal' : 'closed', look: [0, -.6], mouth: still ? 'flat' : 'smile' }) });
    }
  }
} });
// 11 Return (Golden): the old blind king pushes the gold and the crown back across the board
SHOTS.push({ start: 32.88, end: 35.76, tr: 'fade', draw(ctx, lt, t) {
  const cam = { x: 540, y: 1000, z: 1.0 + lt * .03, r: 0 };
  applyCam(ctx, cam, 1); hall(ctx, t);
  person(ctx, DHRITA, { x: 540, y: 1150, s: 620, shadow: false, legs: seated, arms: { L: { ik: [-.3, -.25 + Math.sin(lt * 2) * .02] }, R: { ik: [.3, -.25] } }, face: calm({ eyes: 'closed' }) });
  diceBoard(ctx, 540, 1210, 860, 300);
  const k = easeOut(clamp((lt - .3) / 1.6));
  coinPile(ctx, lerp(560, 280, k), lerp(1150, 1300, k), 16, .9); crownProp(ctx, lerp(560, 760, k), lerp(1140, 1290, k), .8);
  goldenGrade(ctx);
} });
// 12 Snap (Golden): a stake card reads 13 YEARS; the dice land; the king and his brothers walk into a dark forest
SHOTS.push({ start: 35.76, end: 39.44, tr: 'fade', draw(ctx, lt, t) {
  const card = at(36.3, 35.76), dice = at(37.6, 35.76), walk = at(38.6, 35.76);
  const cam = { x: 540, y: 1000, z: 1.0 + lt * .02, r: 0 };
  applyCam(ctx, cam, 1);
  if (lt < walk) {
    hall(ctx, t, .2); diceBoard(ctx, 540, 1250, 860, 300);
    stakeCard(ctx, 540, 700, 1.0, (lt - card) * 3);
    if (lt > dice) { const u = clamp((lt - dice) / .5); die(ctx, lerp(760, 560, u), 1230 - Math.abs(Math.sin(u * 6)) * 70 * (1 - u), .7, (1 - u) * 7, 1); die(ctx, lerp(800, 660, u), 1260 - Math.abs(Math.sin(u * 5)) * 60 * (1 - u), .7, (1 - u) * 6 + 1, 2); }
  } else {
    forest(ctx, t);
    const k = lt - walk;
    for (let i = 0; i < 5; i++) { const x = 180 + i * 165 + k * 90, s = 470 - i * 20; person(ctx, i === 0 ? YUDH : BRO, { x, y: 1880 - i * 14, s, flip: -1, legs: { L: [Math.sin(k * 6 + i) * .4 + .05, -.2], R: [-Math.sin(k * 6 + i) * .4 + .05, -.2] }, face: calm({ eyes: 'closed', mouth: 'frown' }) }); }
    tint(ctx, '#0a0814', .25 + k * .15);
  }
  goldenGrade(ctx, .7);
} });
// 13 Debate / callback (Golden): Shakuni smirks behind the board; then the king's hand reaches for the dice again —
// the last frames are the throw the video opens on, so it loops cleanly
SHOTS.push({ start: 39.44, end: LOOP_END, tr: 'cut', draw(ctx, lt, t) {
  const tau = t - LOOP_END;
  if (tau < -1.25) {
    const cam = { x: 540, y: 960, z: 1.22 + lt * .03, r: 0 };
    applyCam(ctx, cam, 1); hall(ctx, t, .1);
    person(ctx, SHAKUNI, { x: 540, y: 1150, s: 620, shadow: false, legs: seated, arms: { L: [.5, -.6], R: [.5, -.6] }, face: calm({ eyes: 'half', mouth: 'smirk', look: [-.4, .3] }) });
    diceBoard(ctx, 540, 1210, 860, 300); goldenGrade(ctx);
  } else hookScene(ctx, tau);
} });
