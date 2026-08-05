# Expert Committee Content Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the IvorySQL expert committee roster, alphabetize all 29 experts by English name, add four portraits and one replacement portrait, and add a bilingual email CTA for prospective committee members.

**Architecture:** Keep `src/data/expertCommittee.json` as the single ordered source of truth and render it without runtime sorting. Reuse the existing page, card, tooltip, and responsive styles; add only a member-order note and a lightweight CTA. Process all portraits into the existing 640×640 WebP asset convention and extend the current validation scripts to enforce the new ordering and two-empty-avatar invariant.

**Tech Stack:** Docusaurus 3, React, CSS Modules, Node.js validation scripts, ImageMagick, static WebP assets.

## Global Constraints

- Preserve the existing expert card, portrait, hover tooltip, and mobile dialog behavior.
- Keep exactly 29 unique experts.
- Sort by the complete English `name.en` string using English locale comparison with base sensitivity.
- NkYoung and Yu Zixuan are the only experts without portraits.
- Keep the spelling `Denis Lussier`.
- Use `mailto:ivorysql1213@gmail.com`; do not add a form or backend workflow.
- Convert every new or replacement portrait to 640×640 WebP.

---

## File Structure

- Modify `src/data/expertCommittee.json`: roster copy, alphabetic order, and portrait paths.
- Modify `scripts/validate-expert-committee-data.cjs`: enforce alphabetic order, NkYoung content, and empty-avatar IDs.
- Add/replace `static/img/expert-committee/{denis-lussier,fu-chao,leng-bo,shi-jiawei,xu-xiaoqiang}.webp`: normalized portraits.
- Modify `src/pages/expert-advisory-committee.js`: bilingual order note and join CTA markup.
- Modify `src/pages/expert-advisory-committee.module.css`: CTA presentation only.
- Modify `scripts/verify-expert-committee-build.cjs`: built-page assertions for order, CTA, mail link, and two empty avatars.

### Task 1: Update and alphabetize the roster

**Files:**
- Modify: `scripts/validate-expert-committee-data.cjs`
- Modify: `src/data/expertCommittee.json`

**Interfaces:**
- Consumes: the existing expert record shape `{id, name: {en, zh}, title: {en, zh}, bio: {en, zh}, avatar}`.
- Produces: an ordered 29-record JSON array consumed directly by the page.

- [ ] **Step 1: Add failing roster assertions**

Add the following checks to `scripts/validate-expert-committee-data.cjs` after the uniqueness assertions:

```js
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
```

Replace `expectedIds` with this exact ordered list so membership and intended order are both reviewable:

```js
const expectedIds = [
  'alvaro-hernandez', 'cedric-villemain', 'cui-peng', 'denis-lussier',
  'feng-ruohang', 'fu-chao', 'lei-yanliang', 'leng-bo', 'li-chuancheng',
  'liu-huayang', 'luo-min', 'michael-meskes', 'technical-expert', 'peng-chong',
  'shang-lei', 'shi-jiawei', 'tang-cheng', 'wei-bo', 'wu-yang',
  'xiao-shaocong', 'xiong-cancan', 'xu-ji', 'xu-xiaoqiang', 'xue-xiaogang',
  'yin-haiwen', 'yu-zixuan', 'zhang-chen', 'zhang-dagang', 'zhou-zhengzhong',
];
```

- [ ] **Step 2: Run the validator and confirm the expected failure**

Run: `node scripts/validate-expert-committee-data.cjs`

Expected: FAIL with `Experts must be sorted by English name A-Z` or `NkYoung profile is incomplete`.

- [ ] **Step 3: Update NkYoung and reorder the JSON array**

Set the `technical-expert` record to:

```json
{
  "id": "technical-expert",
  "name": { "en": "NkYoung", "zh": "NkYoung" },
  "title": {
    "en": "PostgreSQL ACE · Head of the PG Xi'an User Group",
    "zh": "PostgreSQL ACE · PG 分会西安用户组负责人"
  },
  "bio": {
    "en": "A PostgreSQL ACE, head of the PG Xi'an User Group, and editor of the WeChat account PostgreSQL Operations Guide.",
    "zh": "PostgreSQL ACE，PG 分会西安用户组负责人，公众号“PostgreSQL 运维之道”主理人。"
  },
  "avatar": null
}
```

Reorder all records to match the exact `expectedIds` sequence above. Do not alter other profile text in this task.

- [ ] **Step 4: Run the validator and confirm it passes**

Run: `node scripts/validate-expert-committee-data.cjs`

Expected: `Validated 29 unique expert profiles.`

- [ ] **Step 5: Commit the roster update**

```bash
git add scripts/validate-expert-committee-data.cjs src/data/expertCommittee.json
git commit -m "content: update and alphabetize expert roster"
```

### Task 2: Add and replace expert portraits

**Files:**
- Modify: `scripts/validate-expert-committee-data.cjs`
- Modify: `src/data/expertCommittee.json`
- Create: `static/img/expert-committee/denis-lussier.webp`
- Replace: `static/img/expert-committee/fu-chao.webp`
- Create: `static/img/expert-committee/leng-bo.webp`
- Create: `static/img/expert-committee/shi-jiawei.webp`
- Create: `static/img/expert-committee/xu-xiaoqiang.webp`

