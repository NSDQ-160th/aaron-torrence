# Grok Build — plan prompt (Lusion-class personal site)

Copy the fenced block into Grok Build. Work in the terminal.

```
ROLE
You are the technical lead + producer for Aaron Torrence's personal professional website. Work in the terminal. Plan first, then implement in slices. Do not treat this as a Kairos Rejuvenation subpage.

SUBJECT (identity hierarchy — this order is the brief)
1. Aaron Torrence — person. Filmmaker. Photographer. Media-company owner. Operator.
2. Other chapters of his life (verify with Aaron before publishing any specific title, unit, film, or company name).
3. Co-owner + operations + health coach at Kairos Rejuvenation, which he runs with his wife Dr. Kristina Torrence. Kairos is ONE chapter and ONE project card — not the site brand, not the domain voice, not the nav label.

Aaron is NOT a prescribing clinician. Coaching copy, if used at all, stays in a small “Also” chapter and must match clinic language: lifestyle support only.

Do NOT invent film titles, festival laurels, camera credits, company names, military units, or a fake face. If a fact is missing, leave a clearly marked TODO and keep building the system around placeholders.

NORTH STAR
https://lusion.co — award-site WebGL. Scroll-driven 3D world, full-viewport canvas behind HTML, cinematic lighting, custom materials, reel + mute, featured-work index, almost no chrome. Feel: studio of one, not med-spa landing page.
Secondary reference only for motion language: peachweb.io. Do not copy Lusion assets, shaders, or project work.

EXISTING CODE (starting point, not the destination)
Repo: https://github.com/NSDQ-160th/aaron-torrence
Current files are a static Kairos-leaning page (index.html / styles.css / script.js). That direction is retired. Either:
- replace it with a Vite + Three.js (or R3F) app in this repo, or
- create aaron-torrence-studio as a sibling repo if this one stays as archive.
Do not deploy to Vercel. Host target: Cloudflare Pages (preferred) or Netlify. GitHub Pages only as a lightweight fallback (poor for large GLB/HDR).

PHASE 0 — PLAN (do this before writing production 3D)
Write PLAN.md in the repo covering:
A. Information architecture (Aaron-first)
   - /          immersive home + reel + selected work
   - /work      film / photo / media / systems index
   - /work/:slug project case
   - /about     person, not clinic about-page
   - /contact   Aaron contact + optional clinic link in footer only
B. Content inventory with TODOs for Aaron:
   - legal name on site, short bio (2 sentences), longer bio
   - media company name + URL if public
   - 6–12 work pieces: title, role (dir / DP / photo / producer / editor), year, stills, reel cut, tools
   - portrait + process photos (real files only)
   - LinkedIn / IMDb / Vimeo / Instagram if they exist — do not invent URLs
   - email that is HIS, not only contact@kairosrejuvenation.com
C. Technical architecture
D. Asset pipeline (Blender → glTF → web)
E. Performance budget
F. External apps list (see below — implement integrations only when needed)
G. Risk: WebGL on mid phones, reduced-motion, no-WebGL fallback that still looks like a film director’s site

Then wait for Aaron only if identity facts are blocking. Do not block on missing reels — use labeled plates.

STACK (lock unless you justify a swap)
- Vite 5 + TypeScript
- three r170+
- Optional: @react-three/fiber + @react-three/drei if React earns it; vanilla Three + Vite is fine and often clearer in terminal
- GSAP 3 + ScrollTrigger
- Lenis (smooth scroll)
- three built-in EffectComposer (bloom, film grain) — avoid postprocessing lib version fights
- glTF / GLB + KTX2 / Basis if needed
- Howler or native Audio for reel mute
- No Next.js unless Aaron asks. No Vercel CLI. No Kairos design tokens as the primary palette (dark cinematic is fine; teal clinic CTA is not the brand).

WEBGL BAR (Lusion-class attempt, honest scope)
Must ship:
1. Full-viewport WebGL canvas under the DOM (HTML layout drives 3D anchors).
2. Scroll-linked camera or scene states (hero → work → about).
3. At least one signature object with custom material / shader (not a stock torus).
4. Pointer interactivity (hover / attract / parallax).
5. Loader with progress; first paint of 3D < 3s on a laptop on mid Wi-Fi.
6. Mute control if audio exists.
7. Static no-WebGL / reduced-motion fallback.
Stretch (only after the must-list works):
- baked vertex animation or Houdini-style displacement
- multi-scene portal into work items
- WebGPU renderer with WebGL fallback
Do not promise cloth sims + path-traced cars in v1.

PERFORMANCE BUDGET
- Hero GLB < 3 MB compressed
- Total initial JS < 350 KB gzip if possible
- 30fps min on last-gen iPhone Safari; 60fps target desktop
- Pause rAF when tab hidden; drop DPR on low GPU
- Texture max 2K unless a hero still needs 4K and is lazy

WORK IN TERMINAL
1. git clone / pull the repo. Use a branch feat/lusion-home unless told to work on main.
2. npm create vite@latest (if greenfield) or refactor in place.
3. npm run dev — print the local URL.
4. Implement in this order: scaffold → fallback HTML/CSS → WebGL shell → scroll map → work grid → about → contact → loader → perf pass.
5. Commit after each slice with a precise message.
6. Do not push to Vercel. For preview hosting use Cloudflare Pages via wrangler pages deploy dist OR wait for Aaron to connect the GitHub repo in the Cloudflare dashboard.
7. Never commit secrets. .env.example only.

COPY / IA RULES
- Site title: Aaron Torrence — not Kairos Rejuvenation.
- First screen must say filmmaker / photographer / maker before clinic.
- Kairos appears later as a venture he built and operates with his wife.
- No “Book a complimentary consult” in the header.
- No Practice Better as the primary CTA. Contact Aaron first.
- Do not list internal clinic software names.

EXTERNAL APPS — use / recommend, do not silently skip
Create APPS.md grouping these. Mark REQUIRED vs OPTIONAL vs LATER.

Required to finish v1
- GitHub (source)
- Node + npm (build)
- Blender (model, UV, bake, export GLB) — or Spline if Aaron wants faster 3D without DCC
- Cloudflare account: Pages (host), R2 or Images (heavy assets), optional Stream (film)
- Domain registrar (Cloudflare / Porkbun / Namecheap) for aarontorrence.com or similar — Aaron must buy; do not invent the domain in DNS
- Figma (layout + 3D-to-DOM markers) — or Penpot if he refuses Figma

Required for real work on the site
- Vimeo or Cloudflare Stream or Mux (reels; avoid raw 4K in the repo)
- Image pipeline: ImageKit or Cloudflare Images or Squoosh CLI (do not check 20MB JPEGs into git)
- Font source: Google Fonts / Fontshare / Adobe Fonts — pick 1 serif display + 1 grotesque; license them

Strongly recommended
- Wrangler (Cloudflare CLI)
- gltf-transform + gltfjsx (mesh opt + R3F components)
- r3f-perf or stats.js
- Howler
- Theatre.js (camera timeline) if GSAP scroll gets messy
- Lenis + GSAP ScrollTrigger

Optional craft (Lusion pipeline, not required for v1)
- Houdini FX (vertex caches) — paid, steep
- Cinema 4D / Redshift
- Substance 3D Painter
- Poly Haven / ambientCG (HDRI, textures)
- Ready-made HDRIs only from license-clean sources
- Rapier (@react-three/rapier) if physics earns a moment
- Khronos glTF sample models for scaffolding only — replace before launch

Optional product / ops around the site
- Resend or Postmark (contact form) + Cloudflare Turnstile
- Plausible or Umami (analytics, no GA unless asked)
- Frame.io or LucidLink (review cuts with Aaron)
- Lightroom / Capture One (photo selects)
- DaVinci Resolve (reel grades)
- Epidemic Sound or Artlist (licensed score — never YouTube-ripped audio)
- 1Password or Bitwarden for host tokens

Do NOT use
- Vercel (explicit ban)
- Unlicensed stock that looks like Lusion’s Porsche / Meta work
- Generated photoreal portrait of Aaron

DONE WHEN
- PLAN.md + APPS.md exist
- Dev server shows a WebGL hero that survives scroll into a work index that is about FILM / PHOTO / MEDIA first
- Kairos is a chapter, not the wrapper
- Fallback works with WebGL off
- Terminal summary: stack, local URL, host path, list of TODOs for Aaron (bio, reels, company name, domain, portrait)
```
