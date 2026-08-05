# Expert Portrait Replacements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace nine committee portraits with the exact Desktop-root photographs supplied by the user and tune their final circular framing.

**Architecture:** Normalize each mapped source into a deterministic 640×640 WebP while preserving its photographic background or alpha channel. Reuse the existing per-profile scale/focal-position interface for the seven already-framed profiles, and update the SSR expectations to the final browser-tuned values.

**Tech Stack:** ImageMagick, WebP, JSON, React/Docusaurus build verification, Node.js scripts

## Global Constraints

- Use only the nine exact Desktop-root source files listed in the approved design.
- Desktop source files are read-only and must remain byte-for-byte unchanged.
- Do not use generative editing, face alteration, background invention, retouching, or identity changes.
- Output assets must be WebP and exactly 640×640.
- Do not change names, titles, biographies, ordering, placeholders, card dimensions, bilingual copy, navigation, interactions, or CTA.
- All non-target portrait assets must remain byte-for-byte unchanged.
- Do not add dependencies.

---

### Task 1: Normalize, replace, and visually tune nine portraits

**Files:**
- Modify: `static/img/expert-committee/alvaro-hernandez.webp`
- Modify: `static/img/expert-committee/cui-peng.webp`
- Modify: `static/img/expert-committee/liu-huayang.webp`
- Modify: `static/img/expert-committee/peng-chong.webp`
- Modify: `static/img/expert-committee/xiong-cancan.webp`
- Modify: `static/img/expert-committee/xu-ji.webp`
- Modify: `static/img/expert-committee/xu-xiaoqiang.webp`
- Modify: `static/img/expert-committee/yin-haiwen.webp`
- Modify: `static/img/expert-committee/zhou-zhengzhong.webp`
- Modify: `src/data/expertCommittee.json`
- Modify: `scripts/verify-expert-committee-build.cjs`

**Interfaces:**
- Consumes: nine exact Desktop-root source photographs from the design specification
- Produces: nine 640×640 WebP website assets and final `avatarFraming` values for the existing seven framed IDs

- [ ] **Step 1: Capture immutable source and unaffected-asset evidence**

Record SHA-256 hashes for all nine Desktop sources and all 27 current website portrait assets in the plan's ignored SDD workspace. The report must include the source hashes and identify the eighteen non-target website hashes that must remain unchanged.

Run:

```bash
shasum -a 256 "/Users/felixzhao/Desktop/Álvaro Hernández.png" "/Users/felixzhao/Desktop/崔鹏.jpg" "/Users/felixzhao/Desktop/刘华阳.png" "/Users/felixzhao/Desktop/彭冲.png" "/Users/felixzhao/Desktop/熊灿灿.png" "/Users/felixzhao/Desktop/白鳝.png" "/Users/felixzhao/Desktop/徐小强.png" "/Users/felixzhao/Desktop/尹海文.png" "/Users/felixzhao/Desktop/德哥.JPG"
shasum -a 256 static/img/expert-committee/*.webp
```

- [ ] **Step 2: Generate normalized candidates outside the repository**

Create a temporary directory and generate all nine candidates with these exact deterministic operations:

```bash
portrait_tmp_dir="$(mktemp -d)"
magick "/Users/felixzhao/Desktop/Álvaro Hernández.png" -auto-orient -resize '640x640^' -gravity center -extent 640x640 -strip -quality 88 -define webp:method=6 "$portrait_tmp_dir/alvaro-hernandez.webp"
magick "/Users/felixzhao/Desktop/崔鹏.jpg" -auto-orient -resize '640x640^' -gravity center -extent 640x640 -strip -quality 88 -define webp:method=6 "$portrait_tmp_dir/cui-peng.webp"
magick "/Users/felixzhao/Desktop/刘华阳.png" -auto-orient -resize '640x640^' -gravity center -extent 640x640 -strip -quality 88 -define webp:method=6 "$portrait_tmp_dir/liu-huayang.webp"
magick "/Users/felixzhao/Desktop/彭冲.png" -auto-orient -resize '640x640^' -gravity center -extent 640x640 -strip -quality 88 -define webp:method=6 "$portrait_tmp_dir/peng-chong.webp"
magick "/Users/felixzhao/Desktop/熊灿灿.png" -auto-orient -resize '640x640^' -gravity center -extent 640x640 -strip -quality 88 -define webp:method=6 "$portrait_tmp_dir/xiong-cancan.webp"
magick "/Users/felixzhao/Desktop/白鳝.png" -auto-orient -resize '640x640^' -gravity center -extent 640x640 -strip -quality 88 -define webp:method=6 "$portrait_tmp_dir/xu-ji.webp"
magick "/Users/felixzhao/Desktop/徐小强.png" -auto-orient -resize '640x640^' -gravity center -extent 640x640 -strip -quality 88 -define webp:method=6 "$portrait_tmp_dir/xu-xiaoqiang.webp"
magick "/Users/felixzhao/Desktop/尹海文.png" -auto-orient -resize '640x640^' -gravity center -extent 640x640 -strip -quality 88 -define webp:method=6 "$portrait_tmp_dir/yin-haiwen.webp"
magick "/Users/felixzhao/Desktop/德哥.JPG" -auto-orient -resize '640x640^' -gravity center -extent 640x640 -strip -quality 88 -define webp:method=6 "$portrait_tmp_dir/zhou-zhengzhong.webp"
```

