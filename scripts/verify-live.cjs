// Post-push check (RULES R12): is https://cccathotel.com actually serving what is in website/?
//   node scripts/verify-live.cjs            waits up to 3 minutes for Netlify, then compares
//   node scripts/verify-live.cjs --once     single check, no waiting
// Exit 0 = live version and every file under website/ match. Exit 1 = not deployed or different.
// A pushed commit is NOT live until this passes. If it fails, see RULES E7 (Netlify build cache).
const fs = require('fs');
const path = require('path');

const SITE = 'https://cccathotel.com/';
const root = path.join(__dirname, '..', 'website');
const once = process.argv.includes('--once');

function listFiles(dir, base = '') {
  return fs.readdirSync(path.join(dir, base), { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? listFiles(dir, path.posix.join(base, e.name)) : [path.posix.join(base, e.name)]);
}
const textLike = name => /\.(html|css|js|xml|txt)$/.test(name);
const normalize = buf => buf.toString('utf8').replace(/\r\n/g, '\n');
const localVersion = fs.readFileSync(path.join(root, 'index.html'), 'utf8').match(/<meta name="version" content="([^"]+)">/)[1];

async function fetchBuf(name) {
  const url = SITE + (name === 'index.html' ? '' : name) + `?v=verify-${Date.now()}`;
  const res = await fetch(url, { cache: 'no-store' });
  return { status: res.status, robots: res.headers.get('x-robots-tag'), buf: Buffer.from(await res.arrayBuffer()) };
}

async function check() {
  const home = await fetchBuf('index.html');
  const liveVersion = (normalize(home.buf).match(/<meta name="version" content="([^"]+)">/) || [])[1];
  if (liveVersion !== localVersion) return { ok: false, reason: `live version ${liveVersion || '(none)'} ≠ local ${localVersion}` };
  const problems = [];
  for (const name of listFiles(root)) {
    const live = name === 'index.html' ? home : await fetchBuf(name);
    const local = fs.readFileSync(path.join(root, name));
    const same = textLike(name) ? normalize(live.buf) === normalize(local) : live.buf.equals(local);
    if (live.status !== 200) problems.push(`${name}: HTTP ${live.status}`);
    else if (!same) problems.push(`${name}: content differs from local`);
    if (live.robots && /noindex/i.test(live.robots)) problems.push(`${name}: X-Robots-Tag ${live.robots}`);
  }
  return problems.length ? { ok: false, reason: problems.join('\n  ') } : { ok: true, count: listFiles(root).length };
}

(async () => {
  const deadline = Date.now() + (once ? 0 : 180000);
  for (;;) {
    const result = await check();
    if (result.ok) { console.log(`LIVE OK: ${localVersion}, ${result.count} files identical to website/ (${new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })})`); return; }
    if (Date.now() >= deadline) {
      console.error(`LIVE CHECK FAILED: ${result.reason}`);
      console.error('The push is NOT live. Check Netlify Deploys; if the build failed at "Install dependencies", follow RULES E7. Report it now — do not write "to be filled in later".');
      process.exitCode = 1; return;
    }
    await new Promise(r => setTimeout(r, 15000));
  }
})().catch(err => { console.error('LIVE CHECK ERROR:', err.message); process.exitCode = 1; });
