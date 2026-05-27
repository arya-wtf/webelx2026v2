# Version 2 — Tracking Doc

**Project:** Elux Space rebrand → Pragmatic AI Product Design Partner
**Folder:** `/Users/aryapradana/Documents/ClaudeDekstop/elux2026/homepagev2`
**Repo:** `https://github.com/arya-wtf/webelx2026v2`
**Stack:** Vite + React 18 + Tailwind + Framer Motion + GSAP (sparingly)
**Mode:** Lightmode cream / dark ink-bg blocks
**Dev port:** `5174` (v1 stays on `5173` so both can run side-by-side)
**Started:** 2026-05-27

---

## Why v2 exists

v1 was the *calm, pragmatic* interpretation of the PDF brief — off-white canvas, ink black, Elux blue, restrained editorial. After shipping v1 we wanted a parallel exploration: same 11-section brief, **different visual direction**, so we could compare and pick.

v2 is the *editorial-agency* interpretation, anchored on the BORING reference ([weareboring.nl](https://www.weareboring.nl/en)).

---

## Locked decisions (do not revisit in v2)

| Area | Decision |
|---|---|
| Scaffold | Independent Vite + React + Tailwind project (not a fork of v1) |
| Repo | Separate `webelx2026v2` repo |
| Dev port | 5174 (parallel with v1's 5173) |
| Motion philosophy | **Editorial-static.** BORING-style sites don't lean on motion. Only essential moments. |
| Brand consistency | Keep v1's Elux blue `#2853FF` AND v1's `#0A0A0A` near-black for dark surfaces, even though BORING uses lime green + ink-green. This keeps both versions feeling like *the same studio, two faces*. |
| Source of truth | Same PDF brief as v1: `🖥️ Website Visual Reference — AI Product Design Partner.pdf` |

---

## Token system

Pulled live from weareboring.nl (the BORING reference) plus v1 brand carryovers.

| Token | Value | Notes |
|---|---|---|
| `cream` | `#FFFBEA` | Body bg (from BORING) |
| `cream-2` | `#F7F1D8` | Alternating section bg |
| `cream-3` | `#EDE5C0` | Panel-on-cream |
| `ink` | `#0F1C12` | Body text on cream (BORING's green-black, kept for character) |
| `ink-2` | `#1F2A22` | Secondary text |
| `ink-3` | `#3F4A40` | Muted text |
| `ink-bg` | `#0A0A0A` | **Dark sections — matches v1 for cross-version consistency** (not BORING's `#0F1C12`) |
| `on-ink` | `#FFFBEA` | Cream on dark |
| `primary` | `#2853FF` | **Elux brand blue, kept from v1** (not BORING's lime green) |
| `primary-2` | `#1E3FCC` | Primary hover/pressed |
| `butter` | `#F3F37A` | Secondary chip (kept, currently unused) |
| `line` | `#E5DEB8` | Hairlines on cream |
| `line-ink` | `#FFFBEA1F` | Hairlines on ink |
| `danger` | `#E55D43` | Same warm red as v1 (after iteration) |
| Display | Bricolage Grotesque (cond. `wdth: 85`, weight 700) | Closest free match to BORING's Fkscreamer |
| Body | Inter | Closest free match to BORING's Matter |
| Radius | 4px (`rounded-chip`) | BORING's tight chip radius (vs v1's 8px) |

---

## v2 visual signature vs v1

| Dimension | v1 | v2 |
|---|---|---|
| Canvas | Off-white `#FAFAF7` | Cream `#FFFBEA` |
| Borders | Hairline `border-line` (1px, `#E6E5DF`) | **Thick `border-2 border-ink`** everywhere |
| Display font | Plus Jakarta Sans | **Bricolage Grotesque condensed** |
| Text case | Mixed case headlines | **UPPERCASE everywhere** — headlines, eyebrows, chip labels, service names |
| Radius | 16–24px rounded cards | 4px chips |
| Motion | Kinetic — pinned scroll, mouse field, drag-scroll | **Editorial-static** — count-up + verb cycle + marquee only |
| Hero anchor | Animated GSAP fluid lines | Massive composed typography + rotating verb |
| Section 11 strike | Inline gradient on cream | Native text-decoration on near-black |

---

## Section status

Legend: ✅ shipped + on-direction · 🟡 shipped but needs more polish · 🔴 skipped (asset-blocked)

| # | Section | Status | Asset-blocked? | Notes |
|---|---|---|---|---|
| Marquee | Above-nav scrolling strip | ✅ | no | Studio voice + availability (NOT platform proof — avoids redundancy with section 02). 90s slow scroll, hover-to-pause |
| Nav | Sticky cream + ink, blue chip CTA | ✅ | no | |
| 01 | Hero | ✅ | no | Composed for one viewport, rotating verb in width-tweening blue box, floating dashed tile in top-right negative space |
| 02 | Trust Strip | ✅ | partial | 4 verified platform badges (Clutch · Contra · Dribbble · DesignRush) with outbound links; client-logo row marked asset-blocked |
| 03 | Portfolio Highlight | 🔴 | YES | Dashed-border placeholder cards |
| 04 | How AI-Native Solves It | ✅ | no | "STITCHING TOOLS VS SHIPPING." with chunky black VS chip, cream/blue contrast cards |
| 05 | Problem → Solution | ✅ | no | 3 alternating cream/dark rows with huge `01` / `02` / `03` numbers. **Static** — no GSAP pin scroll (that's signature v1) |
| 06 | Numbers | ✅ | no | Count-up on scroll (the one motion moment we ported from v1). Featured `55%` tile in ink-bg |
| 07 | Services by Stage | ✅ | no | Big stage chips + numbered service list. No earned-reveal preview (that's signature v1) |
| 08 | Industries | 🔴 | YES | Giant uppercase industry list + dashed case-visual panel |
| 09 | How We Work | ✅ | no | Vertical timeline + deliverables strip + "and loop" return |
| 10 | Testimonials | 🟡 | partial | Quote cards alternate cream/dark; 2 video tiles (Fluz, Coinflow) are asset-blocked placeholders |
| 11 | Who We're NOT For | ✅ | no | Dark `#0A0A0A`, "WE'RE ~~GOOD FOR EVERYONE.~~ BUILT FOR A FEW.", We don't / We do two-column |
| Footer | "DON'T BE BORING. BUILD WITH ELUX." | ✅ | no | Minimal dark closer with social links |

**8 of 11 main sections ✅ on-direction.** Same 3 sections as v1 stay asset-blocked.

---

## Refinement log (chronological)

### Initial scaffold — commit `68b1efc`
Independent Vite project on port 5174. All 11 sections + Nav + Footer built in one push using the BORING token system. Sections 03/08/10-videos kept as honest dashed placeholders.

### Hero composition pass — commit `e94c3c2`
**Problem:** Hero was 1027px tall on a 697px viewport. Headline overflowed the fold, proof strip sat below. Visitors landed on `AI-NATIVE PRODUCTS THAT ACTUALLY SHIP.` with no context, no CTA, no proof visible.

**Fix:** Restructured as a 4-row CSS Grid composition that fits in one screen.
- `min-height: calc(100vh - 64px)` (nav offset; later updated for marquee)
- Row 1 (auto): eyebrow chip
- Row 2 (1fr): massive headline centered vertically
- Row 3 (auto): lede + CTAs split
- Row 4 (auto): proof strip on the hairline
- Headline `clamp(48px, 9.5vw, 128px)` (was up to 168px — too big)

**Result:** Hero 637px on 697px viewport. Proof strip 5px above fold edge. Everything readable without scrolling.

### Hero "awesome pass" — commit `1745108`
Stacked two upgrades.

**Rotating verb in the highlighted block:**
- Cycles SHIP → LAUNCH → CONVERT → SCALE every 2.6s
- Vertical letter-flip via Framer Motion `AnimatePresence`
- **First attempt** used fixed `minWidth: 4.2em` which left empty space on shorter words. **Fixed** by removing minWidth and using Framer's `layout` prop on the container — box now tweens its width smoothly between words (500ms ease)

**Marquee strip above the nav:**
- Thin 32px `#0A0A0A` strip with cream uppercase tracking-wide text
- **First attempt** used Tailwind `animate-marquee` config — silently failed because Tailwind JIT didn't regenerate CSS after the config change without a dev-server restart. **Fixed** by moving `@keyframes marquee-scroll` and `.marquee-track` class directly to `src/index.css` so the animation survives any config edits
- 90s linear loop, hover-to-pause, pure CSS no JS
- **Content originally** had platform-proof (Clutch / Contra / Dribbble / etc) — **repurposed** to studio voice + availability after realizing it duplicated section 02. Now reads things like `SHIPPING SINCE 2021 · NOW BOOKING Q3 · 2 SLOTS OPEN · WE DON'T DO BORING · NO DECKS · NO HANDOFFS · NO DRAMA`

**Hero `min-height` adjusted to `calc(100vh - 64px - 32px)`** so the composition still fits one viewport with the new 32px marquee above it.

### Hero #3 — floating dashed proof tile
- 220×140px tile anchored to top-right of the hero, `-3deg` rotation
- Hover lifts rotation back to 0° + scales 1.04
- "◆ NEXT CASE 01/12 · Real client work lands here when assets arrive · SHIPPED →"
- Hidden on mobile to keep composition clean
- Honest placeholder consistent with section 02's client-logo placeholders
- Adds depth element to the otherwise flat editorial hero

### Section 11 strike-fix iterations (during audit)
The "GOOD FOR EVERYONE." strike-through went through **three implementations** before landing:

1. **CSS `text-decoration: line-through` with `decoration-[4px]`** — too thin to read against massive 166px display type
2. **Absolutely-positioned red bar overlay** — bar landed in the gap *between* wrapped lines instead of crossing letters; also ballooned to 41px on wider viewports due to a viewport-clamp math error
3. **Inline `linear-gradient` background** — bar finally followed text wrapping naturally and was readable, BUT painted *behind* the cream letters so the strike kept disappearing into the type strokes
4. **Final: native `text-decoration: line-through` with `0.09em thickness` and `textDecorationSkipInk: none`** — native text-decoration paints in *front of* the text. Thickness scales with font-size (`~15px` at the rendered 166px). Wraps naturally across two lines. ✓

---

## What's done

- [x] Scaffolded as independent Vite project on port 5174
- [x] Token system locked (cream + ink + Elux blue retained)
- [x] All 11 sections built
- [x] Nav + Footer + Marquee
- [x] Hero composed for one viewport
- [x] Hero rotating verb (with width-tweening box)
- [x] Hero floating dashed proof tile
- [x] Marquee with studio-voice content (non-redundant with section 02)
- [x] Section 11 strike rendered correctly (text-decoration native)
- [x] Section 02 promoted `div.display-md` → real `<h2>` for a11y
- [x] Section 08 `-mx-1` inline-block bleed fixed
- [x] Production build passes (405 modules, 0 errors)
- [x] Live in browser at `localhost:5174`
- [x] Pushed to GitHub repo `webelx2026v2`

## What's pending / next

- [ ] Audit sections 02–11 in browser (same kind of fix-list we just ran on the hero)
- [ ] Responsive pass (built for desktop ≥1024px; mobile + tablet need real review)
- [ ] Accessibility check (focus states, contrast on dark sections, keyboard nav)
- [ ] Real copy pass — many sections still carry placeholder voice
- [ ] Decide if v2 deserves additional motion (currently editorial-static; could add per-section moments if desired)

## Skipped for v2 (need real assets — same as v1)

- [ ] Section 03 Portfolio — needs 4–6 real project screenshots
- [ ] Section 08 Industries — needs one case visual per vertical
- [ ] Section 10 Testimonial videos (Fluz, Coinflow) — need real client clips
- [ ] Replace floating tile placeholder with a real client thumbnail when assets land

---

## Lessons logged during v2

Carryovers + new ones:

1. **Restart `npm run dev` after editing `tailwind.config.js`.** Tailwind JIT doesn't always re-parse the config on HMR. If a class silently produces zero CSS, suspect this first.
2. **For animations that need to survive config edits, put `@keyframes` directly in `index.css`** — bypasses the Tailwind dependency entirely.
3. **`text-decoration: line-through` is the right tool for strikethrough on display type** — it paints *in front of* the text. Positioned-span overlays paint behind. Use `textDecorationSkipInk: none` so the strike runs continuously over descenders.
4. **Framer Motion's `layout` prop is the cleanest way to animate container width to fit changing content** — better than animating `width` manually, no manual measurement needed.
5. **A marquee at the top of the page can easily duplicate proof you're already showing in a section.** Make sure marquee content is voice / availability / personality — *not* the same things your trust strip carries.
6. **Hero composition first, decoration second.** v2's hero only became "awesome" after we made it fit one viewport. Adding the verb rotation and the marquee on top of a broken composition would have masked the real problem.
7. **Sub-pixel grid overflows (16px excess) are usually false positives.** Check `document.documentElement.scrollWidth > clientWidth` — if false, the page isn't actually scrolling horizontally and the element-level "overflow" is a scrollbar-gutter or grid-math artifact.
8. **v2's editorial character is fragile — adding GSAP pin scrolls or kinetic motion breaks it.** That kind of motion is signature v1. v2 earns its motion sparingly.

---

## Commit history

| Hash | Commit |
|---|---|
| `68b1efc` | Initial commit: Elux 2026 v2 homepage (BORING-inspired direction) |
| `e94c3c2` | Compose v2 hero into one viewport |
| `1745108` | Hero awesome pass — rotating verb + marquee strip |
| _next_ | Hero #3 floating dashed tile + this VERSION-2.md |

---

## File map

```
homepagev2/
├── VERSION-2.md          ← this doc
├── README.md
├── package.json          (port 5174)
├── vite.config.js
├── tailwind.config.js    (BORING token system + Elux blue/ink kept)
├── postcss.config.js
├── index.html            (Bricolage Grotesque + Inter)
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css         (marquee @keyframes + CSS animation lives here)
    ├── components/
    │   ├── Marquee.jsx   (studio voice, 90s slow scroll, hover-pause)
    │   ├── Nav.jsx
    │   └── Footer.jsx    ("DON'T BE BORING. BUILD WITH ELUX.")
    └── sections/
        ├── 01_Hero.jsx                  ✅ composed + rotating verb + floating tile
        ├── 02_TrustStrip.jsx            ✅ 4 verified platform badges
        ├── 03_PortfolioHighlight.jsx    🔴 asset-blocked
        ├── 04_HowAINativeSolvesIt.jsx   ✅ STITCHING TOOLS VS SHIPPING
        ├── 05_ProblemSolution.jsx       ✅ 3 alternating rows
        ├── 06_Numbers.jsx               ✅ count-up + featured tile
        ├── 07_ServicesByStage.jsx       ✅ big stage chips
        ├── 08_Industries.jsx            🔴 asset-blocked
        ├── 09_HowWeWork.jsx             ✅ vertical timeline + and loop
        ├── 10_Testimonials.jsx          🟡 quote cards + video placeholders
        └── 11_WhoWereNotFor.jsx         ✅ dark, we don't / we do
```
