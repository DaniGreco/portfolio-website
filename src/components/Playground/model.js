// What the map shows: a simplified model of the infrastructure, not a copy of it.

// Class names are written out in full so Tailwind can find them.
export const KIND = {
  traffic: { stroke: 'stroke-traffic', fill: 'fill-traffic' },
  mesh: { stroke: 'stroke-mesh', fill: 'fill-mesh' },
  data: { stroke: 'stroke-data', fill: 'fill-data' },
  gpu: { stroke: 'stroke-gpu', fill: 'fill-gpu' },
};

export const SERVICES = {
  web: { label: 'web', kind: 'traffic', name: 'Web app', about: 'The dashboards and front ends people open in the browser.' },
  api: { label: 'api', kind: 'traffic', name: 'API', about: 'The back end behind the web apps.' },
  auth: { label: 'sso', kind: 'mesh', name: 'Single sign-on', about: 'One login for every app, with passkeys and two-factor.' },
  flows: { label: 'flows', kind: 'mesh', name: 'Automations', about: 'Scheduled jobs and workflows that move data between systems.' },
  logs: { label: 'logs', kind: 'mesh', name: 'Logs and dashboards', about: 'Every container sends its logs here. Alerts start from here.' },
  docdb: { label: 'docdb', kind: 'data', name: 'Document database shard', about: 'The document database is split in shards: each server holds part of the data.' },
  maps: { label: 'maps', kind: 'traffic', name: 'Geocoding and routing', about: 'Turns addresses into coordinates and computes routes.' },
  jobs: { label: 'jobs', kind: 'mesh', name: 'Background jobs', about: 'Workers that take long tasks off a queue.' },
  sql: { label: 'sql', kind: 'data', name: 'Relational database', about: 'A primary and a replica on different servers. If the primary goes, the replica takes over.' },
  rag: { label: 'rag', kind: 'gpu', name: 'Assistant API', about: 'Finds the passages that answer a question and asks a model to write the answer from them.' },
  index: { label: 'index', kind: 'data', name: 'Vector index', about: 'The documents, split in passages and stored as vectors so they can be searched by meaning.' },
  llmXL: { label: 'llm-xl', kind: 'gpu', gpu: 4, name: 'Large language model', about: 'Writes the answers. It needs a whole GPU.' },
  llmS: { label: 'llm-s', kind: 'gpu', gpu: 1, name: 'Small language model', about: 'A fast model for short tasks. It answers alone when the large model is down.' },
  embed: { label: 'embed', kind: 'gpu', gpu: 1, name: 'Embedding model', about: 'Turns a question into a vector, to search the index.' },
  rerank: { label: 'rerank', kind: 'gpu', gpu: 1, name: 'Reranker', about: 'Puts the passages found in order, best first.' },
};

export const ZONES = {
  edge: { name: 'Edge network', note: '', about: 'The first stop for every visitor, close to where they are. The servers sit behind tunnels: none of them has a port open to the internet.' },
  paas: { name: 'Container fleet', note: 'cloud servers, self-hosted PaaS', about: 'Cloud servers run by a self-hosted platform: every app is a container, deployed from git. Simple and cheap, but when a server dies, someone restores its apps from backup.' },
  k8s: { name: 'Kubernetes fleet', note: 'created with Terraform', about: 'Cloud servers created with Terraform and run by Kubernetes. When a server dies, its workloads move to the others by themselves.' },
  onprem: { name: 'GPU servers on-prem', note: '2 servers, 4 GPUs', about: "Two servers in the customer's server room, two GPUs each. They run the language models, so the documents never leave the building." },
  site: { name: 'Customer network', note: '', about: "The customer's office network. It reaches the GPU servers through a site-to-site VPN." },
  offsite: { name: 'Off-site', note: '', about: 'Backups and release images, stored with a different provider from the servers.' },
  mesh: { name: 'Private mesh network', note: '', about: 'An encrypted mesh network links every server, wherever it is. Admin access goes only through here.' },
};

