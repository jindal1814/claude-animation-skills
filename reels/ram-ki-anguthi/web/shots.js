// राम की अंगूठी — Rama's ring (folk tale retold by A.K. Ramanujan). Shot list in seconds of the narration.
const handheld = (t, a = 4) => shake(t * .35, a, 1, 2);
const walkLegs = (t, sp = 9, amp = .55) => ({ L: [Math.sin(t * sp) * amp + .05, -Math.max(0, Math.sin(t * sp + 1)) * .7], R: [-Math.sin(t * sp) * amp + .05, -Math.max(0, -Math.sin(t * sp + 1)) * .7] });
function tint(ctx, col, a) { if (a <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = clamp(a); ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.restore(); }
const L = (abs, start) => abs - start; // absolute narration time -> time inside a shot

const SHOTS = [];
// A — hook: tiny Hanuman before a mountain of rings in the netherworld
SHOTS.push({ start: 0, end: 5.47, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0], y: kf(lt, [[0, 1050], [2.7, 1050], [4.2, 900]]) + hh[1], z: kf(lt, [[0, 1.6], [2.7, 1.45], [4.4, 1.0]]), r: 0 };
  applyCam(ctx, cam, 1); drawNether(ctx, t);
  glowDisk(ctx, 540, 1000, 700, .35 + .15 * Math.sin(t * 2));
  drawThali(ctx, 540, 1180, 470);
  ringPile(ctx, 540, 1080, 820, 240, 90, t, 3);
  hanuman(ctx, { x: 540, y: 1410, s: 280, t, face: { eyes: 'wide', look: [0, -1], mouth: 'o', browUp: 1 }, arms: { L: [.5, -.6], R: [.5, -.6] } });
  for (let i = 0; i < 6; i++) sparkle(ctx, 240 + i * 120, 980 + (i % 2) * 80, 30, clamp(Math.sin(t * 3 + i * 1.3)));
} });
// B — whisper: "and every one of them was Rama's" — close on the engraved rings
SHOTS.push({ start: 5.47, end: 8.56, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 2);
  const cam = { x: 540 + hh[0], y: 900 + hh[1], z: 1.0 + lt * .05, r: .02 };
  applyCam(ctx, cam, 1); drawNether(ctx, t, .4);
  glowDisk(ctx, 540, 860, 600, .3);
  const R = rng(8);
  for (let i = 0; i < 11; i++) { const x = 160 + R() * 760, y = 420 + R() * 800; drawRing(ctx, x, y, 70 + R() * 30, (R() - .5) * .6, 0, true); }
  const k = clamp((lt - 1.2) / .4);
  drawRing(ctx, 540, 820, 170, -.08, k, true);
} });
// C1 — Ayodhya: Rama on his throne
SHOTS.push({ start: 8.56, end: 11.36, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0], y: 900 + hh[1], z: 1.0 + lt * .03, r: 0 };
  applyCam(ctx, cam, 1); drawCourt(ctx, 0, t);
  drawThrone(ctx, 540, 1330, 1);
  rama(ctx, { x: 540, y: 1300, s: 640, shadow: false, legs: { L: [1.4, -1.4], R: [1.4, -1.4] }, arms: { L: [.6, -1.2], R: [.6, -1.2] }, face: { eyes: 'normal', mouth: 'smile', blink: (lt > 1.4 && lt < 1.52) ? 1 : 0 } });
  // petals drifting
  for (let i = 0; i < 10; i++) { const y = ((t * 60 + i * 190) % 1500) + 100; ellipse(ctx, 80 + i * 100 + Math.sin(t + i) * 30, y, 12, 7, t + i); fillStroke(ctx, '#e8506a', 3); }
} });
// C2 — the ring slips off and drops through a crack in the floor
SHOTS.push({ start: 11.36, end: 15.8, tr: 'whip', draw(ctx, lt, t) {
  const hh = handheld(t, 3); const drop = 12.0 - 11.36, land = drop + .55, gone = 14.6 - 11.36;
  const cam = { x: 540 + hh[0], y: kf(lt, [[0, 760], [land, 1050]]) + hh[1], z: kf(lt, [[0, 1.5], [land, 1.25], [4.4, 1.4]]), r: 0 };
  applyCam(ctx, cam, 1); drawCourt(ctx, .15, t);
  // Rama's hand on the armrest, the ring sliding off his finger
  rrect(ctx, 220, 620, 520, 110, 40); fillStroke(ctx, GOLD, 10);
  rrect(ctx, 260, 520, 260, 120, 50); fillStroke(ctx, '#f0d0b0', 9);
  rrect(ctx, 480, 560, 160, 52, 26); fillStroke(ctx, '#f0d0b0', 9);
  drawCrack(ctx, 600, 1250, 150, clamp((lt - land) * 2), t);
  let rx = 600, ry = 590, rr = 46, rot = 0;
  if (lt < drop) { rx = lerp(560, 640, lt / drop); }
  else if (lt < land) { const k = (lt - drop) / (land - drop); rx = 640 - k * 40; ry = lerp(590, 1220, easeIn(k)); rot = k * 4; }
  else if (lt < land + .5) { const k = (lt - land) / .5; rx = 600; ry = 1220 - Math.sin(k * Math.PI) * 120 * (1 - k); rot = 4 + k * 3; }
  else { const k = clamp((lt - land - .5) / (gone - land - .5)); rx = 600; ry = 1230 + easeIn(k) * 60; rr = 46 * (1 - easeIn(k)); }
  if (rr > 1) drawRing(ctx, rx, ry, rr, rot, lt < drop ? .6 : 0, false);
} });
// D — "Hanuman, find my ring"
SHOTS.push({ start: 15.8, end: 18.65, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0], y: 1000 + hh[1], z: 1.08 + lt * .03, r: 0 };
  applyCam(ctx, cam, 1); drawCourt(ctx, .05, t);
  drawThrone(ctx, 360, 1300, .75);
  rama(ctx, { x: 360, y: 1280, s: 500, shadow: false, legs: { L: [1.4, -1.4], R: [1.4, -1.4] }, arms: { L: [.6, -1.2], R: { ik: [.42, -.62] } }, face: { eyes: 'normal', look: [.8, .3], mouth: 'smile' } });
  drawCrack(ctx, 600, 1430, 90, .6, t);
  hanuman(ctx, { x: 820, y: 1520, s: 480, flip: -1, t, mace: 'L', legs: { L: [1.2, -1.6], R: [.2, -1.5] }, arms: folded(), face: { eyes: 'normal', look: [-.8, -.4], mouth: 'smile' } });
} });
// E — Hanuman becomes tiny and leaps into the crack
SHOTS.push({ start: 18.65, end: 22.3, tr: 'whip', draw(ctx, lt, t) {
  const shrink = kf(lt, [[.3, 1], [1.5, .16, easeOut]]), jump = 21.0 - 18.65;
  const hh = handheld(t, 3);
  const cam = { x: 600 + hh[0], y: kf(lt, [[0, 1100], [1.6, 1250]]) + hh[1], z: kf(lt, [[0, 1.0], [1.6, 1.5]]), r: 0 };
  applyCam(ctx, cam, 1); drawCourt(ctx, .1, t);
  drawCrack(ctx, 600, 1420, 150, .8 + .2 * Math.sin(t * 6), t);
  let x = 760, y = 1460;
  if (lt > jump) { const k = clamp((lt - jump) / .5); x = lerp(760, 600, k); y = 1460 - Math.sin(k * Math.PI) * 160 + (k > .7 ? (k - .7) * 400 : 0); }
  const s = 480 * shrink;
  if (lt < jump + .45) { ctx.save(); if (lt > jump + .3) { ctx.beginPath(); ctx.rect(-500, -500, 2200, 1910); ctx.clip(); } hanuman(ctx, { x, y, s, t, flip: -1, mace: 'L', arms: lt > jump ? POSE.handsUp.arms : { L: [.3, -.1], R: [.9, -2.1] }, legs: lt > jump ? { L: [.6, -1], R: [.6, -1] } : undefined, face: { eyes: 'normal', look: [-.6, .6], mouth: lt > jump ? 'o' : 'smile' } }); ctx.restore(); }
  const sp = kf(lt, [[.3, 0], [.8, 1], [1.6, 0]]);
  for (let i = 0; i < 7; i++) { const a = i / 7 * TAU + t; sparkle(ctx, 760 + Math.cos(a) * 200 * (1 - sp * .5), 1250 + Math.sin(a) * 200 * (1 - sp * .5), 40, sp); }
} });
// F — falling: down... and down... into the netherworld
SHOTS.push({ start: 22.3, end: 27.0, tr: 'cut', draw(ctx, lt, t) {
  const landT = 24.7 - 22.3;
  const hh = handheld(t, 4);
  if (lt < landT) {
    const cam = { x: 540 + hh[0], y: 960 + hh[1], z: 1.0, r: Math.sin(t * 1.3) * .03 };
    applyCam(ctx, cam, 1);
    const g = ctx.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#2a1a12'); g.addColorStop(1, '#3a1f5c'); ctx.fillStyle = g; ctx.fillRect(-300, -300, 1700, 2600);
    const off = (lt * 1400) % 400;
    for (let k = -1; k < 7; k++) for (const sd of [-1, 1]) { const y = k * 400 - off; const x = sd < 0 ? -40 : 1120; path(ctx, [[x, y], [x + sd * -220 + Math.sin(k * 3.1) * 60 * -sd, y + 200], [x, y + 400]]); fillStroke(ctx, '#4a2e22', 8); }
    for (let i = 0; i < 12; i++) { const y = ((i * 170 - lt * 2600) % 1920 + 1920) % 1920; line(ctx, 300 + i * 40, y, 300 + i * 40, y + 120, 5, 'rgba(255,255,255,.25)'); }
    hanuman(ctx, { x: 540 + Math.sin(lt * 5) * 60, y: 1040, s: 360, t, mace: 'L', arms: POSE.handsUp.arms, legs: { L: [.5, -.6], R: [.3, -.5] }, face: { eyes: 'wide', look: [0, 1], mouth: 'o' } });
  } else {
    const l2 = lt - landT;
    const cam = { x: 540 + hh[0], y: 1000 + hh[1] + (l2 < .3 ? shake(t, 20, 4)[1] : 0), z: 1.05 + l2 * .03, r: 0 };
    applyCam(ctx, cam, 1); drawNether(ctx, t);
    const sq = kf(l2, [[0, .6], [.3, 1, backOut]]);
    puff(ctx, 420, 1400, 80 * (1 + l2), t, '#8a6ab8', 3, clamp(1 - l2)); puff(ctx, 660, 1400, 80 * (1 + l2), t, '#8a6ab8', 4, clamp(1 - l2));
    hanuman(ctx, { x: 540, y: 1420, s: 380, squash: sq, t, mace: 'L', arms: { L: [.5, -.4], R: [.5, -.4] }, face: { eyes: l2 < .6 ? 'closed' : 'wide', look: [.6, -.2], mouth: 'o' } });
  }
} });
// G — the spirits catch him, put him on a platter, carry him to their king "to eat"
SHOTS.push({ start: 27.0, end: 33.32, tr: 'cut', draw(ctx, lt, t) {
  const eat = 32.02 - 27.0;
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0] + lt * 8, y: 1000 + hh[1], z: 1.0 + lt * .02 + (lt > eat ? .12 * easeOut(clamp((lt - eat) * 4)) : 0), r: 0 };
  applyCam(ctx, cam, 1); drawNether(ctx, t, .1);
  const walk = lt > 1.4; const px = walk ? lerp(500, 640, clamp((lt - 1.4) / 3.5)) : 500;
  bhoot(ctx, px - 230, 1500, 520, t, { arms: { L: [.3, -.1], R: walk ? { ik: [.33, -.86] } : [2.3, .3] }, legs: walk ? walkLegs(lt, 6, .4) : undefined });
  bhoot(ctx, px + 230, 1500, 520, t, { flip: -1, arms: { L: [.3, -.1], R: walk ? { ik: [.33, -.86] } : [2.3, .3] }, legs: walk ? walkLegs(lt + .5, 6, .4) : undefined });
  const ty = walk ? 1060 + Math.sin(lt * 6) * 8 : 1100;
  if (walk) {
    drawThali(ctx, px, ty, 230, { veg: true });
    hanuman(ctx, { x: px, y: ty + 10, s: 170, t, mace: 'L', legs: { L: [1.4, -1.4], R: [1.4, -1.4] }, arms: { L: [.5, -.4], R: [.5, -.4] }, face: { eyes: 'normal', look: [.6, -.4], mouth: 'flat', browAng: .2 } });
  } else {
    hanuman(ctx, { x: px, y: 1500, s: 220, t, mace: 'L', arms: POSE.handsUp.arms, face: { eyes: 'wide', mouth: 'o' } });
  }
  if (lt > eat) { const k = clamp((lt - eat) * 4); ctx.save(); ctx.translate(px + 230 - 70, 1500 - 600); ctx.scale(k, k); line(ctx, 0, 0, 40, -220, 14, '#c9c2d8'); ellipse(ctx, 46, -250, 30, 44, .2); fillStroke(ctx, '#c9c2d8', 8); ctx.restore(); devText(ctx, 'हम्म!', px - 230, 780, 70 * k, k, '#c9b6ff'); }
} });
// H — whisper: Hanuman just keeps chanting Ram... Ram... Ram...
SHOTS.push({ start: 33.32, end: 39.83, tr: 'whip', draw(ctx, lt, t) {
  const hh = handheld(t, 2);
  const cam = { x: 540 + hh[0], y: 900 + hh[1], z: 1.0 + lt * .03, r: 0 };
  applyCam(ctx, cam, 1); drawNether(ctx, t, .45);
  glowDisk(ctx, 540, 900, 520, .25 + .1 * Math.sin(t * 2), '255,190,90');
  drawThali(ctx, 540, 1180, 420, { veg: true });
  hanuman(ctx, { x: 540, y: 1200, s: 560, t, mace: 'L', legs: { L: [1.4, -1.4], R: [1.4, -1.4] }, arms: folded(), face: { eyes: 'closed', mouth: 'smile' } });
  [36.64, 37.65, 38.65].forEach((at, i) => { const k = lt - L(at, 33.32); if (k > 0) devText(ctx, 'राम', 540 + (i - 1) * 230, 560 - k * 140, 110, clamp(1.6 - k * .6)); });
} });
// I — the King of Spirits roars: "Who are you?"
SHOTS.push({ start: 39.83, end: 42.79, tr: 'whip', draw(ctx, lt, t) {
  const roar = 41.2 - 39.83; const sh = lt > roar && lt < roar + .8 ? shake(t, 18 * (1 - (lt - roar) / .8), 4) : [0, 0];
  const cam = { x: 540 + sh[0], y: kf(lt, [[0, 1100], [roar, 860]]) + sh[1], z: kf(lt, [[0, 1.0], [roar, 1.15], [roar + .1, 1.3], [3, 1.36]]), r: 0 };
  applyCam(ctx, cam, 1); drawNether(ctx, t, .3);
  glowDisk(ctx, 540, 700, 600, .2, '160,90,255');
  spiritKing(ctx, 540, 1640, 1150, t, { arms: lt > roar ? { L: [1.6, -.4], R: [1.6, -.4] } : { L: [.6, -1.2], R: [.6, -1.2] }, face: { eyes: lt > roar ? 'wide' : 'normal' } });
} });
// J — "I am Hanuman. I've come for Lord Rama's ring."
SHOTS.push({ start: 42.79, end: 46.63, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 2);
  const cam = { x: 540 + hh[0], y: 1000 + hh[1], z: 1.0 + lt * .03, r: 0 };
  applyCam(ctx, cam, 1); drawNether(ctx, t, .25);
  glowDisk(ctx, 540, 900, 500, .3, '255,190,90');
  drawThali(ctx, 540, 1300, 400, { veg: true });
  hanuman(ctx, { x: 540, y: 1310, s: 640, t, mace: 'L', arms: lt > 1.0 ? folded() : { L: [.3, -.1], R: [.9, -2.1] }, face: { eyes: 'normal', look: [0, -.6], mouth: 'smile', browUp: .5 } });
} });
// K — the king laughs and sends for a platter heaped with thousands of rings
SHOTS.push({ start: 46.63, end: 53.51, tr: 'cut', draw(ctx, lt, t) {
  const bring = 48.0 - 46.63, same = 50.84 - 46.63;
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0], y: kf(lt, [[0, 900], [same, 1000], [same + .6, 1080]]) + hh[1], z: kf(lt, [[0, 1.0], [same, 1.05], [same + .6, 1.6]]), r: 0 };
  applyCam(ctx, cam, 1); drawNether(ctx, t, .2);
  if (lt < bring + .8) spiritKing(ctx, 540, 1400, 760, t, { grin: true, arms: { L: [.6, -1.2], R: [2.2, -.2] }, face: { eyes: 'happy' } });
  const k = easeOut(clamp((lt - bring) / 1.2));
  const py = lerp(2200, 1080, k);
  if (k > 0) {
    bhoot(ctx, 300, py + 470, 420, t, { arms: { L: [.3, -.1], R: [2.6, .2] } }); bhoot(ctx, 780, py + 470, 420, t, { flip: -1, arms: { L: [.3, -.1], R: [2.6, .2] } });
    glowDisk(ctx, 540, py - 60, 600, .35 * k);
    drawThali(ctx, 540, py, 430); ringPile(ctx, 540, py - 60, 760, 220, 120, t, 5);
    hanuman(ctx, { x: 540, y: py + 420, s: 230, t, mace: 'L', arms: { L: [.5, -.6], R: [.5, -.6] }, face: { eyes: 'wide', look: [0, -1], mouth: 'o', browUp: 1 } });
  }
} });
// L — "Recognise it — which one is your Rama's?" Hanuman can't tell
SHOTS.push({ start: 53.51, end: 58.95, tr: 'cut', draw(ctx, lt, t) {
  const cant = 56.4 - 53.51;
  const hh = handheld(t, 2);
  const cam = { x: 540 + hh[0], y: 960 + hh[1], z: 1.0 + lt * .025, r: 0 };
  applyCam(ctx, cam, 1); drawNether(ctx, t, .35);
  ctx.save(); ctx.globalAlpha = .9; spiritKing(ctx, 540, 1100, 900, t, { arms: { L: [.6, -1.2], R: [.6, -1.2] }, face: { eyes: 'half' } }); ctx.restore();
  drawThali(ctx, 480, 1300, 430); ringPile(ctx, 480, 1240, 750, 190, 100, t, 9);
  const shakeHead = lt > cant && lt < cant + 1.2 ? Math.sin((lt - cant) * 18) * 14 : 0;
  hanuman(ctx, { x: 820 + shakeHead, y: 1820, s: 560, flip: -1, t, mace: 'L', arms: lt > cant ? { L: [.5, -.4], R: [.9, -2.1] } : { L: { ik: [-.2, -.9] }, R: [.5, -.4] }, face: { eyes: 'normal', look: [Math.sin(lt * 4) * .8, -.6], mouth: lt > cant ? 'frown' : 'flat', browAng: .25 } });
  if (lt > cant) sweat(ctx, 960, 1300, 34, clamp((lt - cant) * 3));
} });
// M — "As many rings, so many Ramas came and went." The rings rise; a line of Ramas recedes into the dark
SHOTS.push({ start: 58.95, end: 68.68, tr: 'cut', draw(ctx, lt, t) {
  const fall = 66.4 - 58.95;
  const hh = handheld(t, 2);
  const cam = { x: 540 + hh[0], y: 900 + hh[1] - lt * 8, z: 1.0 + lt * .02, r: 0 };
  applyCam(ctx, cam, 1); drawNether(ctx, t, .6);
  // receding procession of golden Ramas
  const show = clamp((lt - .6) / 1.2);
  for (let i = 11; i >= 0; i--) { const d = Math.pow(.8, i); const x = 540 + (i % 2 ? -1 : 1) * 130 * d, y = 1230 - (1 - d) * 640; const ss = 380 * d; ctx.save(); ctx.globalAlpha = show * (1 - i * .06); glowDisk(ctx, x, y - .5 * ss, .45 * ss, .18); drawStick(ctx, { x, y, s: ss, sil: '#f0c050', shadow: false, hat: 'none', arms: { L: [.3, -.1], R: [.3, -.1] } }); const hy = y - .765 * ss, hr = .19 * ss; ctx.beginPath(); ctx.moveTo(x - hr * .75, hy - hr * .7); ctx.lineTo(x - hr * .65, hy - hr * 1.4); ctx.lineTo(x, hy - hr * 1.8); ctx.lineTo(x + hr * .65, hy - hr * 1.4); ctx.lineTo(x + hr * .75, hy - hr * .7); ctx.closePath(); ctx.fillStyle = '#ffe08a'; ctx.fill(); ctx.beginPath(); ctx.arc(x - .02 * ss, y - .5 * ss, .3 * ss, -1.2, 1.2); ctx.lineWidth = ss * .02; ctx.strokeStyle = '#f0c050'; ctx.stroke(); ctx.restore(); }
  // rings rising in a slow spiral
  const R = rng(17);
  for (let i = 0; i < 26; i++) { const ph = R() * TAU, sp = .5 + R() * .5, rad = 150 + R() * 300; const k = ((lt * .08 * sp + R()) % 1); const x = 540 + Math.cos(ph + lt * .6 * sp) * rad, y = 1500 - k * 1300; ctx.save(); ctx.globalAlpha = Math.sin(k * Math.PI); drawRing(ctx, x, y, 26 + R() * 12, Math.sin(lt + i) * .4, 0, false); ctx.restore(); }
  // a new ring falls onto the platter on "falls here"
  drawThali(ctx, 540, 1460, 360); ringPile(ctx, 540, 1410, 620, 140, 50, t, 21);
  if (lt > fall - .6) { const k = clamp((lt - fall + .6) / .6); const y = lerp(-100, 1380, easeIn(k)); drawRing(ctx, 540, y, 50, k * 6, k >= 1 ? clamp(1.5 - (lt - fall)) : 0, true); if (k >= 1) glowDisk(ctx, 540, 1380, 300, clamp(1 - (lt - fall) * .7) * .6); }
} });
// N — meanwhile, in Ayodhya: the empty throne
SHOTS.push({ start: 68.68, end: 73.77, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 2);
  const cam = { x: 540 + hh[0], y: 960 + hh[1] - lt * 10, z: 1.0 + lt * .03, r: 0 };
  applyCam(ctx, cam, 1); drawCourt(ctx, .25, t);
  drawThrone(ctx, 540, 1330, 1, .1);
  lightShaft(ctx, 540, -300, 300, 700, 1700, .7 + .1 * Math.sin(t * 2));
  glowDisk(ctx, 540, 900, 700, .3 * clamp(lt / 1.5));
  for (let i = 0; i < 16; i++) { const y = ((t * 50 + i * 130) % 1600) + 50; ellipse(ctx, 120 + i * 55 + Math.sin(t + i) * 30, y, 12, 7, t + i); fillStroke(ctx, '#e8506a', 3); }
} });
// O — "They say every Rama has his own Ramayana."
SHOTS.push({ start: 73.77, end: 78.7, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 2);
  const cam = { x: 540 + hh[0], y: kf(lt, [[0, 1150], [4.6, 820]]) + hh[1], z: kf(lt, [[0, 1.5], [4.6, .95]]), r: 0 };
  applyCam(ctx, cam, 1); drawNether(ctx, t, .5);
  glowDisk(ctx, 540, 1150, 700, .35);
  drawThali(ctx, 540, 1230, 470); ringPile(ctx, 540, 1150, 820, 230, 120, t, 3);
  hanuman(ctx, { x: 540, y: 1560, s: 260, t, mace: 'L', arms: folded(), face: { eyes: 'closed', mouth: 'smile' } });
  tint(ctx, '#000', kf(lt, [[3.8, 0], [4.6, 1]]));
} });
