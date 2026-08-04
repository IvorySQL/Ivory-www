# Expert Advisory Committee Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a bilingual IvorySQL Expert Advisory Committee page with 29 deduplicated profiles, compact circular avatars, hover/focus biographies on desktop, tap biographies on mobile, and a Resources navigation entry.

**Architecture:** Store all expert content in one locale-aware JSON dataset and validate it with a dependency-free Node script before rendering. A single Docusaurus page owns the responsive grid and mobile biography dialog; CSS Modules own the visual design, desktop popovers, responsive layout, reduced-motion behavior, and empty-avatar treatment. Local photos are copied only when the identity match is reliable.

**Tech Stack:** Docusaurus 3.9.2, React 18.2, CSS Modules, Node.js validation script, static image assets.

## Global Constraints

- The final dataset contains exactly 29 unique experts: the 23 profiles in the existing committee article plus 崔鹏、类延良、施嘉伟、魏波、付超、虞梓轩.
- Deduplicate by stable `id`, normalized Chinese name, normalized English name, and known aliases before rendering.
- Desktop avatars are 94px circles; mobile avatars are 82px circles.
- Desktop grid columns are 5, tablet columns are 3, and mobile columns are 2.
- Only the avatar and name trigger the biography; the Title does not trigger it.
- Desktop uses hover and keyboard focus; touch devices use a dismissible bottom biography dialog.
- Missing photos use one neutral empty-avatar treatment. Do not guess identities or download missing images from the internet.
- Preserve the existing IvorySQL deep-blue Hero, blue accent, light-gradient background, rounded cards, and bilingual routing conventions.
- Do not add a new runtime dependency.

---

### Task 1: Build and validate the deduplicated expert dataset

**Files:**
- Create: `src/data/expertCommittee.json`
- Create: `scripts/validate-expert-committee-data.cjs`
- Read: `src/pages/news/ivorysql-expert-advisory-committee.mdx`
- Read: `i18n/zh-CN/docusaurus-plugin-content-pages/news/ivorysql-expert-advisory-committee.mdx`

**Interfaces:**
- Produces: `expertCommittee.json`, an array of `{ id, name: { en, zh }, title: { en, zh }, bio: { en, zh }, avatar }` objects.
- Produces: `node scripts/validate-expert-committee-data.cjs`, which exits 0 only for exactly 29 unique, structurally valid profiles.
- Consumes: the existing English and Chinese committee article plus the six user-provided profiles in the approved design spec.

- [ ] **Step 1: Create the failing dataset validator**

Create `scripts/validate-expert-committee-data.cjs` with this implementation:

```js
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
```

- [ ] **Step 2: Run the validator to verify it fails because the dataset is absent**

Run: `node scripts/validate-expert-committee-data.cjs`

Expected: FAIL with `ENOENT` for `src/data/expertCommittee.json`.

- [ ] **Step 3: Create the 29-profile JSON dataset**

Use this exact object shape for every entry:

```json
{
  "id": "cui-peng",
  "name": { "en": "Cui Peng", "zh": "崔鹏" },
  "title": {
    "en": "DBA Director at Hytera Communications · PostgreSQL ACE",
    "zh": "海能达通信 DBA 总监 · PostgreSQL ACE"
  },
  "bio": {
    "en": "Computer science PhD with more than 10 years of database experience. Oracle OCM and PostgreSQL ACE certified, and editor of the WeChat account CP's PostgreSQL Kitchen.",
    "zh": "计算机博士，拥有 10 年以上数据库经验，获得 Oracle OCM 与 PostgreSQL ACE 双认证，现任海能达通信 DBA 总监，主理公众号“CP 的 PostgreSQL 厨房”。"
  },
  "avatar": null
}
```

Populate the first 23 records from the paired English and Chinese article sections. Add the six approved records with IDs `cui-peng`, `lei-yanliang`, `shi-jiawei`, `wei-bo`, `fu-chao`, and `yu-zixuan`. Keep each Title to one or two lines and each biography to two to four concise sentences without adding unsupported claims.

- [ ] **Step 4: Run the validator and resolve every duplicate or schema failure**

Run: `node scripts/validate-expert-committee-data.cjs`

Expected: `Validated 29 unique expert profiles.`

The preliminary normalized-name audit already found 23 existing names, 6 added names, and zero direct duplicates. Still compare aliases such as parenthesized nicknames and author labels while transcribing; merge only when name and biography clearly identify the same person.

- [ ] **Step 5: Commit the validated data layer**

```bash
git add src/data/expertCommittee.json scripts/validate-expert-committee-data.cjs
git commit -m "feat: add expert committee profile data"
```

### Task 2: Discover, verify, and add local expert photos

**Files:**
- Create: `static/img/expert-committee/*.{jpg,jpeg,png,webp}`
- Modify: `src/data/expertCommittee.json`
- Temporary evidence: `/private/tmp/ivorysql-expert-avatar-inventory.tsv`

