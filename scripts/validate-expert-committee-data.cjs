const fs = require('node:fs');
const path = require('node:path');

const dataPath = path.join(__dirname, '..', 'src', 'data', 'expertCommittee.json');
const experts = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const expectedIds = [
  'luo-min', 'xu-ji', 'technical-expert', 'liu-huayang', 'xue-xiaogang',
  'zhou-zhengzhong', 'yin-haiwen', 'wu-yang', 'xiong-cancan', 'peng-chong',
  'leng-bo', 'zhang-dagang', 'li-chuancheng', 'xu-xiaoqiang', 'feng-ruohang',
  'xiao-shaocong', 'shang-lei', 'zhang-chen', 'tang-cheng', 'denis-lussier',
  'michael-meskes', 'cedric-villemain', 'alvaro-hernandez', 'cui-peng',
  'lei-yanliang', 'shi-jiawei', 'wei-bo', 'fu-chao', 'yu-zixuan',
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
console.log(`Validated ${experts.length} unique expert profiles.`);
