# Grok Build prompt

Copy everything inside the fence into Grok Build.

```
You are building and refining a personal professional profile site in the terminal.

WHO
Aaron Torrence — co-owner of Kairos Rejuvenation (Hagerstown, MD). He manages all clinic operations and is the health coach. Medical Director is Dr. Kristina Torrence, MD, MPH (board-certified Medical Doctor / OB-GYN). Aaron is NOT a prescribing clinician.

GOAL
A live-quality personal site for LinkedIn + clinic clients: who Aaron is, how coaching works, how he runs the practice, clear path to the clinic. Feel like peachweb.io (dark, cinematic, large type, smooth motion, premium) without a WebGL/3D engine. Match Kairos tokens: near-black #0d0f15, cream text #f7f3eb, muted #9aa3b5, sky CTA #34b4f4, gold #c9a227 / #e8d48b. Fonts: Cormorant Garamond + DM Sans.

EXISTING WORK
Repo: https://github.com/NSDQ-160th/aaron-torrence
Files: index.html, styles.css, script.js, README.md
Clinic copy source of truth for coaching:
- https://www.kairosrejuvenation.com/medical#coaching
- Clinic marketing repo NSDQ-160th/kairos-rejuvenation → src/content/team.ts (Aaron: "Health coach · Co-owner"; coachingPath bullets).

HARD CONSTRAINTS
- Do NOT host or configure Vercel. KAIROS Vercel team already holds the clinic site + internal apps. Target GitHub Pages, Cloudflare Pages, or Netlify.
- Do NOT invent medical credentials, degrees, certifications, military history, or a fake portrait.
- Do NOT present Aaron as diagnosing, prescribing, or directing hormones / GLP-1 / peptides.
- Do NOT leak internal tool names (kairos-os, kristis-app, pathfinder, finance-os, etc.) on the public site.
- Keep patient-facing coaching language aligned with team.ts / #coaching.
- Static first. Prefer zero build step so `python3 -m http.server` works. If you add a toolchain, keep it terminal-simple (no Next.js unless I explicitly ask).
- Single page is fine. Extra routes only if they earn their keep.

WORK IN TERMINAL
1. Clone or pull NSDQ-160th/aaron-torrence. Work on main unless I say otherwise.
2. Serve locally: python3 -m http.server 8080
3. Improve the existing files in place. Do not start a parallel stack.
4. After each meaningful pass: git status, commit with a precise message. Push only if I ask, or if this environment already has push access and I said to ship.
5. Print the local URL and the git remote when done.

BUILD / UPGRADE THIS PASS
- Tighten hero, type scale, spacing, and motion so it feels closer to peachweb (cinematic, not template).
- Mobile nav already exists; make it solid.
- Add a portrait slot (initials / AT mark until a real photo exists). Do not generate a fake face.
- SEO: title, description, Open Graph, canonical placeholder, person JSON-LD (co-owner / health coach, worksFor Kairos Rejuvenation, sameAs clinic URL). No invented LinkedIn URL.
- Favicon from the AT mark (SVG).
- Accessible contrast, focus states, prefers-reduced-motion.
- Optional: CNAME left commented / documented — do not invent a domain.
- Enable-ready for GitHub Pages from / on main.

COPY GUARDRAILS (use, do not inflate)
- Co-owner · operations · health coach
- Lifestyle: sleep, nutrition basics, movement, consistency
- Complements physician-led protocols; does not replace medical visits
- Useful with hormone memberships and Weight Loss Membership when lifestyle is the bottleneck
- Coordinated with clinical guidance — no DIY hormone or GLP-1 advice
- Clinic: 12916 Conamar Dr, Suite 105, Hagerstown, MD 21742 · 301.798.6025 · contact@kairosrejuvenation.com
- Book: https://kairosrejuvenation.practicebetter.io/#/68a2a1d27809d3b4d93161f7/bookings
- Clinic: https://www.kairosrejuvenation.com

DONE WHEN
- Site looks premium on desktop and phone from a local server
- Copy is accurate and legally/clinically safe
- Pages-ready static files on main
- Short terminal summary: what changed, how to serve, how to turn on GitHub Pages
```