**Interfaces:**
- Consumes: four named desktop images and Denis Lussier's public LinkedIn profile image.
- Produces: five 640×640 WebP files referenced by expert data.

- [ ] **Step 1: Add failing empty-avatar assertions**

Add this check to `scripts/validate-expert-committee-data.cjs`:

```js
const emptyAvatarIds = experts
  .filter(({ avatar }) => avatar === null)
  .map(({ id }) => id);
if (JSON.stringify(emptyAvatarIds) !== JSON.stringify(['technical-expert', 'yu-zixuan'])) {
  throw new Error(`Unexpected empty avatars: ${emptyAvatarIds.join(', ')}`);
}
```

- [ ] **Step 2: Run the validator and confirm the expected failure**

Run: `node scripts/validate-expert-committee-data.cjs`

Expected: FAIL with `Unexpected empty avatars` listing the current six empty-avatar IDs.

- [ ] **Step 3: Download Denis Lussier's public profile image**

Run:

```bash
curl -L 'https://media.licdn.com/dms/image/v2/C5603AQE5-_VkWTLTaQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1516955954323?e=2147483647&v=beta&t=tEzkYXW-qLyDvOUHhHzqAcDBx6ZoXg1HphiywsLlzz4' -o /private/tmp/denis-lussier-linkedin.jpg
```

Verify: `magick identify /private/tmp/denis-lussier-linkedin.jpg` returns a readable raster image.

- [ ] **Step 4: Convert the five source images to the site portrait format**

Run these commands from the worktree:

```bash
magick /private/tmp/denis-lussier-linkedin.jpg -auto-orient -resize '640x640^' -gravity center -extent 640x640 -quality 82 static/img/expert-committee/denis-lussier.webp
magick /Users/felixzhao/Desktop/付超.jpg -auto-orient -resize '640x640^' -gravity center -extent 640x640 -quality 82 static/img/expert-committee/fu-chao.webp
magick /Users/felixzhao/Desktop/冷菠.jpg -auto-orient -resize '640x640^' -gravity center -extent 640x640 -quality 82 static/img/expert-committee/leng-bo.webp
magick /Users/felixzhao/Desktop/施嘉伟.jpg -auto-orient -resize '640x640^' -gravity center -extent 640x640 -quality 82 static/img/expert-committee/shi-jiawei.webp
magick /Users/felixzhao/Desktop/徐小强.jpg -auto-orient -resize '640x640^' -gravity west -extent 640x640 -quality 82 static/img/expert-committee/xu-xiaoqiang.webp
```

Verify:

```bash
magick identify static/img/expert-committee/{denis-lussier,fu-chao,leng-bo,shi-jiawei,xu-xiaoqiang}.webp
```

Expected: every line reports `WEBP 640x640`.

- [ ] **Step 5: Point the four formerly empty profiles at their new assets**

Set these `avatar` values in `src/data/expertCommittee.json`:

```text
denis-lussier  -> /img/expert-committee/denis-lussier.webp
leng-bo         -> /img/expert-committee/leng-bo.webp
shi-jiawei      -> /img/expert-committee/shi-jiawei.webp
xu-xiaoqiang    -> /img/expert-committee/xu-xiaoqiang.webp
```

The existing Fu Chao path remains unchanged because only its file is replaced.

- [ ] **Step 6: Run the data validator**

Run: `node scripts/validate-expert-committee-data.cjs`

Expected: `Validated 29 unique expert profiles.`

- [ ] **Step 7: Visually inspect all five processed portraits**

Open the five WebP files and confirm that the face is visible, upright, not stretched, and acceptably framed within a circular crop. If only framing is wrong, adjust the relevant ImageMagick `-gravity` value and regenerate that one file.

- [ ] **Step 8: Commit the portrait update**

```bash
git add scripts/validate-expert-committee-data.cjs src/data/expertCommittee.json static/img/expert-committee/denis-lussier.webp static/img/expert-committee/fu-chao.webp static/img/expert-committee/leng-bo.webp static/img/expert-committee/shi-jiawei.webp static/img/expert-committee/xu-xiaoqiang.webp
git commit -m "assets: update expert committee portraits"
```

### Task 3: Add the order note and join CTA

**Files:**
- Modify: `scripts/verify-expert-committee-build.cjs`
- Modify: `src/pages/expert-advisory-committee.js`
- Modify: `src/pages/expert-advisory-committee.module.css`

**Interfaces:**
- Consumes: the ordered expert array and existing bilingual `COPY` object.
- Produces: bilingual explanatory copy and a `mailto:` CTA below the member grid.

- [ ] **Step 1: Add failing built-page assertions**

Update `scripts/verify-expert-committee-build.cjs` so both locales expect two empty avatars and the new content:

