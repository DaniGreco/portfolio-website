// Thin strands following an invisible current: particles move along a noise flow field.
// Each particle remembers a point every few pixels it travels (not every frame), so a long
// tail costs few segments, and the tail fades to nothing. The canvas is cleared every frame,
// so trails always disappear instead of piling up.
// The pointer is a black hole: its pull grows with closeness like gravity, strands spiral
// in and circle it, and once it moves on they drift back to the current.
// Strands live for ever: one that leaves the screen comes back in from a random point of an
// edge, just out of sight, so none ever appears or vanishes in view.
// Each strand has its own velocity and only steers towards the current, so nothing snaps.
import { makeNoise } from './noise.js';
import { runCanvas } from './loop.js';

const noise = makeNoise(3);
const TAIL = 40; // points remembered per particle
const STEP = 4; // px travelled between two remembered points
const BANDS = 5; // the tail is drawn in bands, fainter towards its end
const BAND = TAIL / BANDS;
const RGB = ['35, 87, 214', '74, 120, 228', '31, 63, 153'];
const SPEED = 2; // px per frame along the current
const STEER = 0.08; // how quickly a strand turns towards the current
const HOLE = 4000; // pull of the pointer: HOLE / (distance² + SOFT²), in px per frame²
const SOFT = 60; // px: softens the pull near the centre
const SPIN = 0.6; // sideways share of the pull, so strands spiral instead of falling straight
const MAX_SPEED = 6;
const DENSITY = 2880; // one strand per this many px² (about 450 on a 1440 × 900 screen)
const MARGIN = 20; // px outside the screen where strands turn around

