# Elux 2026 — Homepage

The new Elux Space marketing homepage. Vite + React + Tailwind, with Framer Motion and GSAP for interaction.

## Design tokens

| Token | Value | Notes |
|---|---|---|
| `cream` | `#FFFBEA` | Body background |
| `ink-bg` | `#0A0A0A` | Dark sections |
| `ink` | `#0F1C12` | Body text on cream |
| `primary` | `#2853FF` | Primary CTA — Elux brand blue |
| `primary-2` | `#1E3FCC` | Primary hover/pressed |
| `butter` | `#F3F37A` | Secondary chip |
| `line` | `#E5DEB8` | Hairlines on cream |
| Display | Bricolage Grotesque (condensed `wdth: 85`, weight 700) | Google Fonts |
| Body | Inter | Google Fonts |
| Radius | 4px | Tight chip radius |

## Run

```bash
npm install
npm run dev
```

Dev server: `http://localhost:5174`

## Structure

```
homepagev2/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── index.html
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Nav.jsx
    │   ├── Footer.jsx
    │   └── Marquee.jsx
    └── sections/
        ├── 01_Hero.jsx
        ├── 02_TrustStrip.jsx
        ├── 03_PortfolioHighlight.jsx
        ├── 04_HowAINativeSolvesIt.jsx
        ├── 05_ProblemSolution.jsx
        ├── 06_Numbers.jsx
        ├── 07_ServicesByStage.jsx
        ├── 08_Industries.jsx
        ├── 09_HowWeWork.jsx
        ├── 10_Testimonials.jsx
        └── 11_WhoWereNotFor.jsx
```

## Stack

- **Vite** — dev + build
- **React 18**
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — component-level transitions
- **GSAP** — timeline-driven hero entrance + count-up animations