```js
assert.equal(count(english, 'data-avatar-empty="true"'), 2);
assert.ok(english.includes('Experts are listed alphabetically by English name'));
assert.ok(english.includes('mailto:ivorysql1213@gmail.com'));
assert.ok(english.indexOf('Álvaro Hernández') < english.indexOf('Cédric Villemain'));
assert.ok(english.indexOf('Michael Meskes') < english.indexOf('NkYoung'));

assert.equal(count(chinese, 'data-avatar-empty="true"'), 2);
assert.ok(chinese.includes('专家按英文姓名首字母顺序排列'));
assert.ok(chinese.includes('欢迎更多数据库专家加入'));
assert.ok(chinese.includes('mailto:ivorysql1213@gmail.com'));
```

- [ ] **Step 2: Build and confirm the new assertions fail**

Run: `npm run build && node scripts/verify-expert-committee-build.cjs`

Expected: the build succeeds, then the verifier fails because the order note and email CTA are absent.

- [ ] **Step 3: Add bilingual copy**

Extend both `COPY.en` and `COPY.zh` with these keys:

```js
orderNote: 'Experts are listed alphabetically by English name, with no ranking implied.',
joinTitle: 'Join the IvorySQL Expert Advisory Committee',
joinDescription: 'We welcome more database experts to help advance the open-source database ecosystem with us.',
joinAction: 'Contact us by email',
```

```js
orderNote: '专家按英文姓名首字母顺序排列，排名不分先后。',
joinTitle: '欢迎加入 IvorySQL 专家顾问委员会',
joinDescription: '欢迎更多数据库专家加入 IvorySQL 专家顾问委员会，与我们共同推动开源数据库生态发展。',
joinAction: '发送邮件联系我们',
```

Render `copy.orderNote` before the current hover instruction in the section description. Add this markup immediately after the expert grid:

```jsx
<aside className={styles.joinCommittee}>
  <div>
    <h2>{copy.joinTitle}</h2>
    <p>{copy.joinDescription}</p>
  </div>
  <a className={styles.joinAction} href="mailto:ivorysql1213@gmail.com">
    {copy.joinAction}
    <span aria-hidden="true">→</span>
  </a>
</aside>
```

- [ ] **Step 4: Add focused CTA styles**

Add CSS Module rules that use the existing page variables and responsive breakpoint:

```css
.joinCommittee {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  margin-top: 34px;
  padding: 28px 30px;
  border: 1px solid rgba(47, 116, 255, 0.18);
  border-radius: 20px;
  background: linear-gradient(135deg, #eef4ff 0%, #f8fbff 100%);
}

.joinCommittee h2 { margin: 0 0 8px; font-size: 1.35rem; }
.joinCommittee p { margin: 0; color: var(--committee-muted); }

.joinAction {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  padding: 11px 16px;
  border-radius: 999px;
  color: #fff;
  background: var(--committee-accent);
  font-weight: 800;
  text-decoration: none;
}

.joinAction:hover { color: #fff; text-decoration: none; background: #1f63eb; }
```

Inside the existing `@media (max-width: 699px)` block, add:

```css
.joinCommittee { align-items: flex-start; flex-direction: column; padding: 24px 20px; }
```

- [ ] **Step 5: Build and run all committee verifiers**

Run:

```bash
node scripts/validate-expert-committee-data.cjs
npm run build
node scripts/verify-expert-committee-build.cjs
node scripts/test-expert-popover-position.cjs
git diff --check
```

Expected: all commands exit 0; the existing repository-wide Docusaurus warnings may remain unchanged.

- [ ] **Step 6: Review React and accessibility details**

Confirm the CTA is static markup without new state or effects, its mail link has descriptive visible text, the decorative arrow is `aria-hidden`, and existing keyboard/touch profile interactions remain unchanged.

- [ ] **Step 7: Commit the page update**

```bash
git add scripts/verify-expert-committee-build.cjs src/pages/expert-advisory-committee.js src/pages/expert-advisory-committee.module.css
git commit -m "feat: add expert committee join callout"
```

### Task 4: Verify the real IvorySQL website preview

**Files:**
- Verify only: `build/zh-cn/expert-advisory-committee/index.html`

**Interfaces:**
- Consumes: the completed Docusaurus build.
- Produces: a user-facing local preview with the final website navigation, footer, roster, portraits, tooltips, and CTA.

- [ ] **Step 1: Start or refresh the existing website preview**

Serve the current `build` directory from the feature worktree and open:

```text
http://127.0.0.1:4176/zh-cn/expert-advisory-committee/
```

- [ ] **Step 2: Verify roster and assets in the browser**

Confirm the first three members are Alvaro Hernandez, Cédric Villemain, and Cui Peng; Michael Meskes appears immediately before NkYoung; only NkYoung and Yu Zixuan display empty avatars; and the five new or replacement portraits render successfully.

- [ ] **Step 3: Verify interaction and CTA**

At desktop width, hover profiles near the left, right, top, and bottom viewport edges and confirm every biography stays above cards and inside the viewport. At mobile width, confirm tapping a profile opens the existing dialog. Confirm the order note is visible and the CTA email link targets `mailto:ivorysql1213@gmail.com`.

- [ ] **Step 4: Confirm the branch is clean**

Run: `git status --short`

Expected: no output.
