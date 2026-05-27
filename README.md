# Elux 2026 — Homepage v2 (BORING-style)

Independent v2 of the Elux Space homepage. **Not** a fork of v1 — fresh visual direction off the same PDF brief.

## Visual direction

Inspired by [weareboring.nl](https://www.weareboring.nl/en) **structurally** — cream canvas, heavy condensed display type, editorial-agency tone — but with the **Elux brand blue** retained from v1 instead of BORING's lime green. Keeps brand consistency between v1 and v2 while still letting v2 read as a different visual interpretation.

| Token | Value | Notes |
|---|---|---|
| `cream` | `#FFFBEA` | Body background |
| `ink-bg` | `#0A0A0A` | Dark sections (matches v1 for cross-version consistency) |
| `ink` | `#0F1C12` | Body text on cream |
| `primary` | `#2853FF` | Primary CTA — kept from v1 (Elux blue) |
| `primary-2` | `#1E3FCC` | Primary hover/pressed |
| `butter` | `#F3F37A` | Secondary chip (kept for later use) |
| `line` | `#E5DEB8` | Hairlines on cream |
| Display | Bricolage Grotesque (condensed `wdth: 85`, weight 700) | Free Google Font; closest free match to BORING's Fkscreamer |
| Body | Inter | Free Google Font; closest free match to Matter |
| Radius | 4px | BORING's tight chip radius |

## Run

```bash
cd homepagev2
npm install
npm run dev    # http://localhost:5174
```

v1 still runs on port 5173. You can run both at once and compare side-by-side.

## Structure

Same 11-section brief as v1 (from the PDF). Sections 03 / 08 / 10-videos remain asset-blocked.

```
homepagev2/
├── package.json
├── vite.config.js          (port 5174)
├── tailwind.config.js      (BORING token system)
├── index.html              (Bricolage + Inter fonts)
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css           (display/eyebrow/btn primitives)
    ├── components/
    │   ├── Nav.jsx         (sticky cream, lime CTA)
    │   └── Footer.jsx      (ink-bg dark, "Don't be boring" closer)
    └── sections/
        └── 01_Hero.jsx     ✅ shipped
```

Sections 02–11 to be built next.
