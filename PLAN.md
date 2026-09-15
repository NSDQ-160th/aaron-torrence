# PLAN — Aaron Torrence personal site

Lusion-class studio site for a person. Not a Kairos Rejuvenation subpage.

Identity order (locked):

1. Aaron Torrence — filmmaker, photographer, media-company owner, operator
2. Other chapters — only after Aaron confirms names
3. Kairos Rejuvenation — one venture card, built and operated with Dr. Kristina Torrence

He is not a prescribing clinician. Coaching, if it appears, is a footnote: lifestyle support only.

---

## A. Information architecture

Single Vite SPA. HTML sections drive 3D camera anchors. Routes:

| Path | Purpose |
| --- | --- |
| `/` | Immersive home: loader → hero → reel plate → selected work → approach → about tease → contact |
| `/work` | Index across Film · Still · Media · Ventures |
| `/work/:slug` | Case. Placeholder until Aaron supplies stills / cuts |
| `/about` | Person. Partnership + Kairos as biography, not the headline |
| `/contact` | Aaron first. Clinic only in a ventures footnote |

Chrome: `AT` mark + Work + About + Contact. No Book, no Practice Better, no clinic phone in the header.

Page transitions: dip to black, 240–360ms. Sound default off.

---

## B. Content inventory

Known (publishable)

- Legal name: Aaron Torrence
- Roles we may state: filmmaker, photographer, builder / operator; co-owner of Kairos Rejuvenation with his wife Dr. Kristina Torrence, MD, MPH
- Portrait: `aaron.jpg` (real photo he supplied)
- Kairos: physician-led clinic in Hagerstown; he runs operations and health coaching (lifestyle only)
- Clinic URL: https://www.kairosrejuvenation.com
- Clinic contact (footnote only): 12916 Conamar Dr, Suite 105, Hagerstown, MD 21742 · 301.798.6025 · contact@kairosrejuvenation.com

TODO — Aaron must supply (do not invent)

- [ ] Short bio (2 sentences) in his voice
- [ ] Longer about bio
- [ ] Media company **name** + public URL
- [ ] Personal email (not only the clinic inbox)
- [ ] Preferred domain (do not buy or invent DNS)
- [ ] LinkedIn / IMDb / Vimeo / Instagram — only if they exist and he wants them
- [ ] 6–12 work rows: Title · Role (dir / DP / photo / producer / editor) · Year · one sentence · stills · reel cut
- [ ] 30–90s reel (1080p) + 3 stills from it
- [ ] 8–12 photographs he actually made
- [ ] Process / on-set photos
- [ ] Confirmation of any other chapter (units, prior companies, film titles)

Until those land: labeled plates (`TITLE · ROLE · YEAR`, `REEL FORTHCOMING`). Abstract light studies may dress empty tiles. No fake credits, no generated face.

Inbox: drop files in `inbox/` (see `inbox/README.md`).

---

## C. Technical architecture

Replace the retired static Kairos profile **in this repo** on `feat/lusion-home`. Old files live in `archive/kairos-profile/`.

```
index.html                 Vite shell + DOM sections
src/main.ts                boot: router, Lenis, GSAP, WebGL
src/router.ts              history API
src/copy.ts                locked copy + TODO markers
src/work.ts                work index data
src/styles.css             fallback + overlay UI
src/webgl/engine.ts        renderer, composer, rAF, DPR, visibility
src/webgl/lens.ts          signature analog lens (code model → GLB later)
src/webgl/materials.ts     glass / metal / grain shaders
src/webgl/scroll-map.ts    section → camera
public/                    aaron.jpg, plates, favicon, _redirects
```

Stack (locked)

- Vite 5 + TypeScript
- three r170+
- Vanilla Three (no R3F unless a later slice needs it)
- GSAP 3 + ScrollTrigger
- Lenis
- `three/addons` EffectComposer (bloom + custom grain) — not `postprocessing`
- Native `<audio>` / none until a licensed cue exists
- No Next.js, no Vercel

Host: Cloudflare Pages from `dist/`. SPA fallback via `public/_redirects`. GitHub Pages is a last-resort static fallback (bad for GLB/HDR). Preview: `npx wrangler pages deploy dist` when Aaron connects the Cloudflare project — do not invent a domain.

3D contract

1. Full-viewport canvas under the DOM
2. Scroll-linked camera: hero → work → about
3. Signature object: analog lens (barrel + glass + aperture), custom material — not a stock torus
4. Pointer: hover attract / parallax on nearby fragments
5. Loader with progress; 3D first paint target < 3s on a laptop
6. Mute control present; disabled until a real reel/cue exists
7. No-WebGL + `prefers-reduced-motion` fallback (same IA, no canvas)

v1 will **not** ship cloth, path-traced cars, WebGPU, or Houdini caches.

---

## D. Asset pipeline

Now (v1)

- Code-built lens (lathe + rings + custom shaders) so we can ship without Blender
- Real portrait: `public/aaron.jpg`
- Placeholder stills: abstract light studies in `public/plates/` (not Aaron’s work — labeled as studies)
- No 20MB JPEGs, no raw 4K in git

Next (when Aaron / a DCC is in the loop)

1. Blockout in Blender (lens / film-gate / viewfinder — pick one, replace the code model)
2. UV, bake AO + curvature, metal/roughness
3. Export GLB, `gltf-transform` (Draco + KTX2)
4. Budget: hero GLB < 3 MB compressed
5. Stills: Cloudflare Images or Squoosh → WebP/AVIF, 2K max unless a lazy 4K hero still
6. Reel: Vimeo or Cloudflare Stream — never the repo

Spline is an acceptable shortcut if Aaron does not want Blender.

---

## E. Performance budget

- Initial JS < 350 KB gzip if possible
- 60fps desktop target; 30fps min last-gen iPhone Safari
- Pause rAF when `document.hidden`
- Cap DPR at 1.5 (2 on capable desktop); drop to 1 on low GPU / thermal
- Skip bloom on mobile / `save-data`
- Texture max 2K
- Particle count scales down on `matchMedia('(pointer: coarse)')`
- Reduced-motion: freeze camera, keep grade, no Lenis smoothing

---

## F. External apps

See `APPS.md`. Implement integrations only when needed. v1 uses GitHub, Node, Google Fonts, Cloudflare Pages (when connected). No contact-form backend until personal email + Turnstile exist.

---

## G. Risk

| Risk | Mitigation |
| --- | --- |
| WebGL fails or is blocked | DOM fallback is the real site: type, work list, about, contact |
| Mid-phone GPU | Simplified lens, no bloom, fewer motes, optional baked loop later |
| `prefers-reduced-motion` | No scroll-linked camera; static hero grade |
| Missing credits / reel | Labeled plates; do not invent titles |
| Large assets | R2 / Images / Stream; keep git lean |
| Kairos voice leaking | Palette, nav, and primary CTA are Aaron-first; sky teal only inside the Kairos card |
| GitHub Pages + GLB | Prefer Cloudflare Pages; Pages is fallback only |

---

## Implementation order

1. Scaffold Vite + TS
2. Fallback HTML/CSS (this must already feel like a director’s site)
3. WebGL shell + signature lens
4. Scroll map
5. Work grid
6. About
7. Contact
8. Loader
9. Perf pass

---

## Success

A stranger from LinkedIn should read **director / photographer with range**, then discover he also built a clinic — not the reverse.
