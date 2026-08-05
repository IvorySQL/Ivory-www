# Expert Portrait Replacements Design

## Goal

Replace nine Expert Advisory Committee portraits with the user-provided photographs stored at the Desktop root, while keeping the existing IvorySQL card style and making face sizes visually consistent.

## Source-to-profile mapping

| Desktop source | Expert ID | Website asset |
| --- | --- | --- |
| `/Users/felixzhao/Desktop/Álvaro Hernández.png` | `alvaro-hernandez` | `static/img/expert-committee/alvaro-hernandez.webp` |
| `/Users/felixzhao/Desktop/崔鹏.jpg` | `cui-peng` | `static/img/expert-committee/cui-peng.webp` |
| `/Users/felixzhao/Desktop/刘华阳.png` | `liu-huayang` | `static/img/expert-committee/liu-huayang.webp` |
| `/Users/felixzhao/Desktop/彭冲.png` | `peng-chong` | `static/img/expert-committee/peng-chong.webp` |
| `/Users/felixzhao/Desktop/熊灿灿.png` | `xiong-cancan` | `static/img/expert-committee/xiong-cancan.webp` |
| `/Users/felixzhao/Desktop/白鳝.png` | `xu-ji` | `static/img/expert-committee/xu-ji.webp` |
| `/Users/felixzhao/Desktop/徐小强.png` | `xu-xiaoqiang` | `static/img/expert-committee/xu-xiaoqiang.webp` |
| `/Users/felixzhao/Desktop/尹海文.png` | `yin-haiwen` | `static/img/expert-committee/yin-haiwen.webp` |
| `/Users/felixzhao/Desktop/德哥.JPG` | `zhou-zhengzhong` | `static/img/expert-committee/zhou-zhengzhong.webp` |

## Image treatment

- Desktop source files remain untouched.
- Produce square 640×640 WebP website assets.
- Use head-and-shoulders framing as the baseline; retain a microphone, hand gesture, or limited upper body where it helps identify the source photograph.
- Preserve a natural photographic background when present. Preserve useful transparency for cutout PNG sources so the existing avatar-frame background remains visible.
- Do not use generative editing, face alteration, background invention, retouching, or identity changes.
- Re-tune the existing optional avatar scale/focal-position metadata for the seven profiles that already use it. Cui Peng and Zhou Zhengzhong use centered default framing unless visual QA shows a small adjustment is required.

## Unchanged behavior

Do not change expert names, titles, biographies, ordering, placeholders, card dimensions, bilingual copy, tooltip/dialog behavior, navigation, or the join CTA.

## Verification

- Confirm all nine output files are WebP and exactly 640×640.
- Confirm the nine website files are derived from their mapped Desktop source files and all other portrait files are byte-for-byte unchanged.
- Run the expert data, interaction, popover-position, production-build, and bilingual SSR verifiers.
- At desktop width 1280 and narrow width 390, visually confirm every replacement is loaded, centered, recognizable, ringed consistently, and comparable in face size to adjacent portraits without clipping the head or chin.
- Confirm hover biography and narrow-screen dialog behavior remain intact after replacement.