export const STATIONS = {
  visitor: { name: 'You', about: 'Every request on this side of the map starts here.' },
  dns: { name: 'DNS', about: 'Tells your browser which edge location is closest to you.' },
  fw: { name: 'Firewall + TLS', about: 'Encrypts the connection and filters bad traffic before it reaches any server.' },
  cache: { name: 'Cache', about: 'Keeps static files near visitors, so the servers do not have to send them every time.' },
  tunnel: { name: 'Tunnels', about: 'The servers open outbound tunnels to the edge. Nothing listens on the public internet.' },
  operator: { name: 'Operator', about: "Someone on the customer's network, with a question about a procedure." },
  vpn: { name: 'VPN', about: 'A site-to-site VPN between the customer network and the GPU servers.' },
  backups: { name: 'Backups', about: 'Encrypted database dumps every 30 minutes, in object storage.' },
  registry: { name: 'Image registry', about: 'Every release is a container image stored here, so any version can come back.' },
};

export const NODES = {
  s1: { zone: 'paas', name: 'Server 1' },
  s2: { zone: 'paas', name: 'Server 2' },
  s3: { zone: 'paas', name: 'Server 3' },
  cp1: { zone: 'k8s', role: 'control', name: 'Control 1' },
  cp2: { zone: 'k8s', role: 'control', name: 'Control 2' },
  cp3: { zone: 'k8s', role: 'control', name: 'Control 3' },
  w1: { zone: 'k8s', role: 'worker', name: 'Worker 1' },
  w2: { zone: 'k8s', role: 'worker', name: 'Worker 2' },
  w3: { zone: 'k8s', role: 'worker', name: 'Worker 3' },
  w4: { zone: 'k8s', role: 'worker', name: 'Worker 4', spare: true },
  w5: { zone: 'k8s', role: 'worker', name: 'Worker 5', spare: true },
  ga: { zone: 'onprem', name: 'GPU server A' },
  gb: { zone: 'onprem', name: 'GPU server B' },
};

export const ZONE_NODES = {
  paas: ['s1', 's2', 's3'],
  k8s: ['cp1', 'cp2', 'cp3', 'w1', 'w2', 'w3', 'w4', 'w5'],
  onprem: ['ga', 'gb'],
};

export const PAAS_SLOTS = 6;
export const WORKER_SLOTS = 5;
export const CPU_SLOTS = 3;
export const GPU_CELLS = 4;

const WORKERS = ZONE_NODES.k8s.filter((id) => NODES[id].role === 'worker');
const CONTROL = ZONE_NODES.k8s.filter((id) => NODES[id].role === 'control');

export function initialState() {
  const s = { seq: 0, nodes: {}, pods: [], log: [], packets: [], release: 1, busy: {}, lastWeb: 'paas' };
  for (const id of Object.keys(NODES)) s.nodes[id] = NODES[id].spare ? 'absent' : 'up';
  const add = (svc, node, extra = {}) => {
    s.seq += 1;
    s.pods.push({ id: `p${s.seq}`, seq: s.seq, svc, zone: NODES[node].zone, node, status: 'run', ver: 1, ...extra });
  };
  add('web', 's1'); add('auth', 's1'); add('flows', 's1'); add('logs', 's1');
  add('api', 's2'); add('docdb', 's2'); add('web', 's2');
  add('docdb', 's3'); add('maps', 's3'); add('api', 's3');

  add('web', 'w1'); add('api', 'w1'); add('jobs', 'w1'); add('sql', 'w1', { role: 'primary' });
  add('web', 'w2'); add('api', 'w2'); add('sql', 'w2', { role: 'replica' });
  add('web', 'w3'); add('api', 'w3'); add('jobs', 'w3');

  add('llmXL', 'ga', { gpu: [0, 0] }); add('embed', 'ga', { gpu: [1, 0] }); add('rerank', 'ga', { gpu: [1, 1] });
  add('rag', 'ga'); add('index', 'ga');
  add('llmS', 'gb', { gpu: [0, 0] }); add('rag', 'gb');
  return s;
}

export const isUp = (s, id) => s.nodes[id] === 'up';
const live = (p) => p.status !== 'stop';
export const podsOn = (s, node) => s.pods.filter((p) => p.node === node && live(p));
export const quorum = (s) => CONTROL.filter((id) => isUp(s, id)).length >= 2;
export const workersUp = (s) => WORKERS.filter((id) => isUp(s, id));
export const nextSpare = (s) => WORKERS.find((id) => s.nodes[id] === 'absent');

