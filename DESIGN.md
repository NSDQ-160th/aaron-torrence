# DESIGN — Aaron Torrence studio site

Art direction for the official **personal** site. Not a Kairos landing page. Not a sub-route of kairosrejuvenation.com.

A stranger from LinkedIn should think **director / photographer with range**, then discover he also built a clinic.

This file expands `DESIGN_PROMPT.md`. Implementation lives on `feat/lusion-home`. Figma is not connected in this environment; screens at 1440 and 390 are captured from the live app into `design/screens/`. Hero concepts are in `design/concepts/` and are **not** brand marks.

---

## 1. Identity on screen (order is the brief)

1. **Aaron Torrence** — filmmaker, photographer, media-company owner, operator
2. Other chapters — only after he confirms names
3. **Kairos Rejuvenation** — one venture, built and operated with Dr. Kristina Torrence

Never: teal-pink lotus, “Book a complimentary consult,” Practice Better, membership pricing, med-spa photography, Kairos sky `#34b4f4` as the identity color.

---

## 2. World

Black stage. **Light is the brand.** Tungsten key + cool rim, grain, anamorphic suggestion held in check. Not neon SaaS.

Signature object (v1, committed): a **floating analog lens** — brushed metal barrel, glass element, gold focus rings, dust motes. Scroll dollys past it. Pointer gravity on nearby fragments. Reduced-motion: freeze camera, keep the grade.

Code model ships now; a Blender GLB replaces it before launch (`PLAN.md` §D). Concepts in `design/concepts/` show the target look.

---

## 3. Token sheet

### Color

| Token | Hex | Use |
| --- | --- | --- |
| Void | `#07080c` | Page / stage |
| Stage | `#10131a` | Surfaces |
| Bone | `#f3eee4` | Type |
| Fog / steel | `#8b93a2` | Secondary type |
| Heat | `#e2b15a` | Rare accent, eyebrows |
| Tungsten | `#ffb067` | Key light, italics |
| Sky | `#34b4f4` | **Kairos card only** |

Contrast: bone on void for headlines. Fog is AA on void at 16px+. Scrim behind type over WebGL.

### Type

| Role | Family | Notes |
| --- | --- | --- |
| Display | Instrument Serif | High-contrast, real italics. Huge name. |
| UI | Figtree | Compact grotesque. Whisper labels. |
| License | Google Fonts | Swap to a licensed retail pair if Aaron prefers |

Scale (desktop): name `clamp(3.4rem, 10vw, 8rem)`; section `~3.4rem`; whisper `0.68rem` / `0.28em` tracking. Mobile keeps the same hierarchy, never a squashed 3D toy.

### Motion

| Token | Value |
| --- | --- |
| Curve | `cubic-bezier(0.16, 1, 0.3, 1)` — editorial, not bounce |
| Page | Dip to black, 280ms |
| Scroll | The edit. Camera poses: hero → reel → work → approach → about → contact |
| Hover | Titles reveal; iris cursor on work |
| Reduced motion | No Lenis, no camera move, keep grade + grain |

### Sound

| Policy | Rule |
| --- | --- |
| Default | **OFF** |
| Mute | Always in chrome; disabled until a real reel / licensed cue exists |
| Cue | Epidemic Sound or Artlist only — never ripped audio |
| Captions | Required if a reel has dialogue |

---

## 4. Grid & chrome

Asymmetric. Big empty stage. Work titles **small until hover**. Desktop-first cinematic.

Chrome: `AT` · Work · About · Contact · Mute. No Book.

Cursor: default bone; over work, a 22px iris/shutter ring.

Footer: name, year, “studio site.” Email when Aaron supplies it. Indexes via nav.

---

## 5. Scroll order

1. **Slate / load** — film counter `00–24`
2. **Hero** — AARON TORRENCE / Filmmaker. Photographer. Builder. Whispers: FILM · STILL · MEDIA · SYSTEMS
3. **Reel** — plate labeled REEL FORTHCOMING until a real cut
4. **Selected work** — Film · Still · Media · Ventures. `TITLE · ROLE · YEAR` slots. No invented credits
5. **Approach** — Light / Story / Systems. No clinic FAQ
6. **About** — person first; marriage + Kairos as biography
7. **Contact** — Aaron first; clinic address in a ventures footnote (sky allowed there only)

---

## 6. Imagery

- Real frames from Aaron’s camera when provided
- Until then: abstract light studies (smoke, tungsten, glass, grain)
- 16:9 or 2.39. Not a square IG grid
- Real portrait: `public/aaron.jpg`
- No generated face, no other people’s films, no smiling-clinic stock

---

## 7. Mobile & a11y

- One simplified object (already: lower DPR, no bloom)
- Type stays large; work is a vertical filmstrip
- Targets ≥ 44px; Mute still present
- Skip link to content; keyboard reaches Work
- `prefers-reduced-motion` honored

---

## 8. Screens (Figma equivalent)

Figma MCP is not authenticated here. Capture set:

| File | Viewport |
| --- | --- |
| `design/screens/home-1440.png` | 1440×900 |
| `design/screens/home-390.png` | 390×844 |
| `design/screens/work-1440.png` | 1440×900 |
| `design/screens/work-390.png` | 390×844 |
| `design/screens/about-1440.png` | 1440×900 |
| `design/screens/about-390.png` | 390×844 |
| `design/screens/contact-1440.png` | 1440×900 |
| `design/screens/contact-390.png` | 390×844 |

When Figma is connected, these are the frames to rebuild as desktop 1440 / mobile 390.

---

## 9. Concept stills (not brand)

See `design/concepts/README.md`. Viewport-style lighting studies of the analog lens. Do not use as logos or OG marks.

---

## 10. Inbox

Aaron drops files in `inbox/` — list in `inbox/README.md`.