**Interfaces:**
- Consumes: expert IDs and names from `src/data/expertCommittee.json`.
- Produces: a reliable local image path such as `/img/expert-committee/cui-peng.jpg`, or `null` when no reliable photo is found.

- [ ] **Step 1: Search likely user photo locations by Chinese name, English name, and known alias**

Search `/Users/felixzhao/Desktop`, `/Users/felixzhao/Documents`, `/Users/felixzhao/Downloads`, and `/Users/felixzhao/Pictures` with Spotlight filename queries and `find` filename matching. Record every candidate path in `/private/tmp/ivorysql-expert-avatar-inventory.tsv` with the expert ID and confidence level.

Example commands for one expert:

```bash
mdfind 'kMDItemFSName == "*崔鹏*"cdw || kMDItemDisplayName == "*Cui Peng*"cdw'
find /Users/felixzhao/Desktop /Users/felixzhao/Documents /Users/felixzhao/Downloads /Users/felixzhao/Pictures -type f \( -iname '*崔鹏*' -o -iname '*cui*peng*' \)
```

- [ ] **Step 2: Visually inspect every candidate before copying it**

Use image dimensions plus a contact sheet or direct image viewer. Accept a match only when the filename, containing folder, event material, or adjacent labeled assets identify the same person. Do not infer identity solely from appearance.

Run for each candidate:

```bash
sips -g pixelWidth -g pixelHeight /absolute/path/to/candidate.jpg
```

- [ ] **Step 3: Copy reliable matches to stable expert IDs**

Create `static/img/expert-committee/` and copy each accepted binary without overwriting unrelated files. Use the expert ID and preserve a web-safe extension, for example:

```bash
cp /absolute/path/to/verified-photo.jpg static/img/expert-committee/cui-peng.jpg
```

Set the corresponding JSON `avatar` value to `/img/expert-committee/cui-peng.jpg`. Leave `avatar` as `null` for every unmatched expert.

- [ ] **Step 4: Validate asset references and image readability**

Run:

```bash
node scripts/validate-expert-committee-data.cjs
find static/img/expert-committee -type f -maxdepth 1 -print0 | xargs -0 -n1 sips -g pixelWidth -g pixelHeight
```

Expected: the dataset still validates; every copied image reports positive width and height; no JSON path points to a missing file.

- [ ] **Step 5: Commit only verified photos and their data references**

```bash
git add static/img/expert-committee src/data/expertCommittee.json
git commit -m "assets: add expert committee portraits"
```

### Task 3: Implement the responsive committee page and interactions

**Files:**
- Create: `src/pages/expert-advisory-committee.js`
- Create: `src/pages/expert-advisory-committee.module.css`
- Consume: `src/data/expertCommittee.json`

**Interfaces:**
- Consumes: each expert record from Task 1.
- Produces: Docusaurus route `/expert-advisory-committee`.
- Produces: `ExpertCard({ expert, locale, onOpen })` and `MobileBioDialog({ expert, locale, onClose })` within the page module.

- [ ] **Step 1: Implement locale selection and page copy**

Use `useDocusaurusContext()` and normalize the locale with:

```js
const { i18n } = useDocusaurusContext();
const locale = i18n.currentLocale.toLowerCase().startsWith('zh') ? 'zh' : 'en';
```

Define copy for the page title, description, Hero summary, count labels, unordered-list note, hover hint, dialog close label, and empty-avatar label. Render the expert count from `experts.length`, never as a separate hard-coded number.

- [ ] **Step 2: Implement a compact expert card**

Use one semantic button containing only the avatar and name. Render the Title as a sibling, so hovering the Title cannot open the biography.

```jsx
<article className={styles.card}>
  <button
    type="button"
    className={styles.profileTrigger}
    aria-describedby={`${expert.id}-bio`}
    onClick={() => {
      if (window.matchMedia('(hover: none)').matches) onOpen(expert);
    }}
  >
    <span className={styles.avatarFrame}>
      {avatarUrl ? <img src={avatarUrl} alt={expert.name[locale]} /> : <span aria-hidden="true" />}
    </span>
    <span className={styles.name}>{expert.name[locale]}</span>
  </button>
  <span className={styles.title}>{expert.title[locale]}</span>
  <aside id={`${expert.id}-bio`} role="tooltip" className={styles.bioPopover}>
    <strong>{expert.name[locale]}</strong>
    <span>{expert.title[locale]}</span>
    <p>{expert.bio[locale]}</p>
  </aside>
</article>
```

Call `useBaseUrl(expert.avatar || '')` unconditionally inside `ExpertCard` and render the image only when `expert.avatar` is not `null`.

- [ ] **Step 3: Implement mobile dialog state and dismissal**

