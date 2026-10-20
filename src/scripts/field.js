// Hero background: a field of triangles that fly into place on load,
// then scatter around the pointer and fall back into the grid behind it.

// Shades of the palette blue, from deep to light.
const COLORS = ['#1f3f99', '#2357d6', '#4a78e4', '#7b9ff0', '#a9c0f5'].map((hex) => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
]);
const INK = '20, 24, 46';

const hash = (a, b) => {
  const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export function startField(canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hover = matchMedia('(hover: hover)').matches;
  const born = performance.now();
  const pointer = { x: -1e4, y: -1e4, seen: -1e4 };
  let W = 0;
  let H = 0;
  let dpr = 1;
  let tris = [];
  let raf = 0;
  let visible = true;
  let built = false;

  function build() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = rect.width;
    H = rect.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    const side = W < 640 ? 40 : 56;
    const h = (side * Math.sqrt(3)) / 2;
    const intro = !built && !reduce;
    tris = [];
    for (let r = -1; r * h < H + h; r++) {
      for (let c = -2; (c * side) / 2 < W + side; c++) {
        const up = ((r + c) % 2 + 2) % 2 === 0;
        const cx = (c * side) / 2;
        const cy = r * h + (up ? (2 * h) / 3 : h / 3);
        const rnd = hash(r, c);
        tris.push({
          cx, cy, up, side, h,
          color: COLORS[Math.floor(rnd * COLORS.length) % COLORS.length],
          spin: rnd > 0.5 ? 1 : -1,
          release: 150 + (cx / Math.max(W, 1)) * 700 + rnd * 250,
          dx: intro ? (rnd - 0.5) * 220 : 0,
          dy: intro ? (hash(c, r) - 0.5) * 220 : 0,
          rot: intro ? (rnd - 0.5) * 4 : 0,
          scale: intro ? 0 : 1,
          glow: intro ? 0.8 : 0,
        });
      }
    }
    built = true;
  }

  function draw(t) {
    if (t.scale < 0.02) return;
    const cos = Math.cos(t.rot) * t.scale * 0.9;
    const sin = Math.sin(t.rot) * t.scale * 0.9;
    const pts = t.up
      ? [[0, (-2 * t.h) / 3], [-t.side / 2, t.h / 3], [t.side / 2, t.h / 3]]
      : [[-t.side / 2, -t.h / 3], [t.side / 2, -t.h / 3], [0, (2 * t.h) / 3]];
    ctx.beginPath();
    pts.forEach(([x, y], i) => {
      const X = t.cx + t.dx + x * cos - y * sin;
      const Y = t.cy + t.dy + x * sin + y * cos;
      if (i) ctx.lineTo(X, Y);
      else ctx.moveTo(X, Y);
    });
    ctx.closePath();
    if (t.glow > 0.01) {
      const [r, g, b] = t.color;
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${(0.05 + 0.45 * t.glow).toFixed(3)})`;
    } else {
      ctx.fillStyle = `rgba(${INK}, 0.035)`;
    }
    ctx.fill();
  }

  function frame(now) {
    raf = 0;
    const age = now - born;
    const R = W < 640 ? 120 : 170;
    let px = pointer.x;
    let py = pointer.y;
    // Phones have no hover: a slow ghost pointer keeps the field alive until a finger touches it.
    const ghost = !hover && now - pointer.seen > 2500;
    if (ghost) {
      const k = now / 1000;
      px = W * (0.5 + 0.38 * Math.sin(k * 0.42));
      py = H * (0.55 + 0.3 * Math.sin(k * 0.67 + 1));
    }
    let moving = false;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    for (const t of tris) {
      if (age < t.release) {
        moving = true;
        draw(t);
        continue;
      }
      let tx = 0;
      let ty = 0;
      let tr = 0;
      let ts = 1;
      let tg = 0;
      const ddx = t.cx - px;
      const ddy = t.cy - py;
      const d = Math.hypot(ddx, ddy);
      if (d < R) {
        const s = (1 - d / R) ** 2;
        const inv = d > 0.001 ? 1 / d : 0;
        tx = ddx * inv * s * 30;
        ty = ddy * inv * s * 30;
        tr = t.spin * s * 1.2;
        ts = 1 - s * 0.45;
        tg = s;
      }
      const k = age < t.release + 900 ? 0.075 : 0.14;
      t.dx += (tx - t.dx) * k;
      t.dy += (ty - t.dy) * k;
      t.rot += (tr - t.rot) * k;
      t.scale += (ts - t.scale) * k;
      t.glow += (tg - t.glow) * k;
      if (Math.abs(tx - t.dx) + Math.abs(ty - t.dy) + Math.abs(tr - t.rot) + Math.abs(ts - t.scale) + Math.abs(tg - t.glow) > 0.003) {
        moving = true;
      }
      draw(t);
    }
    if (moving || (ghost && visible)) schedule();
  }

  function schedule() {
    if (!raf && visible) raf = requestAnimationFrame(frame);
  }

  build();
  if (reduce) {
    frame(born + 1e5);
    return;
  }
  schedule();

  window.addEventListener('pointermove', (e) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
    pointer.seen = performance.now();
    schedule();
  }, { passive: true });
  document.addEventListener('pointerleave', () => {
    pointer.x = -1e4;
    pointer.y = -1e4;
    schedule();
  });
  new ResizeObserver(() => {
    build();
    schedule();
  }).observe(canvas);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    schedule();
  }).observe(canvas);
}
