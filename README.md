# Aaron Torrence — studio site

Personal site for **Aaron Torrence**: filmmaker, photographer, builder. Not a Kairos Rejuvenation landing page. Kairos is one venture chapter.

## Local

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:5173](http://127.0.0.1:5173).

`npm run build` writes `dist/` for Cloudflare Pages.

## Host

**Cloudflare Pages** from this repo (`dist/` / Vite). Do not use Vercel. GitHub Pages is a last-resort fallback (weak for GLB/HDR).

Connect the GitHub repo in the Cloudflare dashboard, or:

```bash
npx wrangler pages deploy dist
```

Aaron must buy the domain. Do not invent DNS. See `CNAME.example`.

## Docs

- `DESIGN.md` — art direction, tokens, motion, sound (this pass)
- `design/screens/` — 1440 / 390 captures (Figma equivalent)
- `design/concepts/` — WebGL hero stills, labeled concept not brand
- `PLAN.md` — IA, content TODOs, stack, pipeline, budget, risk
- `APPS.md` — required / optional / banned tools
- `DESIGN_PROMPT.md` — source brief
- `inbox/` — drop real stills, reel, company name, personal email
- `archive/kairos-profile/` — retired clinic-leaning static page

## Stack

Vite 5 · TypeScript · three r170 · GSAP + ScrollTrigger · Lenis. Vanilla Three, no Next.js.

Portrait is the real `public/aaron.jpg`. Work titles stay labeled TODO until Aaron supplies credits. No generated face.
