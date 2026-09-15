# Apps & services — Aaron Torrence site

Grouped as required / optional / later. Do not silently skip a required item; do not implement optional ones until they earn a slice.

Legend: **REQUIRED** to finish v1 · **NEEDED** for real work on the site · **RECOMMENDED** · **LATER** · **DO NOT USE**

---

## Required to finish v1

| App | Role | Status |
| --- | --- | --- |
| GitHub | Source (`NSDQ-160th/aaron-torrence`) | In use |
| Node + npm | Vite build | In use (Node 24 / npm 11 locally) |
| Blender **or** Spline | Hero GLB (UV, bake, export). v1 ships a code-built lens until a DCC pass | Not started — TODO Aaron / DCC |
| Cloudflare | Pages (host), R2 or Images (heavy assets), optional Stream | Account TODO — Aaron connects the repo in the dashboard |
| Domain registrar (Cloudflare / Porkbun / Namecheap) | `aarontorrence.com` or similar | **Aaron buys.** Do not invent DNS |
| Figma **or** Penpot | Layout + 3D-to-DOM markers | TODO Aaron |

## Required for real work (credits, reel, photos)

| App | Role | Status |
| --- | --- | --- |
| Vimeo **or** Cloudflare Stream **or** Mux | Reel hosting — no raw 4K in git | TODO |
| ImageKit **or** Cloudflare Images **or** Squoosh CLI | Compress stills | Squoosh/sips locally for now |
| Google Fonts / Fontshare / Adobe Fonts | 1 serif display + 1 grotesque | Google: Instrument Serif + Figtree |

## Strongly recommended

| App | Role |
| --- | --- |
| Wrangler | `wrangler pages deploy dist` |
| gltf-transform (+ gltfjsx if we ever add R3F) | Mesh opt |
| stats.js | Dev FPS |
| Howler | Reel mute when audio exists |
| Theatre.js | Only if GSAP scroll-camera gets messy |
| Lenis + GSAP ScrollTrigger | Locked in stack |

## Optional craft (Lusion-class pipeline, not v1)

Houdini FX, Cinema 4D / Redshift, Substance 3D Painter, Poly Haven / ambientCG (license-clean HDRI/textures), Rapier, Khronos glTF samples for scaffolding only (replace before launch).

## Optional product / ops

| App | Role |
| --- | --- |
| Resend or Postmark + Cloudflare Turnstile | Contact form once personal email exists |
| Plausible or Umami | Analytics — no GA unless asked |
| Frame.io or LucidLink | Cut review |
| Lightroom / Capture One | Photo selects |
| DaVinci Resolve | Reel grade |
| Epidemic Sound or Artlist | Licensed score — never YouTube-ripped audio |
| 1Password or Bitwarden | Host tokens |

## Do not use

- **Vercel** (explicit ban — Kairos team already lives there)
- Unlicensed stock that looks like Lusion’s Porsche / Meta work
- Generated photoreal portrait of Aaron

---

v1 implements: GitHub, Node, Google Fonts, local Vite. Cloudflare Pages when Aaron connects the project. Everything else waits.
