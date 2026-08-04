const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..', 'build');

function readBuiltPage(localePath) {
  const pagePath = path.join(root, localePath, 'expert-advisory-committee', 'index.html');
  assert.ok(fs.existsSync(pagePath), `Missing built page: ${pagePath}`);
  return fs.readFileSync(pagePath, 'utf8');
}

function count(haystack, needle) {
  return haystack.split(needle).length - 1;
}

const english = readBuiltPage('');
const chinese = readBuiltPage('zh-cn');

assert.ok(english.includes('Expert Advisory Committee'));
assert.ok(english.includes('Cui Peng'));
assert.equal(count(english, 'data-expert-card="true"'), 29);
assert.equal(count(english, 'data-avatar-empty="true"'), 6);

assert.ok(chinese.includes('专家顾问委员会'));
assert.ok(chinese.includes('崔鹏'));
assert.equal(count(chinese, 'data-expert-card="true"'), 29);
assert.equal(count(chinese, 'data-avatar-empty="true"'), 6);

console.log('Verified bilingual committee pages with 29 unique experts and 6 empty avatars.');