export function start(canvas) {
  let count = 0;
  let px = new Float32Array(0); // current position
  let py = new Float32Array(0);
  let vx = new Float32Array(0); // current velocity
  let vy = new Float32Array(0);
  let xs = new Float32Array(0); // remembered points, ring buffers of TAIL per particle
  let ys = new Float32Array(0);
  let head = new Uint16Array(0); // newest remembered point
  let filled = new Uint16Array(0); // how many remembered points are valid
  let pull = new Float32Array(0); // how strongly the pointer bends each particle, smoothed

  // Anywhere on screen at the start; later only from just outside an edge.
  function spawn(i, W, H, fromEdge) {
    let x = Math.random() * W;
    let y = Math.random() * H;
    if (fromEdge) {
      const side = Math.floor(Math.random() * 4);
      if (side === 0) x = -MARGIN / 2;
      else if (side === 1) x = W + MARGIN / 2;
      else if (side === 2) y = -MARGIN / 2;
      else y = H + MARGIN / 2;
    }
    px[i] = x;
    py[i] = y;
    vx[i] = 0;
    vy[i] = 0;
    xs[i * TAIL] = x;
    ys[i * TAIL] = y;
    head[i] = 0;
    filled[i] = 1;
    pull[i] = 0;
  }

  function advance(t, W, H, pointer) {
    const f = 1 / 420;
    const near = pointer && pointer.active > 0.001;
    for (let i = 0; i < count; i++) {
      const x = px[i];
      const y = py[i];
      const angle = noise(x * f, y * f, t * 0.04) * Math.PI * 2;
      // Steer towards the current instead of jumping onto it.
      let ax = (Math.cos(angle) * SPEED - vx[i]) * STEER;
      let ay = (Math.sin(angle) * SPEED - vy[i]) * STEER;
      let k = 0;
      if (near) {
        const dx = pointer.x - x;
        const dy = pointer.y - y;
        const d2 = dx * dx + dy * dy;
        const d = Math.sqrt(d2) || 1;
        const g = (HOLE * pointer.active) / (d2 + SOFT * SOFT);
        ax += (dx / d) * g - (dy / d) * g * SPIN;
        ay += (dy / d) * g + (dx / d) * g * SPIN;
        k = Math.min(1, g / 0.25);
      }
      vx[i] += ax;
      vy[i] += ay;
      const speed = Math.sqrt(vx[i] * vx[i] + vy[i] * vy[i]);
      if (speed > MAX_SPEED) {
        vx[i] *= MAX_SPEED / speed;
        vy[i] *= MAX_SPEED / speed;
      }
      pull[i] += (k - pull[i]) * 0.15;
      const nx = x + vx[i];
      const ny = y + vy[i];
      if (nx < -MARGIN || ny < -MARGIN || nx > W + MARGIN || ny > H + MARGIN) {
        spawn(i, W, H, true);
        continue;
      }
      px[i] = nx;
      py[i] = ny;
      const o = i * TAIL;
      const lx = nx - xs[o + head[i]];
      const ly = ny - ys[o + head[i]];
      if (lx * lx + ly * ly >= STEP * STEP) {
        head[i] = (head[i] + 1) % TAIL;
        xs[o + head[i]] = nx;
        ys[o + head[i]] = ny;
        if (filled[i] < TAIL) filled[i] += 1;
      }
    }
  }

  function draw(ctx, W, H) {
    ctx.clearRect(0, 0, W, H);
    // One path per colour, tail band and strength: every separate stroke has a fixed cost,
    // so strands are batched into at most 30 of them.
    const slot = (c, b, s) => (c * BANDS + b) * 2 + s;
    const paths = Array.from({ length: RGB.length * BANDS * 2 }, () => new Path2D());
    const used = new Uint8Array(paths.length);
    for (let i = 0; i < count; i++) {
      const n = filled[i];
      const o = i * TAIL;
      const strong = pull[i] > 0.2 ? 1 : 0;
      const c = i % RGB.length;
      // From the current position back through the remembered points, newest first.
      let p = slot(c, 0, strong);
      let path = paths[p];
      used[p] = 1;
      path.moveTo(px[i], py[i]);
      let idx = head[i];
      path.lineTo(xs[o + idx], ys[o + idx]);
      let band = 0;
      for (let j = 1; j < n; j++) {
        const prev = (idx - 1 + TAIL) % TAIL;
        const b = Math.floor(j / BAND);
        if (b !== band) {
          band = b;
          p = slot(c, band, strong);
          path = paths[p];
          used[p] = 1;
          path.moveTo(xs[o + idx], ys[o + idx]);
        }
        path.lineTo(xs[o + prev], ys[o + prev]);
        idx = prev;
      }
    }
    ctx.lineWidth = 1;
    for (let c = 0; c < RGB.length; c++) {
      for (let b = 0; b < BANDS; b++) {
        const tail = 1 - b / BANDS;
        for (let s = 0; s < 2; s++) {
          const p = slot(c, b, s);
          if (!used[p]) continue;
          ctx.strokeStyle = `rgba(${RGB[c]}, ${((s ? 0.62 : 0.3) * tail).toFixed(3)})`;
          ctx.stroke(paths[p]);
        }
      }
    }
  }

  runCanvas(canvas, {
    fps: 60,
    // Drawn at 1 canvas pixel per CSS pixel: on high-density screens a full-resolution canvas
    // is four times the work for the GPU, and thin moving strands look the same.
    maxDpr: 1,
    setup(ctx, W, H) {
      count = Math.round((W * H) / DENSITY);
      px = new Float32Array(count);
      py = new Float32Array(count);
      xs = new Float32Array(count * TAIL);
      ys = new Float32Array(count * TAIL);
      head = new Uint16Array(count);
      filled = new Uint16Array(count);
      pull = new Float32Array(count);
      vx = new Float32Array(count);
      vy = new Float32Array(count);
      for (let i = 0; i < count; i++) spawn(i, W, H, false);
      // Start with tails already grown, so the first frames are not a field of dots.
      for (let n = 0; n < TAIL * 3; n++) advance(0, W, H, null);
    },
    frame(ctx, t, W, H, dpr, still, pointer) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      advance(still ? 20 : t, W, H, still ? null : pointer);
      draw(ctx, W, H);
    },
  });
}
