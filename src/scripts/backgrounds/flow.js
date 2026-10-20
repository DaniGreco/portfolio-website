// Thin strands following an invisible current: particles move along a noise flow field.
// Each particle remembers a point every few pixels it travels (not every frame), so a long
// tail costs few segments, and the tail fades to nothing. The canvas is cleared every frame,
// so trails always disappear instead of piling up.
// The pointer pulls the current towards it and turns it into a vortex.
import { makeNoise } from './noise.js';
import { runCanvas } from './loop.js';

const noise = makeNoise(3);
const TAIL = 40; // points remembered per particle
const STEP = 4; // px travelled between two remembered points
const BANDS = 5; // the tail is drawn in bands, fainter towards its end
const BAND = TAIL / BANDS;
const RGB = ['35, 87, 214', '74, 120, 228', '31, 63, 153'];
const GRAVITY = 320; // how far, in px, the pointer bends the current
const SPEED = 1.5;

export function start(canvas) {
  let count = 0;
  let px = new Float32Array(0); // current position
  let py = new Float32Array(0);
  let xs = new Float32Array(0); // remembered points, ring buffers of TAIL per particle
  let ys = new Float32Array(0);
  let head = new Uint16Array(0); // newest remembered point
  let filled = new Uint16Array(0); // how many remembered points are valid
  let age = new Float32Array(0);
  let life = new Float32Array(0);
  let pull = new Float32Array(0); // how strongly the pointer bends each particle, smoothed

  function spawn(i, W, H) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    px[i] = x;
    py[i] = y;
    xs[i * TAIL] = x;
    ys[i * TAIL] = y;
    head[i] = 0;
    filled[i] = 1;
    age[i] = 0;
    life[i] = 200 + Math.random() * 300;
    pull[i] = 0;
  }

  function advance(t, W, H, pointer) {
    const f = 1 / 420;
    const near = pointer && pointer.active > 0.001;
    for (let i = 0; i < count; i++) {
      const x = px[i];
      const y = py[i];
      const angle = noise(x * f, y * f, t * 0.04) * Math.PI * 2;
      let vx = Math.cos(angle) * SPEED;
      let vy = Math.sin(angle) * SPEED;
      let k = 0;
      if (near) {
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        if (d < GRAVITY) {
          k = (1 - d / GRAVITY) ** 1.6 * pointer.active;
          // Around the pointer: swirl (perpendicular) plus a pull towards it.
          vx += (-dy / d) * k * 2.4 - (dx / d) * k * 1.3;
          vy += (dx / d) * k * 2.4 - (dy / d) * k * 1.3;
        }
      }
      pull[i] += (k - pull[i]) * 0.15;
      const nx = x + vx;
      const ny = y + vy;
      age[i] += 1;
      if (nx < -20 || ny < -20 || nx > W + 20 || ny > H + 20 || age[i] > life[i]) {
        spawn(i, W, H);
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
    // One path per colour, band and strength: a few dozen strokes per frame.
    const paths = Array.from({ length: RGB.length * BANDS * 2 }, () => new Path2D());
    for (let i = 0; i < count; i++) {
      const n = filled[i];
      const o = i * TAIL;
      const strong = pull[i] > 0.2 ? 1 : 0;
      const base = (i % RGB.length) * BANDS * 2;
      // From the current position back through the remembered points, newest first.
      let path = paths[base + strong];
      path.moveTo(px[i], py[i]);
      let idx = head[i];
      path.lineTo(xs[o + idx], ys[o + idx]);
      let band = 0;
      for (let j = 1; j < n; j++) {
        const prev = (idx - 1 + TAIL) % TAIL;
        const b = Math.floor(j / BAND);
        if (b !== band) {
          band = b;
          path = paths[base + band * 2 + strong];
          path.moveTo(xs[o + idx], ys[o + idx]);
        }
        path.lineTo(xs[o + prev], ys[o + prev]);
        idx = prev;
      }
    }
    ctx.lineWidth = 1;
    for (let c = 0; c < RGB.length; c++) {
      for (let b = 0; b < BANDS; b++) {
        const fade = 1 - b / BANDS;
        for (let s = 0; s < 2; s++) {
          const alpha = (s ? 0.62 : 0.3) * fade;
          ctx.strokeStyle = `rgba(${RGB[c]}, ${alpha.toFixed(3)})`;
          ctx.stroke(paths[(c * BANDS + b) * 2 + s]);
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
      count = Math.round((W * H) / 1600);
      px = new Float32Array(count);
      py = new Float32Array(count);
      xs = new Float32Array(count * TAIL);
      ys = new Float32Array(count * TAIL);
      head = new Uint16Array(count);
      filled = new Uint16Array(count);
      age = new Float32Array(count);
      life = new Float32Array(count);
      pull = new Float32Array(count);
      for (let i = 0; i < count; i++) spawn(i, W, H);
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
