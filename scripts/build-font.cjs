// Rebuild website/fonts/cc-serif.woff2: Noto Serif TC cut down to the characters the
// headings actually use (see serif-chars.cjs), weights 400–500 only.
// Run after changing any h1/h2/h3, the brand name or the about lead:
//   node scripts/build-font.cjs
// Needs Python with fonttools + brotli (pip install --user fonttools brotli).
// Source font: Noto Serif TC variable TTF, SIL Open Font License 1.1 (license kept in the name table).
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { serifChars } = require('./serif-chars.cjs');

const root = path.resolve(__dirname, '..');
const source = process.env.NOTO_SERIF_TC || 'C:/Windows/Fonts/NotoSerifTC-VF.ttf';
const out = path.join(root, 'website', 'fonts', 'cc-serif.woff2');
const charsFile = path.join(__dirname, 'serif-subset-chars.txt');

if (!fs.existsSync(source)) throw new Error(`Source font not found: ${source} (set NOTO_SERIF_TC)`);
const chars = serifChars(fs.readFileSync(path.join(root, 'website', 'index.html'), 'utf8'));
fs.writeFileSync(charsFile, chars);

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cc-serif-'));
const instance = path.join(tmp, 'instance.ttf');
execFileSync('python', ['-m', 'fontTools.varLib.instancer', source, 'wght=400:500', '-o', instance, '-q'], { stdio: 'inherit' });
fs.mkdirSync(path.dirname(out), { recursive: true });
execFileSync('python', ['-m', 'fontTools.subset', instance, `--text-file=${charsFile}`, '--unicodes=U+0020',
  '--flavor=woff2', '--layout-features=*', '--name-IDs=*', '--name-languages=*', `--output-file=${out}`], { stdio: 'inherit' });
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`cc-serif.woff2: ${[...chars].length} characters, ${fs.statSync(out).size} bytes`);
