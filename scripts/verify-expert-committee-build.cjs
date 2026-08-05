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
assert.equal(count(english, 'data-avatar-empty="true"'), 2);
assert.ok(english.includes('Experts are listed alphabetically by English name'));
assert.ok(english.includes('No ranking implied'));
assert.ok(english.includes('Hover over or select a portrait or name'));
assert.ok(!english.includes('Listed in no particular order'));
assert.ok(english.includes('mailto:ivorysql1213@gmail.com'));
assert.ok(english.indexOf('Álvaro Hernández') < english.indexOf('Cédric Villemain'));
assert.ok(english.indexOf('Michael Meskes') < english.indexOf('NkYoung'));

assert.ok(chinese.includes('专家顾问委员会'));
assert.ok(chinese.includes('崔鹏'));
assert.equal(count(chinese, 'data-expert-card="true"'), 29);
assert.equal(count(chinese, 'data-avatar-empty="true"'), 2);
assert.ok(chinese.includes('专家按英文姓名首字母顺序排列'));
assert.ok(chinese.includes('将鼠标移至或选择头像、姓名'));
assert.ok(chinese.includes('欢迎更多数据库专家加入'));
assert.ok(chinese.includes('mailto:ivorysql1213@gmail.com'));

console.log('Verified bilingual committee pages with ordered experts, a join CTA, and 2 empty avatars.');
