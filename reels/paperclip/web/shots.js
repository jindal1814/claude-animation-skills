// Zero to Empire #1: One Red Paperclip. Shot list in seconds of the voiceover (see SCRIPT.md for the beat table).
const handheld = (t, a = 4) => shake(t * .35, a, 1, 2);
const walkLegs = (t, sp = 9, amp = .55) => ({ L: [Math.sin(t * sp) * amp + .05, -Math.max(0, Math.sin(t * sp + 1)) * .7], R: [-Math.sin(t * sp) * amp + .05, -Math.max(0, -Math.sin(t * sp + 1)) * .7] });
function flash(ctx, a, col = '#fff') { if (a <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = clamp(a); ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.restore(); }
const at = (abs, start) => abs - start;
const holdOut = { L: [.3, -.1], R: { ik: [.4, -.62] } }; // right hand held out in front, about chest height
const handAt = (x, y, s, flip = 1) => [x + flip * .4 * s * 1.0 + flip * .02 * s, y - .62 * s]; // where that hand ends up

const SHOTS = [];
// 1 Hook (Day): a red paperclip passes from hand to hand until a house key drops into a palm
SHOTS.push({ start: 0, end: 3.44, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 2); const cam = { x: 540 + hh[0], y: 1000 + hh[1], z: 1.0 + lt * .04, r: 0 };
  applyCam(ctx, cam, 1); room(ctx, 'day', 0, '#d9e8f0'); desk(ctx, 1150);
  const key = at(2.64, 0);
  if (lt < key) {
    const k = (lt / key) * 3, i = Math.min(2, Math.floor(k)), f = k - i;
    const xs = [180, 540, 900];
    for (let j = 0; j < 3; j++) hand(ctx, xs[j], 1000 + (j === i ? -40 : 0), .9, (j - 1) * .2, 1);
    const px = lerp(xs[i], xs[Math.min(2, i + 1)], easeOut(f)), py = 940 - Math.sin(f * Math.PI) * 150;
    paperclip(ctx, px, py, 1.1, f * 2);
  } else {
    hand(ctx, 540, 1040, 1.2, 0, 1);
    const k = clamp((lt - key) / .35); houseKey(ctx, 560, lerp(300, 960, easeIn(k)), 1.6, k * 3);
    if (k >= 1) sparkle(ctx, 640, 880, 60, clamp(1.5 - (lt - key) * 2));
  }
} });
// 2 Stakes (Day): a small musical snow globe spins in a spotlight; a tiny house inside
SHOTS.push({ start: 3.44, end: 5.68, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 2); const cam = { x: 540 + hh[0], y: 860 + hh[1], z: 1.0 + lt * .06, r: 0 };
  applyCam(ctx, cam, 1); ctx.fillStyle = '#1d2433'; ctx.fillRect(-900, -900, 2900, 3200);
  snowGlobe(ctx, 540, 860, 1.9, t, { spot: true, inside: 'house' });
  for (let i = 0; i < 3; i++) { const k = ((lt * .7 + i / 3) % 1); text(ctx, '♪', 840 + Math.sin(k * 6 + i) * 30, 600 - k * 260, 70, '#ffe9a8', INK, 0, 'Poppins', 700); }
  flash(ctx, kf(lt, [[0, .9], [.25, 0]]));
} });
// 3 Trade one (Day): Kyle holds the paperclip to his laptop camera, then swaps it on a doorstep for a fish-shaped pen
SHOTS.push({ start: 5.68, end: 10.4, tr: 'cut', draw(ctx, lt, t) {
  const swap = at(8.0, 5.68);
  const hh = handheld(t, 3);
  if (lt < swap) {
    const cam = { x: 540 + hh[0], y: 1000 + hh[1], z: 1.0 + lt * .04, r: 0 };
    applyCam(ctx, cam, 1); room(ctx, 'day', 0, '#e8dcc0'); desk(ctx, 1480);
    laptop(ctx, 740, 1470, .9);
    person(ctx, KYLE, { x: 330, y: 2150, s: 820, face: { eyes: 'normal', look: [.8, -.3], mouth: 'grin' }, arms: { L: [.3, -.1], R: { ik: [.42, -1.0] } } });
    paperclip(ctx, 330 + .42 * 820 + 10, 2150 - 1.0 * 820 - 40, 1.1, .2);
  } else {
    const l2 = lt - swap;
    const cam = { x: 540 + hh[0], y: 1000 + hh[1], z: 1.0 + l2 * .03, r: 0 };
    applyCam(ctx, cam, 1); doorstep(ctx, 'day', t);
    const s = 560, k = clamp((l2 - .7) / .6);
    person(ctx, KYLE, { x: 220, y: 1880, s, face: { eyes: 'normal', look: [.8, -.2], mouth: 'smile' }, arms: holdOut });
    person(ctx, PEOPLE[0], { x: 860, y: 1880, s, flip: -1, face: { eyes: 'happy', mouth: 'grin' }, arms: holdOut });
    const a = [220 + .42 * s, 1880 - .62 * s], b = [860 - .42 * s, 1880 - .62 * s];
    paperclip(ctx, lerp(a[0], b[0], easeOut(k)), lerp(a[1], b[1], k) - Math.sin(k * Math.PI) * 120, .8, k * 3);
    fishPen(ctx, lerp(b[0], a[0], easeOut(k)), lerp(b[1], a[1], k) - Math.sin(k * Math.PI) * 160 - 20, .8, -k * 3);
  }
} });
// 4 Montage (Day): fast doorstep swaps — doorknob, camp stove, generator; the camera follows each object
SHOTS.push({ start: 10.4, end: 13.12, tr: 'cut', draw(ctx, lt, t) {
  const beats = [at(10.4, 10.4), at(11.28, 10.4), at(12.16, 10.4)];
  const i = lt < beats[1] ? 0 : lt < beats[2] ? 1 : 2, l2 = lt - beats[i];
  const hh = handheld(t, 4); const cam = { x: 540 + hh[0] + (1 - easeOut(clamp(l2 / .25))) * 420, y: 1000 + hh[1], z: 1.0 + l2 * .05, r: 0 };
  applyCam(ctx, cam, 1); doorstep(ctx, 'day', t);
  const s = 560;
  person(ctx, KYLE, { x: 220, y: 1880, s, face: { eyes: 'wide', look: [.8, -.2], mouth: 'grin' }, arms: holdOut });
  person(ctx, PEOPLE[(i + 1) % 5], { x: 860, y: 1880, s, flip: -1, face: { eyes: 'normal', look: [-.8, -.2], mouth: 'smile' }, arms: holdOut });
  const pop = backOut(clamp(l2 * 4)); const hx = 220 + .42 * s, hy = 1880 - .62 * s;
  ctx.save(); ctx.translate(hx + 20, hy - 60); ctx.scale(pop, pop);
  if (i === 0) doorknob(ctx, 0, 0, 1.2); else if (i === 1) campStove(ctx, 0, 40, .9); else generator(ctx, 0, 40, .8);
  ctx.restore();
} });
// 5 Party (Golden): an empty keg and an IOU note pile into his arms
SHOTS.push({ start: 13.12, end: 16.16, tr: 'cut', draw(ctx, lt, t) {
  const kegT = at(14.6, 13.12), iouT = at(15.2, 13.12);
  const hh = handheld(t, 3); const cam = { x: 540 + hh[0], y: 1000 + hh[1], z: 1.0 + lt * .04, r: 0 };
  applyCam(ctx, cam, 1); doorstep(ctx, 'golden', t);
  person(ctx, KYLE, { x: 400, y: 2060, s: 640, squash: lt > kegT + .3 ? .96 : 1, face: { eyes: lt > kegT + .3 ? 'wide' : 'normal', look: [0, -.6], mouth: lt > iouT ? 'grin' : 'o' }, arms: { L: { ik: [.1, -.45] }, R: { ik: [.42, -.45] } } });
  const k1 = clamp((lt - kegT + .3) / .35); keg(ctx, 580, lerp(300, 1860, easeIn(k1)), .65);
  const k2 = clamp((lt - iouT + .2) / .45); iouNote(ctx, 760 + Math.sin(lt * 4) * 30 * (1 - k2), lerp(250, 1640, easeOut(k2)), .7, .25 + (1 - k2) * .6);
  for (let i = 0; i < 6; i++) { const ph = (lt * .8 + i / 6) % 1; ctx.save(); ctx.globalAlpha = .8; circle(ctx, 150 + i * 160, 300 + ph * 900, 14); ctx.fillStyle = ['#e0392f', '#ffd23a', '#3fa35b', '#2f63c9'][i % 4]; ctx.fill(); ctx.restore(); }
  goldenGrade(ctx);
} });
// 6 Snowmobile (Day): it roars past; a road sign reads YAHK; Kyle does a double take
SHOTS.push({ start: 16.16, end: 19.44, tr: 'cut', draw(ctx, lt, t) {
  const sign = at(17.84, 16.16), dbl = at(18.56, 16.16);
  const hh = handheld(t, 3); const cam = { x: 540 + hh[0], y: 1000 + hh[1], z: kf(lt, [[0, 1.0], [dbl, 1.0], [dbl + .2, 1.18]]), r: 0 };
  applyCam(ctx, cam, 1); snowRoad(ctx, t);
  roadSign(ctx, 820, 1300, 1.0, 'YAHK');
  const sx = lt < sign ? lerp(-500, 1700, lt / 1.6) : 330;
  if (lt < 1.6) { snowmobile(ctx, sx, 1420, .9, t); for (let i = 0; i < 5; i++) puff(ctx, sx - 330 - i * 60, 1440, 40 + i * 6, t, '#fff', i, .8 - i * .15); }
  else {
    const look = lt > dbl ? 1 : (lt > sign ? .6 : 0);
    person(ctx, KYLE, { x: 330, y: 1880, s: 600, face: { eyes: lt > dbl ? 'wide' : 'normal', look: [look, -.5], mouth: lt > dbl ? 'o' : 'smile', browUp: lt > dbl ? 1 : 0 }, arms: { L: [.3, -.1], R: [.3, -.1] } });
    if (lt > dbl) { const w = Math.sin((lt - dbl) * 30) * 10 * clamp(1 - (lt - dbl) * 2); ctx.save(); ctx.translate(w, 0); ctx.restore(); }
  }
} });
// 7 Escalation (Day): a box truck, a studio microphone, an apartment key, then a long-haired rock-star silhouette waving
SHOTS.push({ start: 19.44, end: 23.76, tr: 'cut', draw(ctx, lt, t) {
  const b = [0, at(20.16, 19.44), at(21.28, 19.44), at(22.72, 19.44)];
  const i = lt < b[1] ? 0 : lt < b[2] ? 1 : lt < b[3] ? 2 : 3, l2 = lt - b[i];
  const hh = handheld(t, 3); const cam = { x: 540 + hh[0], y: 960 + hh[1], z: 1.0 + l2 * .06, r: 0 };
  applyCam(ctx, cam, 1);
  const bgs = ['#9fd0e0', '#2a2630', '#e8dcc0', '#3a1f5c']; ctx.fillStyle = bgs[i]; ctx.fillRect(-900, -900, 2900, 3200);
  const pop = backOut(clamp(l2 * 4));
  ctx.save(); ctx.translate(540, 900); ctx.scale(pop, pop);
  if (i === 0) { ctx.fillStyle = '#9a8f80'; ctx.fillRect(-1500, 120, 3000, 900); boxTruck(ctx, 40, 140, 1.4); }
  else if (i === 1) { studioMic(ctx, 0, 0, 1.5); }
  else if (i === 2) { houseKey(ctx, 0, 0, 3.2, -.3); }
  else { ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let k = 0; k < 3; k++) { const g = ctx.createRadialGradient(-300 + k * 300, -900, 10, -300 + k * 300, 200, 700); g.addColorStop(0, 'rgba(255,200,255,.35)'); g.addColorStop(1, 'rgba(255,200,255,0)'); ctx.fillStyle = g; ctx.fillRect(-900, -1000, 1800, 1400); } ctx.restore(); rocker(ctx, 0, 300, 700, t); }
  ctx.restore();
} });
// 8 Snow globe (Day): Kyle holds up the snow globe; the camera snap-zooms onto it
SHOTS.push({ start: 23.76, end: 27.04, tr: 'cut', draw(ctx, lt, t) {
  const zoom = at(25.8, 23.76);
  const hh = handheld(t, 3); const z = kf(lt, [[0, 1.0], [zoom, 1.0], [zoom + .12, 1.9]]);
  const cam = { x: lerp(540, 600, clamp((lt - zoom) * 8)) + hh[0], y: lerp(1000, 700, clamp((lt - zoom) * 8)) + hh[1], z, r: 0 };
  applyCam(ctx, cam, 1); room(ctx, 'day', 0, '#e8dcc0');
  person(ctx, KYLE, { x: 420, y: 2080, s: 700, face: { eyes: 'happy', mouth: 'grin' }, arms: { L: [.3, -.1], R: { ik: [.25, -1.05] } } });
  snowGlobe(ctx, 420 + .25 * 700, 2080 - 1.05 * 700 - 140, .75, t, { motor: true, base: '#1d1a22' });
} });
// 9 Mystery (Day): a question mark pops over the snow globe
SHOTS.push({ start: 27.04, end: 28.88, tr: 'fade', draw(ctx, lt, t) {
  const hh = handheld(t, 2); const cam = { x: 540 + hh[0], y: 880 + hh[1], z: 1.0 + lt * .05, r: 0 };
  applyCam(ctx, cam, 1); ctx.fillStyle = '#d9e8f0'; ctx.fillRect(-900, -900, 2900, 3200);
  snowGlobe(ctx, 540, 960, 1.7, t, { motor: true, base: '#1d1a22' });
  const k = backOut(clamp(lt * 4)); ctx.save(); ctx.translate(540, 420); ctx.scale(k, k); ctx.rotate(Math.sin(t * 5) * .08); text(ctx, '?', 0, 0, 300, '#ffd23a', INK, 22, 'Poppins', 700); ctx.restore();
} });
// 10 You see / share moment (Golden): a friend's shelf of odd knick-knacks; a collector spots one and his eyes light up
SHOTS.push({ start: 28.88, end: 34.16, tr: 'fade', draw(ctx, lt, t) {
  const spot = at(32.5, 28.88);
  const hh = handheld(t, 2); const cam = { x: 540 + hh[0], y: 900 + hh[1], z: 1.0 + lt * .025, r: 0 };
  applyCam(ctx, cam, 1); room(ctx, 'golden', 0, '#f0d6b0');
  for (const sy of [430, 700, 970]) shelf(ctx, 540, sy, 900);
  // odd knick-knacks
  doorknob(ctx, 220, 400, .5); fishPen(ctx, 470, 400, .45, -.2); snowGlobe(ctx, 760, 395, .32, t, {}); campStove(ctx, 300, 690, .45); keg(ctx, 600, 700, .4); paperclip(ctx, 820, 640, .6, .5);
  for (let i = 0; i < 5; i++) { circle(ctx, 180 + i * 150, 930, 30 + (i % 2) * 10); fillStroke(ctx, ['#e0392f', '#ffd23a', '#3fa35b', '#2f63c9', '#c86a8a'][i], 6); }
  const lit = lt > spot;
  person(ctx, PEOPLE[0], { x: 220, y: 1900, s: 600, face: { eyes: 'half', look: [.6, -.6], mouth: 'flat' }, arms: { L: [.3, -.1], R: [.3, -.1] } });
  person(ctx, PEOPLE[4], { x: 830, y: 1900, s: 600, flip: -1, face: { eyes: lit ? 'wide' : 'normal', look: [.8, -1], mouth: lit ? 'grin' : 'flat', browUp: lit ? 1 : 0 }, arms: lit ? { L: [.3, -.1], R: { ik: [.3, -1.1] } } : { L: [.3, -.1], R: [.3, -.1] } });
  if (lit) { for (const sd of [-1, 1]) sparkle(ctx, 830 + sd * 55, 1900 - .77 * 600, 46, clamp((lt - spot) * 3)); glowDisk(ctx, 760, 360, 160, .5 * clamp((lt - spot) * 3)); }
  goldenGrade(ctx);
} });
function glowDisk(ctx, x, y, r, a) { if (a <= 0) return; ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(255,230,150,${a})`); g.addColorStop(1, 'rgba(255,230,150,0)'); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore(); }
// 11 Twist (Golden): an actor in a room lined with snow globes beams and hands over a film script
SHOTS.push({ start: 34.16, end: 38.32, tr: 'fade', draw(ctx, lt, t) {
  const give = at(36.88, 34.16);
  const hh = handheld(t, 2); const cam = { x: 540 + hh[0], y: 960 + hh[1], z: 1.0 + lt * .03, r: 0 };
  applyCam(ctx, cam, 1); room(ctx, 'golden', 0, '#6a3a4a');
  for (const sy of [380, 700]) { shelf(ctx, 540, sy, 1000); for (let i = 0; i < 6; i++) snowGlobe(ctx, 120 + i * 168, sy - 10, .3, t + i, { base: ['#2a2630', '#7a4a2a', '#2a3f8f'][i % 3], inside: i % 2 ? 'house' : 'dance' }); }
  person(ctx, ACTOR, { x: 700, y: 2030, s: 680, flip: -1, face: { eyes: 'happy', mouth: 'grin' }, arms: lt > give ? holdOut : { L: [.3, -.1], R: [.9, -2.1] } });
  person(ctx, KYLE, { x: 220, y: 2030, s: 600, face: { eyes: lt > give ? 'wide' : 'normal', look: [.8, -.2], mouth: lt > give ? 'o' : 'smile' }, arms: { L: [.3, -.1], R: [.3, -.1] } });
  if (lt > give) { const k = easeOut(clamp((lt - give) * 2)); const sx = lerp(700 - .4 * 680, 470, k), sy = 2030 - .62 * 680 - 40; ctx.save(); ctx.translate(sx, sy); ctx.rotate(-.1); rrect(ctx, -70, -95, 140, 190, 6); fillStroke(ctx, '#fbf8f0', 6); for (let i = 0; i < 6; i++) line(ctx, -45, -55 + i * 24, 45 - (i % 3) * 15, -55 + i * 24, 5, '#b9b2a8'); ctx.restore(); }
  goldenGrade(ctx);
} });
// 12 Offer (Day): a small prairie town council raises hands; a two-storey house appears with a giant bow
SHOTS.push({ start: 38.32, end: 41.92, tr: 'fade', draw(ctx, lt, t) {
  const house = at(40.5, 38.32);
  const hh = handheld(t, 2); const cam = { x: 540 + hh[0], y: 960 + hh[1], z: 1.0 + lt * .03, r: 0 };
  applyCam(ctx, cam, 1); prairieTown(ctx, 'day', t);
  if (lt < house) {
    rrect(ctx, 80, 1500, 920, 80, 10); fillStroke(ctx, '#8a5a32', 8);
    for (let i = 0; i < 5; i++) { const up = clamp((lt - .5 - i * .12) * 4); person(ctx, PEOPLE[i], { x: 160 + i * 190, y: 1880, s: 420, face: { eyes: 'normal', mouth: 'smile' }, arms: { L: [.3, -.1], R: up > 0 ? [lerp(.3, 2.8, up), .1] : [.3, -.1] } }); }
  } else drawHouse(ctx, 540, 1150, .95, (lt - house) * 2.5);
} });
// 13 Snap (Day): keys change hands on a porch; a counter on the wall clicks to 14
SHOTS.push({ start: 41.92, end: 43.52, tr: 'fade', draw(ctx, lt, t) {
  const hh = handheld(t, 2); const cam = { x: 540 + hh[0], y: 960 + hh[1], z: 1.0 + lt * .05, r: 0 };
  applyCam(ctx, cam, 1); doorstep(ctx, 'day', t);
  const n = Math.min(14, 10 + Math.floor(lt * 6)); const flip = (lt * 6) % 1;
  rrect(ctx, 180, 300, 300, 230, 16); fillStroke(ctx, '#1d1a22', 9); ctx.save(); ctx.translate(330, 415); if (n < 14) ctx.scale(1, Math.max(.05, Math.abs(Math.cos(flip * Math.PI)))); text(ctx, String(n), 0, 0, 150, '#ffd23a', INK, 0, 'Poppins', 700); ctx.restore();
  const s = 560, k = easeOut(clamp((lt - .5) / .6));
  person(ctx, KYLE, { x: 220, y: 1880, s, face: { eyes: 'happy', mouth: 'grin' }, arms: holdOut });
  person(ctx, PEOPLE[4], { x: 860, y: 1880, s, flip: -1, face: { eyes: 'normal', mouth: 'smile' }, arms: holdOut });
  houseKey(ctx, lerp(860 - .42 * s, 220 + .42 * s, k), 1880 - .62 * s - Math.sin(k * Math.PI) * 100, 1.2, k * 3);
} });
// 14 Consequence (Golden): a local resident on a film set; then a giant red paperclip rises in a park
SHOTS.push({ start: 43.52, end: 47.76, tr: 'cut', draw(ctx, lt, t) {
  const rise = at(45.3, 43.52);
  const hh = handheld(t, 2); const cam = { x: 540 + hh[0], y: 960 + hh[1], z: 1.0 + lt * .03, r: 0 };
  applyCam(ctx, cam, 1);
  if (lt < rise) {
    room(ctx, 'golden', 0, '#3a3440');
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(540, 900, 50, 540, 1000, 700); g.addColorStop(0, 'rgba(255,240,200,.45)'); g.addColorStop(1, 'rgba(255,240,200,0)'); ctx.fillStyle = g; ctx.fillRect(-200, 200, 1500, 1600); ctx.restore();
    person(ctx, PEOPLE[2], { x: 540, y: 2000, s: 640, face: { eyes: 'happy', mouth: 'grin' }, arms: POSE.handsUp.arms });
    // camera and clapperboard
    rrect(ctx, 820, 480, 200, 130, 14); fillStroke(ctx, '#2a2630', 8); circle(ctx, 820, 545, 50); fillStroke(ctx, '#5a5560', 7); line(ctx, 920, 610, 920, 900, 12);
    rrect(ctx, 80, 500, 220, 150, 8); fillStroke(ctx, '#2a2630', 8); ctx.save(); ctx.translate(80, 500); ctx.rotate(-.25 * Math.max(0, Math.sin(lt * 4))); rrect(ctx, 0, -40, 220, 40, 6); fillStroke(ctx, '#f6f2ea', 7); ctx.restore();
  } else {
    park(ctx, 'golden', t);
    const k = easeOut(clamp((lt - rise) / 1.2));
    paperclip(ctx, 540, lerp(1500, 760, k), 4.5, .1);
    for (let i = 0; i < 4; i++) drawStick(ctx, { x: 150 + i * 260, y: 1880, s: 300, cols: PEOPLE[i].cols, hat: 'none', belt: false, face: { eyes: 'wide', mouth: 'o', look: [0, -1] } });
  }
  goldenGrade(ctx);
} });
// 15 Debate moment (Golden): a scoreboard flips to KYLE 1, KIPLING 2 as tourists snap photos of the giant paperclip
SHOTS.push({ start: 47.76, end: 53.28, tr: 'fade', draw(ctx, lt, t) {
  const kyle = at(49.4, 47.76), kip = at(48.3, 47.76), photos = at(51.7, 47.76);
  const hh = handheld(t, 2); const cam = { x: 540 + hh[0], y: 960 + hh[1], z: 1.0 + lt * .02, r: 0 };
  applyCam(ctx, cam, 1); park(ctx, 'golden', t);
  paperclip(ctx, 700, 900, 3.6, .1);
  scoreboard(ctx, 330, 480, .8, [clamp((lt - kyle) * 4), clamp((lt - kip) * 4)], t);
  for (let i = 0; i < 4; i++) { const x = 120 + i * 250; drawStick(ctx, { x, y: 1880, s: 380, cols: PEOPLE[i].cols, hat: 'none', belt: false, face: { eyes: 'happy', mouth: 'grin' }, arms: { L: { ik: [-.05, -.75] }, R: { ik: [.05, -.75] } } }); camera(ctx, x, 1880 - .75 * 380 - 10, .6, lt > photos ? clamp(1 - (((lt - photos) * 2.5 + i * .37) % 1) * 4) : 0); }
  goldenGrade(ctx);
} });
// 16 Callback (Golden): tilt down from the giant paperclip to a tiny paperclip on a desk
SHOTS.push({ start: 53.28, end: 55.25, tr: 'cut', draw(ctx, lt, t) {
  const k = ease(clamp(lt / 1.0));
  const cam = { x: 540, y: lerp(-700, 1100, k), z: 1.0, r: 0 };
  applyCam(ctx, cam, 1);
  sky(ctx, 'golden'); paperclip(ctx, 540, -700, 4.5, .1);
  ctx.fillStyle = '#7fc06a'; ctx.fillRect(-900, -200, 2900, 600);
  ctx.fillStyle = '#e8dcc0'; ctx.fillRect(-900, 300, 2900, 900);
  desk(ctx, 1150); paperclip(ctx, 540, 1080, .8, 1.3);
  goldenGrade(ctx);
} });
