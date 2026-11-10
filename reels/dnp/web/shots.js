// Gym Diet Files #3: stills only. Each shot shows one still and moves across it about 8%, with easing.
// Shots change on the word where their line starts (two long lines get a second, closer still).
const PLAN = [
  // [start, still, move, framing {x, y, z} for a closer still]
  [0.00, 'hook', 'in', { x: 540, y: 1160, z: 1 }], [4.00, 'stakes', 'right', { x: 540, y: 1180, z: 1 }], [5.68, 'goal', 'in'], [7.84, 'online', 'in'], [10.24, 'twodays', 'left', { x: 540, y: 780, z: 1 }],
  [12.16, 'share', 'right', { x: 540, y: 1240, z: 1 }], [15.04, 'tox', 'out'], [17.76, 'mystery', 'in'], [19.36, 'yousee1', 'out', { x: 540, y: 1400, z: 1 }],
  [22.72, 'yousee1', 'in', { x: 760, y: 1000, z: 1.5 }], [25.28, 'stove', 'in'], [28.64, 'stove', 'in', { x: 760, y: 860, z: 1.8 }],
  [31.04, 'history', 'right', { x: 540, y: 1160, z: 1 }], [34.96, 'letter', 'in', { x: 540, y: 1260, z: 1 }], [38.56, 'coroner', 'out', { x: 540, y: 1210, z: 1 }], [42.56, 'coroner', 'in', { x: 540, y: 1180, z: 1.7 }],
  [45.60, 'debate', 'left'], [47.76, 'callback', 'out'],
];
const END = 49.725 + 0.1;
const SHOTS = [];
PLAN.forEach(([start, name, move, frame], i) => {
  const end = i + 1 < PLAN.length ? PLAN[i + 1][0] : END;
  SHOTS.push({ start, end, tr: 'fade', still: name, draw(ctx, lt) {
    const k = ease(clamp(lt / (end - start)));
    let z = 1.04, dx = 0;
    if (move === 'in') z = lerp(1.0, 1.08, k); else if (move === 'out') z = lerp(1.08, 1.0, k);
    else { z = 1.09; dx = (move === 'right' ? 1 : -1) * lerp(-40, 40, k); }
    const f = frame || { x: 540, y: 960, z: 1 };
    ctx.save(); ctx.filter = 'saturate(0.72) contrast(1.08)';
    applyCam(ctx, { x: f.x + dx / f.z, y: f.y, z: z * f.z, r: 0 }, 1);
    STILLS[name](ctx);
    ctx.restore(); ctx.filter = 'none';
    grade(ctx);
  } });
});
