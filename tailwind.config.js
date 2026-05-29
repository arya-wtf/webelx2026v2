/** @type {import('tailwindcss').Config} */
// v2 — BORING-inspired token system. Pulled live from weareboring.nl.
// Independent from v1's tokens; do not import or share colors.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // page surfaces
        cream:      '#FFFBEA',   // body bg (rgb 255,251,234)
        'cream-2':  '#F7F1D8',   // second surface (alt sections)
        'cream-3':  '#EDE5C0',   // panel-on-cream

        // ink (a deep green-black, not pure #000)
        ink:        '#0F1C12',   // primary text on cream
        'ink-2':    '#1F2A22',   // secondary text on cream
        'ink-3':    '#3F4A40',   // muted text on cream

        // inverted (dark sections) — matches v1's #0A0A0A near-black so
        // dark surfaces feel consistent across both versions
        'ink-bg':   '#0A0A0A',   // dark section bg (was BORING's #0F1C12)
        'on-ink':   '#FFFBEA',   // cream on dark
        'on-ink-2': '#FFFBEACC', // 80% cream on dark
        'on-ink-3': '#FFFBEA99', // 60% cream on dark

        // accents — using Elux blue from v1 instead of BORING lime
        primary:     '#2853FF',  // Elux brand blue, kept across v1 and v2
        'primary-2': '#1E3FCC',  // hover/pressed state
        butter:      '#F3F37A',  // secondary chip (kept; unused by default)

        // structural
        line:       '#E5DEB8',   // hairlines on cream
        'line-ink': '#FFFBEA1F', // hairlines on ink

        // states
        danger:     '#E55D43',
        success:    '#2BAE66',
      },
      fontFamily: {
        // Bricolage Grotesque has width + weight axes; we'll lean condensed.
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['ui-monospace', 'Menlo', 'monospace'],
      },
      fontWeight: {
        // condensed-heavy headlines
        display: '700',
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.025em',
        boring: '-0.01em',
      },
      borderRadius: {
        chip: '4px',   // BORING's tight ~4.2px chip radius
      },
      maxWidth: {
        page: '1320px', // wider than v1 for editorial feel
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },
      animation: {
        // Slow, steady scroll. -50% because we duplicate the content row
        // so the loop point is the midpoint of the doubled content.
        // 90s is roughly half the speed of 48s — calm, readable, never frantic.
        marquee: 'marquee 90s linear infinite',
        blink:   'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
}
