# Design prompt — Aaron Torrence personal site (Lusion-class)

Use this in Grok Build (design pass), Figma, or Grok Imagine for stills / mood frames. Not a Kairos page.

```
DESIGN A PERSONAL SITE FOR AARON TORRENCE

This is the official site of a person, not a clinic landing page and not a sub-route of kairosrejuvenation.com.

WHO HE IS (in this order on screen)
Aaron Torrence is a filmmaker, photographer, and media-company owner who also builds and operates companies — including Kairos Rejuvenation with his wife. The site should feel like a director’s / studio site that happens to include a healthcare venture, never the reverse.

Do not use Kairos teal-pink lotus, “Book a complimentary consult,” Practice Better, membership pricing, or med-spa photography as the visual system.

REFERENCE — study, do not clone assets
Primary: https://lusion.co
What to take:
- Full-bleed WebGL world sitting under sparse HTML
- Almost no header chrome; name as mark
- Scroll is the edit. Camera + scene change when the page moves.
- Featured work as tactile 3D/2D objects, not Bootstrap cards
- Loader that feels like a slate / lab, then the world appears
- Mute + reel
- Dark void, sculpted light, one heroic material (glass, film-gate metal, cloth, light-tube, analog lens)
- Footer is quiet: name, email, indexes

What not to take:
- Lusion’s projects, copy, colors-as-logo, or shaders ripped from their bundle
- PlayStation car configurators unless Aaron actually shot cars

Secondary motion language: peachweb.io (cinematic UI, not product-builder chrome).

ART DIRECTION
World: black stage. Light is the brand. Think lens flare held in check, tungsten + cool rim, film grain, anamorphic suggestion — not neon SaaS.
Palette:
- Void #07080c
- Stage #10131a
- Bone type #f3eee4
- Fog / steel #8b93a2
- Heat accent (use rarely) #e2b15a or a single tungsten #ffb067
- Do not default to Kairos #34b4f4 as the identity color. Sky blue may appear only inside the Kairos project card.
Type:
- Display: high-contrast serif with real italics (editorial, not wedding script)
- UI: compact grotesque
- Huge name on hero, then whisper labels (FILM, STILL, MEDIA, SYSTEMS)
Grid:
- Asymmetric. Big empty stage. Work titles small until hover.
- Desktop-first cinematic; phone gets a reduced scene + the same type hierarchy, never a squashed 3D toy.

WEBGL SCENE CONCEPT (v1 — pick ONE signature and commit)
Preferred motif for Aaron (film + stills + operator):
A floating analog artifact in a dark volume — e.g. a disassembled lens / film gate / viewfinder / light meter — brushed metal + glass elements, subtle dust motes, scroll rotates and dollys past it into a wall of stills that are actual planes in 3D then settle into the work index.

Rules for the object:
- Custom model, not three.js primitives glued together as the hero
- One hero shader (transmission glass or thin-film or projected film-plate)
- Pointer gravity on nearby fragments
- Reduced-motion: freeze camera, keep grade

SECTIONS (scroll order)
1. SLATE / LOAD   progress as a film counter or iris
2. HERO           AARON TORRENCE / Filmmaker. Photographer. Builder.
3. REEL           play / mute — only if a real cut exists; else a still plate labeled REEL FORTHCOMING
4. SELECTED WORK  6–12 pieces across Film · Still · Media · Ventures
5. APPROACH       how he sees light, story, and systems — short, no clinic FAQ
6. ABOUT          person. Marriage/partnership and Kairos belong here as biography, not the headline.
7. CONTACT        Aaron’s email / form. Clinic address is secondary, in a ventures footnote.

WORK INDEX LABELS
Film — director / DP / editor credits once Aaron supplies titles
Still — photography series
Media — the company he owns (name TBD by Aaron)
Ventures — Kairos Rejuvenation as one card among others

If titles are missing, design the tile system with “TITLE · ROLE · YEAR” slots. Do not invent credits.

UI CHROME
- Top: AT mark + Work + About + Contact. No Book button.
- Cursor can become a small iris or shutter on hover of work.
- Sound default OFF.
- Page transitions: dip to black or iris, 200–400ms, not bounce eases from template packs.

IMAGERY RULES
- Real frames from Aaron’s camera when provided.
- Until then: abstract light studies (generated or shot) — smoke, tungsten, glass, grain. No stock smiling-clinic, no fake portrait of Aaron, no other people’s films.
- 16:9 or 2.39 plates. Avoid square IG grid as the home language.

MOBILE
- WebGL: one simplified object or a baked video loop of the scene if FPS < 30.
- Type stays large. Work becomes a vertical filmstrip.
- Touch targets ≥ 44px. Mute still present.

ACCESSIBILITY
- Contrast on type over 3D: scrim behind headlines.
- Keyboard can skip the canvas and reach Work.
- prefers-reduced-motion honored.
- Captions if reel has dialogue.

DELIVERABLES FOR THIS DESIGN PASS
1. Written art direction (this file expanded into DESIGN.md)
2. Figma or equivalent: desktop 1440 and mobile 390 — home, work, about, contact
3. 3–5 still frames of the WebGL hero (Grok Imagine or Blender viewport) labeled as concept, not final brand marks
4. Token sheet: color, type, motion curve, sound policy
5. List of assets Aaron must drop in a /inbox folder: portrait, reel, 12 stills, company name, personal email, domain

SUCCESS
A stranger landing from LinkedIn should think “director / photographer with range,” then discover he also built a clinic — not “med spa co-owner who also likes cameras.”
```

## Asset inbox Aaron should prepare

Drop into the repo or a Drive folder named `inbox/`:

- Headshot or on-set portrait (real photo)
- 30–90s reel (ProRes or 1080p H.264) + 3 stills from it
- 8–12 photographs he actually made
- Media company name, one-line, URL
- Personal email for the site
- Preferred domain
- LinkedIn / IMDb / Vimeo / IG if they should appear
- 6 work rows: Title | Role | Year | One sentence
