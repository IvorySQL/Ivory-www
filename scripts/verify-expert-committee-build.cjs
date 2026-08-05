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

const expectedFramedAvatars = [
  { file: 'alvaro-hernandez.webp', scale: '1.5', position: '50% 30%' },
  { file: 'liu-huayang.webp', scale: '1.8', position: '66% 0%' },
  { file: 'peng-chong.webp', scale: '2.4', position: '19% 15%' },
  { file: 'xiong-cancan.webp', scale: '2.2', position: '50% 32%' },
  { file: 'xu-ji.webp', scale: '2.2', position: '50% 32%' },
  { file: 'xu-xiaoqiang.webp', scale: '3', position: '50% 50%' },
  { file: 'yin-haiwen.webp', scale: '1.9', position: '50% 0%' },
];

function getImageTag(html, filename) {
  const match = html.match(new RegExp(`<img\\b[^>]*src="[^"]*${filename}"[^>]*>`));
  assert.ok(match, `Missing built portrait image: ${filename}`);
  return match[0];
}

function getStyleProperties(imageTag) {
  const style = imageTag.match(/\sstyle="([^"]*)"/);
  if (!style) return {};
  return Object.fromEntries(
    style[1]
      .split(';')
      .filter(Boolean)
      .map((property) => property.split(':')),
  );
}

function assertPortraitFraming(html, locale) {
  const framedImageTags = (html.match(/<img\b[^>]*>/g) || []).filter((imageTag) => {
    const style = getStyleProperties(imageTag);
    return style['--avatar-scale'] && style['--avatar-position'];
  });
  assert.equal(framedImageTags.length, 7, `${locale} has seven framed portrait images`);

  expectedFramedAvatars.forEach(({ file, scale, position }) => {
    const style = getStyleProperties(getImageTag(html, file));
    assert.deepEqual(
      {
        '--avatar-scale': style['--avatar-scale'],
        '--avatar-position': style['--avatar-position'],
      },
      {
        '--avatar-scale': scale,
        '--avatar-position': position,
      },
      `${locale} renders framing values for ${file}`,
    );
  });

  const controlStyle = getStyleProperties(getImageTag(html, 'cedric-villemain.webp'));
  assert.equal(controlStyle['--avatar-scale'], undefined, `${locale} leaves Cédric unscaled`);
  assert.equal(
    controlStyle['--avatar-position'],
    undefined,
    `${locale} leaves Cédric centered by CSS default`,
  );
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
assertPortraitFraming(english, 'English');

assert.ok(chinese.includes('专家顾问委员会'));
assert.ok(chinese.includes('崔鹏'));
assert.equal(count(chinese, 'data-expert-card="true"'), 29);
assert.equal(count(chinese, 'data-avatar-empty="true"'), 2);
assert.ok(chinese.includes('专家按英文姓名首字母顺序排列'));
assert.ok(chinese.includes('将鼠标移至或选择头像、姓名'));
assert.ok(chinese.includes('欢迎更多数据库专家加入'));
assert.ok(chinese.includes('mailto:ivorysql1213@gmail.com'));
assertPortraitFraming(chinese, 'Chinese');

console.log('Verified bilingual committee pages with ordered experts, a join CTA, and 2 empty avatars.');
