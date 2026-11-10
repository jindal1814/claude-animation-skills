// ---------- Gym Diet Files #3: the stills. Each is drawn once, with no motion of its own: only the camera moves. ----------
// Dark and low-key: Night (cold blue moonlight, fog) and Lamp (dark interior, one warm practical light).
const AMBER = '#ffb45a', TEAL = '#1f5f6a';
function glow(ctx, x, y, r, col, a) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore(); }
function shade(ctx, col, a) { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.fillRect(-900, -900, 2900, 3800); ctx.restore(); }
function night(ctx) { const g = ctx.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#0a1420'); g.addColorStop(1, '#101c28'); ctx.fillStyle = g; ctx.fillRect(-900, -900, 2900, 3800); }
function lampRoom(ctx, wall = '#1a1210') { ctx.fillStyle = wall; ctx.fillRect(-900, -900, 2900, 3800); }
function fog(ctx, a = .1, y0 = 900) { ctx.save(); const g = ctx.createLinearGradient(0, y0, 0, y0 + 900); g.addColorStop(0, `rgba(150,175,190,0)`); g.addColorStop(.5, `rgba(150,175,190,${a})`); g.addColorStop(1, `rgba(150,175,190,0)`); ctx.fillStyle = g; ctx.fillRect(-900, y0, 2900, 900); ctx.restore(); }
function label(ctx, str, x, y, size, col = '#e8e2d2', rot = 0, font = 'Poppins') { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); text(ctx, str, 0, 0, size, col, INK, 0, font, 700); ctx.restore(); }

// a plain plastic tub with a generic label (FAT BURNER, or INDUSTRIAL CHEMICAL, or half peeled)
function jar(ctx, x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ellipse(ctx, 0, 6, 150, 26); ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.fill();
  rrect(ctx, -130, -320, 260, 320, 30); fillStroke(ctx, '#d8d4cc', 8);
  if (o.level != null) { ctx.save(); rrect(ctx, -126, -316, 252, 312, 28); ctx.clip(); ctx.fillStyle = 'rgba(240,220,150,.35)'; ctx.fillRect(-130, -320 * o.level, 260, 320); ctx.restore(); }
  rrect(ctx, -140, -380, 280, 70, 16); fillStroke(ctx, '#2a2a30', 8);
  const lab = o.label || 'FAT BURNER';
  if (lab === 'PEELED') {
    rrect(ctx, -130, -250, 260, 150, 4); fillStroke(ctx, '#c22a2a', 6);
    ctx.save(); rrect(ctx, -130, -250, 260, 150, 4); ctx.clip(); text(ctx, 'FAT', -40, -200, 50, '#fff', INK, 0, 'Poppins', 700); text(ctx, 'BURNER', -10, -145, 50, '#fff', INK, 0, 'Poppins', 700); ctx.restore();
    // the peeled corner curls away, showing bare plastic and the edge of other printing beneath
    path(ctx, [[40, -250], [130, -250], [130, -100], [60, -110]]); fillStroke(ctx, '#d8d4cc', 5);
    ctx.save(); path(ctx, [[40, -250], [130, -250], [130, -100], [60, -110]]); ctx.clip(); text(ctx, 'IND', 95, -175, 40, '#7a2a2a', INK, 0, 'Poppins', 700); ctx.restore();
    ctx.beginPath(); ctx.moveTo(40, -250); ctx.quadraticCurveTo(170, -230, 200, -120); ctx.quadraticCurveTo(120, -120, 60, -110); ctx.closePath(); fillStroke(ctx, '#e8e2d8', 5);
  } else {
    const red = lab === 'FAT BURNER';
    rrect(ctx, -130, -250, 260, 150, 4); fillStroke(ctx, red ? '#c22a2a' : '#f2c230', 6);
    if (red) { text(ctx, 'FAT', 0, -200, 50, '#fff', INK, 0, 'Poppins', 700); text(ctx, 'BURNER', 0, -145, 50, '#fff', INK, 0, 'Poppins', 700); }
    else { text(ctx, 'INDUSTRIAL', 0, -200, 38, '#1d1a22', INK, 0, 'Poppins', 700); text(ctx, 'CHEMICAL', 0, -150, 38, '#1d1a22', INK, 0, 'Poppins', 700); }
  }
  ctx.restore();
}
function plainBody(ctx, o) { drawStick(ctx, Object.assign({ hat: 'none', belt: false, shadow: false }, o)); }

