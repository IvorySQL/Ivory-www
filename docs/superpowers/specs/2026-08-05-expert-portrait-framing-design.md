# Expert Portrait Framing Adjustment Design

## Goal

Make experts whose subjects appear too small in the circular avatar frame visually consistent with the rest of the committee, without changing the shared avatar size or altering source photographs.

## Scope

Apply individual framing adjustments only to these seven profiles:

- Alvaro Hernandez (`alvaro-hernandez`)
- Liu Huayang (`liu-huayang`)
- Peng Chong (`peng-chong`)
- Xiong Cancan (`xiong-cancan`)
- Xu Ji (`xu-ji`)
- Xu Xiaoqiang (`xu-xiaoqiang`)
- Yin Haiwen (`yin-haiwen`)

All other portraits, placeholders, card dimensions, biographies, ordering, and hover/dialog behavior remain unchanged.

## Design

Store optional portrait framing metadata on the affected expert records: a scale value and, only where needed, an object-position value. The expert card applies those values as inline CSS custom properties. The existing circular frame continues to clip the image, while the image uses the profile-specific scale and focal position.

Use restrained head-and-shoulders framing. Faces should be visibly larger, remain fully inside the circle, and avoid cropping the top of the head or chin. Each of the seven profiles is tuned independently because their source compositions differ.

## Verification

- Data validation accepts framing metadata only on records with an avatar and checks safe numeric/string bounds.
- Existing roster, avatar, interaction, and bilingual build checks continue to pass.
- Desktop and narrow-screen browser previews confirm all seven faces are centered, consistently sized, and not clipped.
- A final visual comparison confirms unaffected portraits retain their current framing.
