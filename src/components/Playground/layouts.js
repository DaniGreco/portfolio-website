// Geometry of the map. WIDE is for desktop, TALL stacks the zones for phones.
// Both draw the same state: packets refer to stations, paths, servers and pods by name.

const tiles = (ids, { x, y, w, h, gap }) =>
  Object.fromEntries(ids.map((id, i) => [id, { x: x + i * (w + gap), y, w, h }]));

export const WIDE = {
  id: 'wide',
  width: 1200,
  height: 780,
  subtitles: true,
  zones: {
    edge: { x: 120, y: 40, w: 220, h: 380 },
    site: { x: 24, y: 510, w: 316, h: 246 },
    paas: { x: 420, y: 40, w: 570, h: 210 },
    k8s: { x: 420, y: 275, w: 570, h: 210 },
    onprem: { x: 420, y: 510, w: 570, h: 246 },
    offsite: { x: 1015, y: 40, w: 161, h: 716 },
  },
  stations: {
    visitor: { at: [50, 100], label: [50, 128, 'middle'], big: true },
    dns: { at: [290, 100], label: [276, 88, 'end'] },
    fw: { at: [290, 185], label: [276, 189, 'end'] },
    cache: { at: [290, 270], label: [276, 274, 'end'] },
    tunnel: { at: [290, 355], label: [276, 359, 'end'] },
    operator: { at: [70, 640], label: [70, 668, 'middle'], big: true },
    vpn: { at: [290, 640], label: [290, 668, 'middle'] },
    backups: { at: [1095, 380], label: [1095, 410, 'middle'] },
    registry: { at: [1095, 650], label: [1095, 680, 'middle'] },
  },
  mesh: [
    [[380, 40], [380, 756]],
    [[340, 62], [420, 62]],
    [[380, 297], [420, 297]],
    [[340, 532], [420, 532]],
  ],
  routes: [
    { kind: 'traffic', points: [[50, 100], [290, 100], [290, 355], [320, 355], [350, 325], [350, 190], [395, 145], [420, 145]] },
    { kind: 'traffic', points: [[320, 355], [345, 380], [420, 380]] },
    { kind: 'gpu', points: [[70, 640], [290, 640], [420, 640]] },
    { kind: 'data', points: [[990, 145], [1050, 145], [1095, 190], [1095, 380]] },
    { kind: 'data', points: [[990, 380], [1095, 380]] },
    { kind: 'data', points: [[990, 560], [1050, 560], [1095, 515], [1095, 380]] },
    { kind: 'ink', points: [[1095, 650], [1060, 615], [1060, 455], [990, 455]] },
  ],
  paths: {
    edgePaas: [[290, 355], [320, 355], [350, 325], [350, 190], [395, 145], [420, 145]],
    edgeK8s: [[290, 355], [320, 355], [345, 380], [420, 380]],
    vpnOnprem: [[290, 640], [420, 640]],
    backupsPaas: [[1095, 380], [1095, 190], [1050, 145], [990, 145]],
    registryK8s: [[1095, 650], [1060, 615], [1060, 455], [990, 455]],
  },
  tiles: {
    ...tiles(['s1', 's2', 's3'], { x: 440, y: 86, w: 168, h: 150, gap: 13 }),
    cp1: { x: 440, y: 321, w: 78, h: 40 },
    cp2: { x: 440, y: 369, w: 78, h: 40 },
    cp3: { x: 440, y: 417, w: 78, h: 40 },
    ...tiles(['w1', 'w2', 'w3', 'w4', 'w5'], { x: 536, y: 321, w: 80, h: 150, gap: 8 }),
    ...tiles(['ga', 'gb'], { x: 440, y: 556, w: 260, h: 180, gap: 16 }),
  },
  slots: {
    paas: { cols: 2, w: 70, h: 26, gx: 8, gy: 8, top: 32, left: 10 },
    k8s: { cols: 1, w: 64, h: 20, gx: 0, gy: 4, top: 30, left: 8 },
    cpu: { cols: 3, w: 74, h: 26, gx: 8, gy: 0, top: 120, left: 12 },
  },
  gpu: { rows: [34, 74], left: 64, cellW: 46, cellH: 28 },
  pending: { k8s: { x: 740, y: 285, maxW: 230 }, onprem: { x: 730, y: 520, maxW: 250 } },
};

export const TALL = {
  id: 'tall',
  width: 440,
  height: 1256,
  subtitles: false,
  zones: {
    edge: { x: 70, y: 40, w: 342, h: 100 },
    paas: { x: 16, y: 160, w: 396, h: 250 },
    k8s: { x: 16, y: 430, w: 396, h: 280 },
    site: { x: 16, y: 730, w: 396, h: 100 },
    onprem: { x: 16, y: 850, w: 396, h: 260 },
    offsite: { x: 16, y: 1130, w: 396, h: 110 },
  },
  stations: {
    visitor: { at: [36, 96], label: [36, 124, 'middle'], big: true },
    dns: { at: [130, 96], label: [130, 124, 'middle'] },
    fw: { at: [210, 96], label: [210, 124, 'middle'] },
    cache: { at: [290, 96], label: [290, 124, 'middle'] },
    tunnel: { at: [370, 96], label: [370, 124, 'middle'] },
    operator: { at: [60, 790], label: [60, 816, 'middle'], big: true },
    vpn: { at: [300, 790], label: [300, 816, 'middle'] },
    backups: { at: [120, 1190], label: [120, 1218, 'middle'] },
    registry: { at: [300, 1190], label: [300, 1218, 'middle'] },
  },
  mesh: [[[6, 40], [6, 1240]]],
  routes: [
    { kind: 'traffic', points: [[36, 96], [370, 96], [400, 96], [428, 124], [428, 456], [412, 456]] },
    { kind: 'traffic', points: [[428, 186], [412, 186]] },
    { kind: 'gpu', points: [[60, 790], [300, 790], [380, 790], [380, 866]] },
  ],
  paths: {
    edgePaas: [[370, 96], [400, 96], [428, 124], [428, 186], [412, 186]],
    edgeK8s: [[370, 96], [400, 96], [428, 124], [428, 456], [412, 456]],
    vpnOnprem: [[300, 790], [380, 790], [380, 866]],
    backupsPaas: [[120, 1190], [120, 410]],
    registryK8s: [[300, 1190], [300, 710]],
  },
  tiles: {
    ...tiles(['s1', 's2', 's3'], { x: 28, y: 206, w: 120, h: 194, gap: 6 }),
    ...tiles(['cp1', 'cp2', 'cp3'], { x: 28, y: 494, w: 120, h: 32, gap: 6 }),
    ...tiles(['w1', 'w2', 'w3', 'w4', 'w5'], { x: 28, y: 536, w: 70, h: 160, gap: 7 }),
    ...tiles(['ga', 'gb'], { x: 28, y: 922, w: 186, h: 176, gap: 8 }),
  },
  slots: {
    paas: { cols: 1, w: 100, h: 22, gx: 0, gy: 6, top: 30, left: 10 },
    k8s: { cols: 1, w: 58, h: 20, gx: 0, gy: 6, top: 28, left: 6 },
    cpu: { cols: 3, w: 56, h: 24, gx: 4, gy: 0, top: 120, left: 8 },
  },
  gpu: { rows: [36, 82], left: 8, cellW: 43, cellH: 26, labelAbove: true },
  pending: { k8s: { x: 28, y: 466, maxW: 372 }, onprem: { x: 28, y: 886, maxW: 372 } },
};