// ---------- the stills (each draws in 1080x1920 coordinates) ----------
const STILLS = {
  hook(ctx) { // hospital corridor at night; wall clock just past 1:00; a gym bag on a plastic chair
    night(ctx);
    path(ctx, [[0, 1920], [1080, 1920], [700, 1050], [380, 1050]]); ctx.fillStyle = '#1c2a30'; ctx.fill();
    path(ctx, [[0, 0], [380, 650], [380, 1050], [0, 1920]]); ctx.fillStyle = '#16232b'; ctx.fill();
    path(ctx, [[1080, 0], [700, 650], [700, 1050], [1080, 1920]]); ctx.fillStyle = '#132029'; ctx.fill();
    rrect(ctx, 380, 650, 320, 400, 0); ctx.fillStyle = '#0c151c'; ctx.fill();
    for (const [a, b] of [[.2, .55], [.6, .8]]) { path(ctx, [[1080 - 380 * a, 650 * a], [1080 - 380 * b, 650 * b], [1080 - 380 * b, 1050 + 870 * (1 - b)], [1080 - 380 * a, 1050 + 870 * (1 - a)]]); ctx.fillStyle = '#0e1a22'; ctx.fill(); }
    for (const k of [.15, .45]) { const y = 650 * k; glow(ctx, 540, y + 40, 260 - k * 120, '170,205,230', .35); rrect(ctx, 540 - 130 * (1 - k * .6), y, 260 * (1 - k * .6), 18, 6); ctx.fillStyle = '#cfe4f2'; ctx.fill(); }
    // wall clock, a little past 1:00
    ctx.save(); ctx.translate(200, 930); circle(ctx, 0, 0, 100); fillStroke(ctx, '#d8dde0', 8); for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; line(ctx, Math.sin(a) * 78, -Math.cos(a) * 78, Math.sin(a) * 90, -Math.cos(a) * 90, 5, '#1d1a22'); }
    line(ctx, 0, 0, Math.sin(TAU * (1.05 / 12)) * 52, -Math.cos(TAU * (1.05 / 12)) * 52, 10, '#1d1a22'); line(ctx, 0, 0, Math.sin(TAU * 4 / 60) * 78, -Math.cos(TAU * 4 / 60) * 78, 6, '#1d1a22'); circle(ctx, 0, 0, 8); ctx.fillStyle = '#c22a2a'; ctx.fill(); ctx.restore();
    // plastic chair and gym bag
    rrect(ctx, 610, 1360, 300, 30, 10); fillStroke(ctx, '#2f63c9', 7); rrect(ctx, 610, 1180, 300, 190, 18); fillStroke(ctx, '#2f63c9', 7);
    for (const lx of [630, 890]) line(ctx, lx, 1390, lx, 1560, 10, '#5a5560');
    rrect(ctx, 620, 1250, 280, 120, 50); fillStroke(ctx, '#2a2a30', 7); ctx.beginPath(); ctx.arc(760, 1260, 70, Math.PI, 0); ctx.lineWidth = 12; ctx.strokeStyle = '#2a2a30'; ctx.stroke(); line(ctx, 640, 1300, 880, 1300, 5, '#5a5560');
    fog(ctx, .12, 1000);
  },
  stakes(ctx) { // dark office: a file marked DNP PURCHASE in an out-tray under one desk lamp
    lampRoom(ctx, '#140f0c');
    ctx.fillStyle = '#2a1c14'; ctx.fillRect(-900, 1150, 2900, 1400); line(ctx, -900, 1150, 2000, 1150, 8, INK);
    glow(ctx, 640, 1080, 620, '255,180,90', .45);
    // lamp
    line(ctx, 880, 1150, 830, 760, 14, '#3a3a40'); line(ctx, 830, 760, 700, 700, 14, '#3a3a40'); path(ctx, [[600, 640], [780, 660], [740, 760], [620, 740]]); fillStroke(ctx, '#2a4a3a', 7); glow(ctx, 680, 760, 200, '255,210,140', .6);
    // tray + file
    path(ctx, [[260, 1200], [820, 1200], [860, 1330], [220, 1330]]); fillStroke(ctx, '#3a3a40', 7);
    path(ctx, [[300, 1150], [780, 1150], [800, 1270], [280, 1270]]); fillStroke(ctx, '#d8b878', 6);
    rrect(ctx, 420, 1175, 260, 56, 4); fillStroke(ctx, '#f3ecd8', 4); label(ctx, 'DNP PURCHASE', 550, 1204, 32, '#1d1a22');
    for (let i = 0; i < 3; i++) { rrect(ctx, -60 + i * 40, 1100 - i * 10, 240, 60, 4); fillStroke(ctx, '#3a2a20', 5); }
  },
  goal(ctx) { // a young man at a dim gym mirror under one cold overhead light, pinching his waist
    lampRoom(ctx, '#0e1216');
    ctx.fillStyle = '#16191c'; ctx.fillRect(-900, 1450, 2900, 1400); line(ctx, -900, 1450, 2000, 1450, 8, INK);
    rrect(ctx, 520, 360, 500, 1100, 6); fillStroke(ctx, '#1a2a33', 10); // mirror
    ctx.save(); rrect(ctx, 520, 360, 500, 1100, 6); ctx.clip(); ctx.globalAlpha = .55;
    plainBody(ctx, { x: 770, y: 1520, s: 760, flip: -1, cols: ['#3a3a44', '#3a3a44'], arms: { L: { ik: [-.13, -.36] }, R: { ik: [.13, -.36] } }, face: { eyes: 'half', look: [0, .4], mouth: 'flat' } });
    ctx.restore(); ctx.save(); ctx.globalAlpha = .25; path(ctx, [[560, 380], [700, 380], [560, 700]]); ctx.fillStyle = '#cfe4f2'; ctx.fill(); ctx.restore();
    glow(ctx, 380, 300, 520, '170,205,230', .4); rrect(ctx, 280, 220, 200, 16, 6); ctx.fillStyle = '#cfe4f2'; ctx.fill();
    plainBody(ctx, { x: 330, y: 1720, s: 880, cols: ['#3a3a44', '#3a3a44'], arms: { L: { ik: [-.13, -.36] }, R: { ik: [.13, -.36] } }, face: { eyes: 'half', look: [.6, .4], mouth: 'flat' } });
    fog(ctx, .06, 1100);
  },
  online(ctx) { // a laptop glowing in a dark bedroom: a generic shop page with a jar labelled FAT BURNER
    lampRoom(ctx, '#0c0e14');
    ctx.fillStyle = '#16141c'; ctx.fillRect(-900, 1300, 2900, 1400); line(ctx, -900, 1300, 2000, 1300, 8, INK);
    glow(ctx, 540, 900, 760, '150,190,255', .35);
    rrect(ctx, 150, 520, 780, 600, 22); fillStroke(ctx, '#2a2a30', 10); rrect(ctx, 180, 550, 720, 540, 8); fillStroke(ctx, '#e8eef4', 5);
    rrect(ctx, 180, 550, 720, 60, [8, 8, 0, 0]); ctx.fillStyle = '#c9d4e2'; ctx.fill();
    jar(ctx, 380, 1020, .9);
    for (let i = 0; i < 5; i++) line(ctx, 560, 700 + i * 50, 860 - (i % 3) * 60, 700 + i * 50, 14, '#c9d4e2');
    path(ctx, [[110, 1120], [970, 1120], [1040, 1180], [40, 1180]]); fillStroke(ctx, '#3a3a40', 8);
  },
  twodays(ctx) { // a calendar with 21 and 22 crossed out, beside the half-empty jar
    lampRoom(ctx, '#17110d');
    ctx.fillStyle = '#24180f'; ctx.fillRect(-900, 1350, 2900, 1400); line(ctx, -900, 1350, 2000, 1350, 8, INK);
    glow(ctx, 760, 900, 640, '255,180,90', .4);
    rrect(ctx, 120, 330, 620, 700, 10); fillStroke(ctx, '#e8e2d2', 8); rrect(ctx, 120, 330, 620, 110, [10, 10, 0, 0]); ctx.fillStyle = '#7a2a2a'; ctx.fill();
    for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) { const d = r * 7 + c + 1; if (d > 31) continue; const x = 150 + c * 84, y = 470 + r * 108; text(ctx, String(d), x + 30, y + 30, 30, '#5a5048', INK, 0, 'Poppins', 700); if (d === 21 || d === 22) { line(ctx, x + 6, y + 4, x + 62, y + 60, 8, '#c22a2a'); line(ctx, x + 62, y + 4, x + 6, y + 60, 8, '#c22a2a'); } }
    jar(ctx, 820, 1400, .95, { level: .45 });
  },
  share(ctx) { // a locker room in shadow: one guy slips a friend an unlabelled bag of capsules
    night(ctx);
    for (let i = 0; i < 8; i++) { rrect(ctx, -60 + i * 150, 300, 140, 1150, 6); fillStroke(ctx, '#1f2a33', 6); for (let k = 0; k < 4; k++) line(ctx, -30 + i * 150, 360 + k * 20, 50 + i * 150, 360 + k * 20, 4, '#0e161c'); }
    ctx.fillStyle = '#0e151b'; ctx.fillRect(-900, 1450, 2900, 1400); line(ctx, -900, 1450, 2000, 1450, 8, INK);
    glow(ctx, 540, 1000, 520, '170,205,230', .25);
    plainBody(ctx, { x: 270, y: 1880, s: 780, cols: ['#2a3a48', '#2a3a48'], arms: { L: [.3, -.1], R: { ik: [.42, -.55] } }, face: { eyes: 'half', look: [.8, .2], mouth: 'flat' } });
    plainBody(ctx, { x: 820, y: 1880, s: 760, flip: -1, cols: ['#3a2a30', '#3a2a30'], arms: { L: [.3, -.1], R: { ik: [.42, -.55] } }, face: { eyes: 'normal', look: [.8, .3], mouth: 'flat' } });
    ctx.save(); ctx.translate(560, 1430); rrect(ctx, -60, -40, 120, 80, 12); ctx.fillStyle = 'rgba(230,240,245,.55)'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = INK; ctx.stroke(); for (let i = 0; i < 6; i++) { ellipse(ctx, -35 + (i % 3) * 35, -10 + Math.floor(i / 3) * 25, 14, 8, .4); fillStroke(ctx, '#f2e6c8', 3); } ctx.restore();
    fog(ctx, .07, 1100);
  },
  tox(ctx) { // ambulance light washing over an empty, wet street at night
    night(ctx);
    for (let i = 0; i < 5; i++) { rrect(ctx, -100 + i * 260, 300 + (i % 2) * 120, 230, 900, 0); ctx.fillStyle = '#0d1820'; ctx.fill(); for (let k = 0; k < 6; k++) if ((i + k) % 3 === 0) { rrect(ctx, -60 + i * 260, 380 + k * 120 + (i % 2) * 120, 60, 70, 4); ctx.fillStyle = '#2a3a3a'; ctx.fill(); } }
    ctx.fillStyle = '#121c24'; ctx.fillRect(-900, 1200, 2900, 1400); line(ctx, -900, 1200, 2000, 1200, 6, INK);
    for (let i = 0; i < 4; i++) { rrect(ctx, 480, 1260 + i * 170, 120, 24 + i * 6, 6); ctx.fillStyle = 'rgba(200,210,220,.25)'; ctx.fill(); }
    glow(ctx, 160, 1100, 700, '255,40,40', .4); glow(ctx, 960, 1050, 700, '40,90,255', .45);
    for (const [x, c] of [[250, '255,60,60'], [780, '60,120,255']]) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ellipse(ctx, x, 1600, 220, 40); ctx.fillStyle = `rgba(${c},.25)`; ctx.fill(); ctx.restore(); }
    fog(ctx, .12, 900);
  },
  mystery(ctx) { // close on the jar, its FAT BURNER label half peeled away
    lampRoom(ctx, '#140f0c'); ctx.fillStyle = '#20160f'; ctx.fillRect(-900, 1420, 2900, 1400); line(ctx, -900, 1420, 2000, 1420, 8, INK);
    glow(ctx, 640, 900, 700, '255,180,90', .45);
    jar(ctx, 540, 1460, 2.2, { label: 'PEELED' });
  },
  yousee1(ctx) { // the jar now reads INDUSTRIAL CHEMICAL; dye vats, fertiliser sacks and an explosives crate behind it in a dark warehouse
    night(ctx);
    for (let i = 0; i < 6; i++) line(ctx, -100 + i * 260, 0, -100 + i * 260, 1300, 16, '#0d161d');
    for (let i = 0; i < 4; i++) glow(ctx, 100 + i * 300, 120, 300, '170,205,230', .18);
    ctx.fillStyle = '#121a20'; ctx.fillRect(-900, 1300, 2900, 1400); line(ctx, -900, 1300, 2000, 1300, 8, INK);
    for (const [x, col] of [[120, '#3a6aa8'], [330, '#a83a6a']]) { rrect(ctx, x - 90, 760, 180, 520, 14); fillStroke(ctx, '#4a5258', 7); ellipse(ctx, x, 760, 90, 24); ctx.fillStyle = col; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke(); }
    for (let i = 0; i < 5; i++) { const x = 560 + (i % 3) * 140, y = 1290 - Math.floor(i / 3) * 110; rrect(ctx, x - 65, y - 110, 130, 110, 24); fillStroke(ctx, '#8a7a5a', 6); }
    rrect(ctx, 820, 1050, 230, 240, 6); fillStroke(ctx, '#5a4428', 7); for (let k = 0; k < 3; k++) line(ctx, 820, 1100 + k * 70, 1050, 1100 + k * 70, 5, '#3a2c1a');
    ctx.save(); ctx.translate(935, 1150); ctx.rotate(Math.PI / 4); rrect(ctx, -50, -50, 100, 100, 6); fillStroke(ctx, '#e0752a', 6); ctx.restore();
    ctx.save(); ctx.translate(935, 1150); ctx.beginPath(); ctx.moveTo(0, -38); ctx.quadraticCurveTo(25, -5, 10, 25); ctx.quadraticCurveTo(0, 5, -10, 25); ctx.quadraticCurveTo(-25, -5, 0, -38); ctx.fillStyle = '#1d1a22'; ctx.fill(); ctx.restore();
    glow(ctx, 540, 1350, 520, '255,180,90', .4);
    jar(ctx, 540, 1640, 1.25, { label: 'INDUSTRIAL CHEMICAL' });
    fog(ctx, .1, 900);
  },
  stove(ctx) { // an old stove glowing red, every dial jammed on full and the off switch missing
    lampRoom(ctx, '#140c0a'); ctx.fillStyle = '#1e140e'; ctx.fillRect(-900, 1500, 2900, 1400);
    rrect(ctx, 140, 700, 800, 820, 20); fillStroke(ctx, '#3a3434', 9);
    for (const [x, y] of [[300, 700], [780, 700]]) { ellipse(ctx, x, y - 10, 170, 40); fillStroke(ctx, '#2a2424', 7); glow(ctx, x, y - 20, 260, '255,70,30', .65); ellipse(ctx, x, y - 10, 130, 28); ctx.lineWidth = 12; ctx.strokeStyle = '#ff5a2a'; ctx.stroke(); }
    rrect(ctx, 180, 780, 720, 150, 12); fillStroke(ctx, '#2a2424', 7);
    for (let i = 0; i < 4; i++) { const x = 270 + i * 150, y = 855; circle(ctx, x, y, 48); fillStroke(ctx, '#d8d4cc', 6); line(ctx, x, y, x + 34, y - 30, 10, '#c22a2a'); for (let k = 0; k < 5; k++) { const a = -2.6 + k * .55; line(ctx, x + Math.cos(a) * 58, y + Math.sin(a) * 58, x + Math.cos(a) * 66, y + Math.sin(a) * 66, 4, '#e8e2d8'); } }
    circle(ctx, 860, 855, 26); ctx.fillStyle = '#0a0606'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = '#5a5050'; ctx.stroke(); // the empty hole where the off switch was
    rrect(ctx, 220, 990, 640, 420, 14); fillStroke(ctx, '#2a2424', 7); rrect(ctx, 290, 1060, 500, 280, 10); ctx.fillStyle = '#ff6a2a'; ctx.fill(); glow(ctx, 540, 1200, 480, '255,90,30', .6);
  },
  history(ctx) { // a dim 1930s doctor's office in sepia; a medicine bottle stamped BANNED 1938
    ctx.fillStyle = '#3a2c1e'; ctx.fillRect(-900, -900, 2900, 3800);
    rrect(ctx, 80, 380, 340, 860, 6); fillStroke(ctx, '#4a3826', 8); for (let k = 0; k < 4; k++) { line(ctx, 100, 560 + k * 170, 400, 560 + k * 170, 6, '#2a2016'); for (let j = 0; j < 4; j++) { rrect(ctx, 120 + j * 70, 470 + k * 170, 40, 90, 6); fillStroke(ctx, '#7a6448', 4); } }
    rrect(ctx, 600, 420, 320, 260, 8); fillStroke(ctx, '#5a4632', 8); rrect(ctx, 630, 450, 260, 200, 4); ctx.fillStyle = '#8a7656'; ctx.fill(); // framed certificate, blank
    ctx.fillStyle = '#4a3624'; ctx.fillRect(-900, 1250, 2900, 1400); line(ctx, -900, 1250, 2000, 1250, 8, INK);
    glow(ctx, 640, 1060, 520, '255,210,150', .35);
    ctx.save(); ctx.translate(640, 1240); rrect(ctx, -90, -300, 180, 300, 20); fillStroke(ctx, '#5a3a20', 8); rrect(ctx, -40, -380, 80, 90, 10); fillStroke(ctx, '#3a2414', 7); rrect(ctx, -82, -230, 164, 140, 6); fillStroke(ctx, '#e8d8b0', 5); ctx.rotate(-.12); rrect(ctx, -120, -205, 240, 84, 8); ctx.fillStyle = '#e8d8b0'; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = '#a8322a'; ctx.stroke(); text(ctx, 'BANNED 1938', 0, -162, 36, '#a8322a', INK, 0, 'Poppins', 700); ctx.restore();
  },
  letter(ctx) { // the DNP PURCHASE file, stamped LATE, in a dark sorting room
    night(ctx);
    for (let r = 0; r < 7; r++) for (let c = 0; c < 6; c++) { rrect(ctx, 40 + c * 170, 200 + r * 140, 160, 130, 4); ctx.fillStyle = '#0e171e'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = '#1e2a33'; ctx.stroke(); if ((r * 3 + c) % 4 === 0) { rrect(ctx, 60 + c * 170, 260 + r * 140, 120, 50, 3); ctx.fillStyle = '#5a5a60'; ctx.fill(); } }
    ctx.fillStyle = '#121a20'; ctx.fillRect(-900, 1250, 2900, 1400);
    glow(ctx, 540, 1320, 520, '200,220,240', .3);
    ctx.save(); ctx.translate(540, 1330); ctx.rotate(-.05); path(ctx, [[-300, -140], [300, -140], [320, 140], [-320, 140]]); fillStroke(ctx, '#d8b878', 7); rrect(ctx, -170, -110, 340, 60, 4); fillStroke(ctx, '#f3ecd8', 4); text(ctx, 'DNP PURCHASE', 0, -80, 36, '#1d1a22', INK, 0, 'Poppins', 700);
    ctx.rotate(-.18); rrect(ctx, -120, -10, 240, 100, 10); ctx.lineWidth = 10; ctx.strokeStyle = '#c22a2a'; ctx.stroke(); text(ctx, 'LATE', 0, 42, 70, '#c22a2a', INK, 0, 'Poppins', 700); ctx.restore();
  },
  coroner(ctx) { // a courtroom in shadow; a document under a lamp reads NEVER FOR HUMAN CONSUMPTION
    lampRoom(ctx, '#120d0b');
    for (let i = 0; i < 7; i++) { rrect(ctx, -40 + i * 170, 200, 140, 900, 6); ctx.fillStyle = '#1a120e'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = '#24180f'; ctx.stroke(); }
    rrect(ctx, -100, 1050, 1280, 500, 8); fillStroke(ctx, '#2a1a10', 8); // the bench
    line(ctx, 860, 1050, 860, 780, 12, '#3a3a40'); path(ctx, [[760, 720], [940, 740], [910, 820], [780, 810]]); fillStroke(ctx, '#2a4a3a', 6); glow(ctx, 600, 1060, 560, '255,190,110', .55);
    ctx.save(); ctx.translate(540, 1170); ctx.rotate(.03); rrect(ctx, -300, -100, 600, 240, 4); fillStroke(ctx, '#f3ecd8', 5); for (let i = 0; i < 2; i++) line(ctx, -250, -60 + i * 26, 250, -60 + i * 26, 5, '#c9b896');
    text(ctx, 'NEVER FOR HUMAN', 0, 20, 46, '#1d1a22', INK, 0, 'Poppins', 700); text(ctx, 'CONSUMPTION', 0, 78, 46, '#1d1a22', INK, 0, 'Poppins', 700); ctx.restore();
  },
  debate(ctx) { // split: a glowing online BUY button on one side, a police evidence bag on the other
    night(ctx);
    rrect(ctx, 0, 0, 540, 1920, 0); ctx.fillStyle = '#0c1220'; ctx.fill(); glow(ctx, 270, 960, 460, '120,200,140', .35);
    rrect(ctx, 70, 860, 400, 160, 80); fillStroke(ctx, '#3fa35b', 8); text(ctx, 'BUY', 270, 942, 84, '#fff', INK, 0, 'Poppins', 700);
    rrect(ctx, 540, 0, 540, 1920, 0); ctx.fillStyle = '#140e0e'; ctx.fill(); glow(ctx, 810, 960, 460, '255,180,120', .25);
    ctx.save(); ctx.translate(810, 980); ctx.rotate(.06); rrect(ctx, -170, -260, 340, 520, 12); ctx.fillStyle = 'rgba(220,230,240,.28)'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = '#d8dde0'; ctx.stroke();
    ctx.fillStyle = '#c22a2a'; ctx.fillRect(-170, -260, 340, 46); rrect(ctx, -120, -170, 240, 140, 6); fillStroke(ctx, '#f3ecd8', 4); for (let i = 0; i < 4; i++) line(ctx, -100, -140 + i * 28, 100, -140 + i * 28, 4, '#b9b2a8');
    for (let i = 0; i < 7; i++) { ellipse(ctx, -60 + (i % 4) * 40, 90 + Math.floor(i / 4) * 40, 16, 9, .5); fillStroke(ctx, '#f2e6c8', 3); } ctx.restore();
    line(ctx, 540, 0, 540, 1920, 8, '#000');
  },
  callback(ctx) { // the jar alone on a dark shelf
    night(ctx);
    rrect(ctx, 120, 1150, 840, 40, 6); fillStroke(ctx, '#2a2420', 7); line(ctx, 200, 1190, 200, 1260, 12, '#2a2420'); line(ctx, 880, 1190, 880, 1260, 12, '#2a2420');
    glow(ctx, 540, 900, 520, '170,205,230', .22);
    jar(ctx, 540, 1150, 1.0);
    fog(ctx, .12, 900);
  },
};
// the grade over every still: desaturate, teal shadows / amber highlights, haze, heavy vignette
function grade(ctx) {
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = 'soft-light'; ctx.globalAlpha = .45; ctx.fillStyle = TEAL; ctx.fillRect(0, 0, W, H);
  ctx.globalCompositeOperation = 'soft-light'; ctx.globalAlpha = .18; ctx.fillStyle = AMBER; ctx.fillRect(0, 0, W, H);
  ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
  const g = ctx.createRadialGradient(540, 900, 380, 540, 960, 1250); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.78)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.restore();
}
