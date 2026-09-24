// Characters that render in the serif heading font (style.css --serif):
// h1, h2, h3, the brand name (.brand b) and the about-section lead (p.lead).
// Shared by build-font.cjs (what goes into the subset) and verify-release.cjs
// (fails the release if a heading uses a character the subset does not contain).
const fs = require('fs');
const path = require('path');

const SERIF_BLOCKS = [
  /<h[123]\b[^>]*>([\s\S]*?)<\/h[123]>/g,
  /<a class="brand"[\s\S]*?<b>([\s\S]*?)<\/b>/g,
  /<p class="lead">([\s\S]*?)<\/p>/g,
];
// Always included so small wording edits rarely need a rebuild.
const EXTRA = '0123456789，。、：；！？「」『』（）—…・／～＋－';

function serifText(html) {
  let text = '';
  for (const re of SERIF_BLOCKS) for (const m of html.matchAll(re)) text += m[1];
  return text.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/g, '');
}

function serifChars(html) {
  const set = new Set([...serifText(html) + EXTRA].filter(c => c.trim() && c.codePointAt(0) > 0x7f || /[0-9]/.test(c)));
  return [...set].sort().join('');
}

module.exports = { serifChars };

if (require.main === module) {
  const html = fs.readFileSync(path.join(__dirname, '..', 'website', 'index.html'), 'utf8');
  process.stdout.write(serifChars(html));
}
