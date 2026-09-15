# Aaron Torrence — profile site

Static personal site for Aaron Torrence, co-owner, operations lead, and health coach at [Kairos Rejuvenation](https://www.kairosrejuvenation.com).

Not hosted on Vercel. Drop this folder on **GitHub Pages**, **Cloudflare Pages**, or **Netlify**.

## Preview locally

From this folder:

```bash
python3 -m http.server 8080
```

Then open [http://127.0.0.1:8080](http://127.0.0.1:8080).

## GitHub Pages (recommended first live URL)

1. Repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / folder: `/ (root)`
4. Save. Site will appear at `https://nsdq-160th.github.io/aaron-torrence/`

`.nojekyll` is included so Pages serves the files as-is. Canonical, Open Graph, and JSON-LD already use that GitHub Pages URL as the placeholder.

## Custom domain later

Do not invent a hostname. When DNS is ready, copy `CNAME.example` to `CNAME` (single hostname, no comments) and point the domain at Pages or Cloudflare.

## Portrait

Hero photo is `aaron.jpg` (provided). The AT mark remains the favicon / nav monogram.

## Copy sources

Patient-facing coaching language matches the clinic site (`/medical#coaching` and `src/content/team.ts` on the Kairos marketing repo). Aaron is not presented as a prescribing clinician.
