const fs = require('node:fs');
const path = require('node:path');

const dataPath = path.join(__dirname, '..', 'src', 'data', 'expertCommittee.json');
const experts = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const expectedIds = [
  'alvaro-hernandez', 'cedric-villemain', 'cui-peng', 'denis-lussier',
  'feng-ruohang', 'fu-chao', 'lei-yanliang', 'leng-bo', 'li-chuancheng',
  'liu-huayang', 'luo-min', 'michael-meskes', 'technical-expert', 'peng-chong',
  'shang-lei', 'shi-jiawei', 'tang-cheng', 'wei-bo', 'wu-yang',
  'xiao-shaocong', 'xiong-cancan', 'xu-ji', 'xu-xiaoqiang', 'xue-xiaogang',
  'yin-haiwen', 'yu-zixuan', 'zhang-chen', 'zhang-dagang', 'zhou-zhengzhong',
];

function normalize(value) {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase('en')
    .replace(/[\s·・,，.。'"“”‘’()（）\-_/]/g, '');
}

function assertUnique(label, values) {
  const seen = new Map();
  values.forEach((value, index) => {
    const key = normalize(value);
    if (seen.has(key)) {
      throw new Error(`${label} duplicate: ${value} at ${seen.get(key)} and ${index}`);
    }
    seen.set(key, index);
  });
}

if (!Array.isArray(experts) || experts.length !== expectedIds.length) {
  throw new Error(`Expected ${expectedIds.length} experts, received ${experts.length}`);
}

const actualIds = experts.map(({ id }) => id).sort();
const missingIds = expectedIds.filter((id) => !actualIds.includes(id));
const extraIds = actualIds.filter((id) => !expectedIds.includes(id));
if (missingIds.length || extraIds.length) {
  throw new Error(`ID mismatch. Missing: ${missingIds.join(', ')}; extra: ${extraIds.join(', ')}`);
}

experts.forEach((expert) => {
  ['id', 'name', 'title', 'bio'].forEach((field) => {
    if (!expert[field]) throw new Error(`${expert.id || 'unknown'} missing ${field}`);
  });
  ['en', 'zh'].forEach((locale) => {
    ['name', 'title', 'bio'].forEach((field) => {
      if (typeof expert[field][locale] !== 'string' || !expert[field][locale].trim()) {
        throw new Error(`${expert.id} missing ${field}.${locale}`);
      }
    });
  });
  if (expert.avatar !== null && typeof expert.avatar !== 'string') {
    throw new Error(`${expert.id} avatar must be a string or null`);
  }
  if (typeof expert.avatar === 'string') {
    const assetPath = path.join(__dirname, '..', 'static', expert.avatar.replace(/^\//, ''));
    if (!fs.existsSync(assetPath)) {
      throw new Error(`${expert.id} avatar does not exist: ${expert.avatar}`);
    }
  }
});

assertUnique('id', experts.map(({ id }) => id));
assertUnique('Chinese name', experts.map(({ name }) => name.zh));
assertUnique('English name', experts.map(({ name }) => name.en));

const englishNames = experts.map(({ name }) => name.en);
const sortedEnglishNames = [...englishNames].sort((left, right) =>
  left.localeCompare(right, 'en', { sensitivity: 'base' }),
);
if (JSON.stringify(englishNames) !== JSON.stringify(sortedEnglishNames)) {
  throw new Error('Experts must be sorted by English name A-Z');
}

const nkYoung = experts.find(({ id }) => id === 'technical-expert');
if (
  nkYoung.name.en !== 'NkYoung' ||
  nkYoung.name.zh !== 'NkYoung' ||
  nkYoung.avatar !== null ||
  !nkYoung.bio.zh.includes('PostgreSQL 运维之道')
) {
  throw new Error('NkYoung profile is incomplete');
}
console.log(`Validated ${experts.length} unique expert profiles.`);
