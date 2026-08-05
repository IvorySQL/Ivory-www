# Expert Portrait Framing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enlarge and re-center seven committee portraits whose subjects currently appear too small in the circular avatar frame.

**Architecture:** Add optional `avatarFraming` metadata to affected expert records and pass it to the existing image through CSS custom properties. The shared image rule applies per-profile scale and focal position while the existing circular frame clips overflow; source image files and unaffected profiles remain unchanged.

**Tech Stack:** React, Docusaurus, CSS Modules, JSON, Node.js validation scripts

## Global Constraints

- Adjust only `alvaro-hernandez`, `liu-huayang`, `peng-chong`, `xiong-cancan`, `xu-ji`, `xu-xiaoqiang`, and `yin-haiwen`.
- Do not modify source photographs, shared avatar dimensions, expert ordering, biographies, placeholders, or biography interactions.
- Use restrained head-and-shoulders framing without cropping the top of the head or chin.
- Do not add dependencies.

---

### Task 1: Add and verify per-profile portrait framing

**Files:**
- Modify: `src/data/expertCommittee.json`
- Modify: `src/pages/expert-advisory-committee.js:112-121`
- Modify: `src/pages/expert-advisory-committee.module.css:253-256`
- Modify: `scripts/validate-expert-committee-data.cjs`
- Test: `scripts/test-expert-committee-interaction.cjs`

**Interfaces:**
- Consumes: expert records with optional `avatarFraming: { scale: number, position: string }`
- Produces: CSS custom properties `--avatar-scale` and `--avatar-position` on portrait `<img>` elements

- [ ] **Step 1: Extend the source-level test with failing framing assertions**

Add checks to `scripts/test-expert-committee-interaction.cjs` that read the page and CSS source and assert the framing interface exists:

```js
assert.match(pageSource, /--avatar-scale/);
assert.match(pageSource, /--avatar-position/);
assert.match(cssSource, /transform:\s*scale\(var\(--avatar-scale, 1\)\)/);
assert.match(cssSource, /transform-origin:\s*var\(--avatar-position, center\)/);
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `node scripts/test-expert-committee-interaction.cjs`

Expected: FAIL because the page and CSS do not yet expose portrait framing variables.

- [ ] **Step 3: Add framing metadata and validation**

Add `avatarFraming` only to the seven approved records, starting with these browser-tuning values:

```json
"alvaro-hernandez": { "scale": 1.5, "position": "50% 30%" },
"liu-huayang": { "scale": 1.8, "position": "50% 32%" },
"peng-chong": { "scale": 2.4, "position": "48% 34%" },
"xiong-cancan": { "scale": 2.2, "position": "50% 32%" },
"xu-ji": { "scale": 2.2, "position": "50% 32%" },
"xu-xiaoqiang": { "scale": 2.2, "position": "50% 30%" },
"yin-haiwen": { "scale": 1.9, "position": "50% 30%" }
```

In `scripts/validate-expert-committee-data.cjs`, assert that optional framing metadata:

```js
if (expert.avatarFraming) {
  assert.ok(expert.avatar, `${expert.id} cannot frame a missing avatar`);
  assert.ok(
    Number.isFinite(expert.avatarFraming.scale) &&
      expert.avatarFraming.scale >= 1 &&
      expert.avatarFraming.scale <= 3,
    `${expert.id} has an invalid avatar scale`,
  );
  assert.match(
    expert.avatarFraming.position,
    /^(?:100|\d{1,2})% (?:100|\d{1,2})%$/,
    `${expert.id} has an invalid avatar position`,
  );
}
```

Also assert the exact framed ID set equals the seven IDs in Global Constraints, preventing accidental changes to other portraits.

- [ ] **Step 4: Apply framing variables in the existing image renderer and CSS**

Set the variables only when metadata exists:

```jsx
style={
  expert.avatarFraming
    ? {
        '--avatar-scale': expert.avatarFraming.scale,
        '--avatar-position': expert.avatarFraming.position,
      }
    : undefined
}
```

Extend the existing image CSS without changing frame dimensions:

```css
.avatarFrame img {
  object-fit: cover;
  object-position: var(--avatar-position, center);
  transform: scale(var(--avatar-scale, 1));
  transform-origin: var(--avatar-position, center);
}
```

- [ ] **Step 5: Run focused validation and tests**

Run:

```bash
node scripts/validate-expert-committee-data.cjs
node scripts/test-expert-committee-interaction.cjs
node scripts/test-expert-popover-position.cjs
```

Expected: all commands exit 0; validator reports 29 unique profiles.

- [ ] **Step 6: Build and verify both locales**

Run:

```bash
npm run build
node scripts/verify-expert-committee-build.cjs
git diff --check
```

Expected: production build exits 0; bilingual verifier confirms 29 ordered experts, join CTA, and two empty avatars; diff check prints no output.

- [ ] **Step 7: Tune the seven portraits in the real preview**

At desktop width 1280 and narrow width 390, inspect all seven circular portraits. Adjust only their `scale` and `position` values until each face is comparable in size to adjacent portraits, centered, and has visible head/chin margins. Re-run Steps 5 and 6 after any data change, then reload the preview and confirm an unaffected control portrait such as `cedric-villemain` retains scale 1 and centered framing.

- [ ] **Step 8: Commit**

```bash
git add src/data/expertCommittee.json src/pages/expert-advisory-committee.js src/pages/expert-advisory-committee.module.css scripts/validate-expert-committee-data.cjs scripts/test-expert-committee-interaction.cjs
git commit -m "fix: improve expert portrait framing"
```