export function newPod(s, fields) {
  const seq = s.seq + 1;
  return { s: { ...s, seq }, pod: { id: `p${seq}`, seq, status: 'pending', ver: 1, node: null, ...fields } };
}

// Kubernetes: place pending pods on the worker with the fewest copies of the same service,
// then the fewest pods. The two database pods never share a server.
export function scheduleK8s(s) {
  if (!quorum(s)) return { s, placed: [] };
  const pods = s.pods.map((p) => ({ ...p }));
  const placed = [];
  for (const p of pods) {
    if (p.zone !== 'k8s' || p.node || !live(p)) continue;
    const options = workersUp(s)
      .map((id) => ({ id, on: pods.filter((q) => q.node === id && live(q)) }))
      .filter((o) => o.on.length < WORKER_SLOTS)
      .filter((o) => p.svc !== 'sql' || !o.on.some((q) => q.svc === 'sql'));
    if (!options.length) continue;
    const same = (o) => o.on.filter((q) => q.svc === p.svc).length;
    options.sort((a, b) => same(a) - same(b) || a.on.length - b.on.length);
    p.node = options[0].id;
    p.status = 'start';
    placed.push(p);
  }
  return { s: { ...s, pods }, placed };
}

function usedCells(pods, node, g) {
  const used = new Array(GPU_CELLS).fill(false);
  for (const q of pods) {
    if (q.node !== node || !q.gpu || q.gpu[0] !== g || !live(q)) continue;
    for (let i = 0; i < SERVICES[q.svc].gpu; i++) used[q.gpu[1] + i] = true;
  }
  return used;
}

// GPU servers: biggest models first, each on the GPU with the least free room that still fits it.
export function scheduleOnprem(s) {
  const pods = s.pods.map((p) => ({ ...p }));
  const placed = [];
  const servers = ZONE_NODES.onprem.filter((id) => isUp(s, id));
  const pending = pods
    .filter((p) => p.zone === 'onprem' && !p.node && live(p))
    .sort((a, b) => (SERVICES[b.svc].gpu || 0) - (SERVICES[a.svc].gpu || 0));
  for (const p of pending) {
    const need = SERVICES[p.svc].gpu;
    if (need) {
      let best = null;
      for (const id of servers) {
        for (let g = 0; g < 2; g++) {
          const used = usedCells(pods, id, g);
          let start = -1;
          for (let i = 0; i + need <= GPU_CELLS; i++) if (used.slice(i, i + need).every((u) => !u)) { start = i; break; }
          if (start < 0) continue;
          const free = used.filter((u) => !u).length;
          if (!best || free < best.free) best = { id, g, start, free };
        }
      }
      if (!best) continue;
      p.node = best.id;
      p.gpu = [best.g, best.start];
    } else {
      const options = servers
        .map((id) => ({ id, n: pods.filter((q) => q.node === id && !q.gpu && live(q)).length }))
        .filter((o) => o.n < CPU_SLOTS)
        .sort((a, b) => a.n - b.n);
      if (!options.length) continue;
      p.node = options[0].id;
    }
    p.status = 'start';
    placed.push(p);
  }
  return { s: { ...s, pods }, placed };
}

// Container fleet: apps on a dead server come back from backup on the emptiest live server.
export function restorePaas(s) {
  const pods = s.pods.map((p) => ({ ...p }));
  const placed = [];
  for (const p of pods) {
    if (p.zone !== 'paas' || p.status !== 'down') continue;
    const options = ZONE_NODES.paas
      .filter((id) => isUp(s, id))
      .map((id) => ({ id, n: pods.filter((q) => q.node === id && live(q) && q.status !== 'down').length }))
      .filter((o) => o.n < PAAS_SLOTS)
      .sort((a, b) => a.n - b.n);
    if (!options.length) continue;
    p.node = options[0].id;
    p.status = 'start';
    placed.push(p);
  }
  return { s: { ...s, pods }, placed };
}

export const names = (list) => {
  const words = [...new Set(list)];
  return words.length > 1 ? `${words.slice(0, -1).join(', ')} and ${words.at(-1)}` : words[0] || '';
};