Store the selected expert in the page component. Add an Escape-key effect only while a profile is open. The dialog must close from its close button and backdrop while clicks inside the panel stop propagation.

```jsx
{selectedExpert ? (
  <div className={styles.dialogBackdrop} role="presentation" onClick={() => setSelectedExpert(null)}>
    <section
      className={styles.mobileDialog}
      role="dialog"
      aria-modal="true"
      aria-labelledby="expert-dialog-title"
      onClick={(event) => event.stopPropagation()}
    >
      <button type="button" onClick={() => setSelectedExpert(null)} aria-label={copy.close}>×</button>
      <h2 id="expert-dialog-title">{selectedExpert.name[locale]}</h2>
      <strong>{selectedExpert.title[locale]}</strong>
      <p>{selectedExpert.bio[locale]}</p>
    </section>
  </div>
) : null}
```

- [ ] **Step 4: Implement the approved visual system in CSS Modules**

Add:

- Deep navy Hero gradient and restrained blue glow.
- Light blue-to-white page background.
- Five-column grid above 1100px, three columns from 700px to 1099px, two columns below 700px.
- 94px circular avatar frames on desktop and 82px below 700px.
- `object-fit: cover; object-position: center;` for all photos.
- Neutral empty-avatar circle with a subtle person silhouette, no generated portrait.
- Popovers that open from `.profileTrigger:hover + .title + .bioPopover` and `.profileTrigger:focus-visible + .title + .bioPopover`.
- Right-edge cards open popovers to the left; popovers never inherit card overflow clipping.
- Bottom dialog only under `@media (hover: none)`; desktop popovers hidden under the same query.
- Reduced transforms and transitions under `@media (prefers-reduced-motion: reduce)`.

- [ ] **Step 5: Build to catch route, hook, JSON, and CSS errors**

Run:

```bash
node scripts/validate-expert-committee-data.cjs
npm run build
```

Expected: data validation passes and Docusaurus builds both locales without React hook, missing route, unresolved asset, or CSS Module errors.

- [ ] **Step 6: Commit the working page**

```bash
git add src/pages/expert-advisory-committee.js src/pages/expert-advisory-committee.module.css
git commit -m "feat: add expert advisory committee page"
```

### Task 4: Add bilingual navigation and production verification

**Files:**
- Modify: `docusaurus.config.js`
- Modify: `i18n/zh-CN/docusaurus-theme-classic/navbar.json`
- Verify: `src/pages/expert-advisory-committee.js`
- Verify: `src/pages/expert-advisory-committee.module.css`

**Interfaces:**
- Consumes: `/expert-advisory-committee` from Task 3.
- Produces: `Resources → Expert Advisory Committee` in English and `资源 → 专家顾问委员会` in Chinese.

- [ ] **Step 1: Add the Resources menu item**

Insert this item next to the existing community-facing Resources entries:

```js
{
  label: 'Expert Advisory Committee',
  to: '/expert-advisory-committee',
},
```

- [ ] **Step 2: Add the Chinese navbar translation**

Add this exact translation entry to `i18n/zh-CN/docusaurus-theme-classic/navbar.json`:

```json
"item.label.Expert Advisory Committee": {
  "message": "专家顾问委员会",
  "description": "Navbar item with label Expert Advisory Committee"
}
```

- [ ] **Step 3: Run final static verification**

Run:

```bash
node scripts/validate-expert-committee-data.cjs
npm run build
git diff --check
```

Expected: 29 unique profiles, successful bilingual build, and no whitespace errors.

- [ ] **Step 4: Run desktop and mobile browser checks**

Start the site on an unused local port. Verify both:

```text
/expert-advisory-committee
/zh-cn/expert-advisory-committee
```

Desktop checks at 1440×1000:

- Five experts per row and 94px circular avatars.
- Hovering an avatar or name opens the correct biography within about 150ms.
- Hovering a Title does not open it.
- Right-edge popovers remain inside the viewport.
- Tab focus opens the correct biography and shows a visible focus ring.

Mobile checks at 390×844:

- Two experts per row and 82px circular avatars.
- Tapping an avatar or name opens the correct bottom dialog.
- Close button, backdrop, and Escape all dismiss the dialog.
- No horizontal scrolling or clipped names.

- [ ] **Step 5: Review the final diff for surgical scope**

Run:

```bash
git status --short
git diff --stat HEAD~3..HEAD
git diff HEAD~3..HEAD -- docusaurus.config.js src/pages src/data scripts static/img/expert-committee i18n/zh-CN/docusaurus-theme-classic/navbar.json
```

Confirm every changed line belongs to the committee page, profile data, avatar assets, validation, or navigation. Leave `.superpowers/` mockup files untracked.

- [ ] **Step 6: Commit navigation and verification fixes**

```bash
git add docusaurus.config.js i18n/zh-CN/docusaurus-theme-classic/navbar.json
git commit -m "feat: link expert committee from resources"
```