- [ ] **Step 3: Verify the replacement test is RED before copying**

Compare every temporary candidate with its current website asset using `cmp -s`. Expected: all nine comparisons return non-zero, proving the website still contains the old portraits. Verify the Desktop source hashes still match Step 1.

- [ ] **Step 4: Replace only the nine mapped website assets**

Copy the nine temporary WebPs over their exact mapped files in `static/img/expert-committee/`. Do not modify any other image.

- [ ] **Step 5: Verify binary replacement is GREEN**

Run `cmp -s` for each temporary candidate against its website destination. Expected: all nine return zero. Run ImageMagick identification:

```bash
magick identify -format '%f %m %wx%h %[channels]\n' static/img/expert-committee/{alvaro-hernandez,cui-peng,liu-huayang,peng-chong,xiong-cancan,xu-ji,xu-xiaoqiang,yin-haiwen,zhou-zhengzhong}.webp
```

Expected: nine `WEBP 640x640` records. Re-hash all 27 website portraits and prove the eighteen non-target hashes match Step 1.

- [ ] **Step 6: Apply initial framing values for browser tuning**

Keep the existing seven-ID framing contract and start with these values in `src/data/expertCommittee.json`:

```json
"alvaro-hernandez": { "scale": 1, "position": "50% 50%" },
"liu-huayang": { "scale": 2, "position": "50% 5%" },
"peng-chong": { "scale": 2, "position": "50% 20%" },
"xiong-cancan": { "scale": 1.8, "position": "50% 25%" },
"xu-ji": { "scale": 1.6, "position": "50% 20%" },
"xu-xiaoqiang": { "scale": 2.2, "position": "50% 22%" },
"yin-haiwen": { "scale": 1.8, "position": "50% 0%" }
```

Update the exact framing-value expectations in `scripts/verify-expert-committee-build.cjs` whenever browser tuning changes one of these values. Cui Peng and Zhou Zhengzhong remain unframed centered controls unless the preview demonstrates that a framing record is essential; adding one requires updating the exact framed-ID validator and SSR count in the same commit.

- [ ] **Step 7: Run focused validation and build**

Run:

```bash
node scripts/validate-expert-committee-data.cjs
node scripts/test-expert-committee-interaction.cjs
node scripts/test-expert-popover-position.cjs
npm run build
node scripts/verify-expert-committee-build.cjs
git diff --check
```

Expected: all commands exit 0; validator reports 29 profiles; bilingual verifier confirms 29 ordered experts, CTA, two placeholders, and the seven exact rendered framing values.

- [ ] **Step 8: Tune and verify the real preview**

At desktop 1280×1000 and narrow 390×844, inspect all nine portraits. Change only `scale` and `position` for the seven existing framed profiles until faces are comparable to adjacent portraits, centered, and retain visible head/chin margins. Confirm Cui Peng and Zhou Zhengzhong remain acceptable at default centering. Verify each avatar retains the white ring, each image loads, hover biographies still remain inside the viewport, and narrow selection still opens/closes the accessible dialog. After any tuning, rerun Step 7.

- [ ] **Step 9: Final integrity check and commit**

Verify Desktop source hashes still match Step 1, the eighteen non-target website hashes are unchanged, and `git status --short` lists only the nine mapped assets, data, SSR verifier, and this task's already-committed documentation history.

```bash
git add static/img/expert-committee/alvaro-hernandez.webp static/img/expert-committee/cui-peng.webp static/img/expert-committee/liu-huayang.webp static/img/expert-committee/peng-chong.webp static/img/expert-committee/xiong-cancan.webp static/img/expert-committee/xu-ji.webp static/img/expert-committee/xu-xiaoqiang.webp static/img/expert-committee/yin-haiwen.webp static/img/expert-committee/zhou-zhengzhong.webp src/data/expertCommittee.json scripts/verify-expert-committee-build.cjs
git commit -m "assets: replace expert committee portraits"
```
