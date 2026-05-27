/**
 * Marquee — BORING-style scrolling proof strip.
 *
 * Sits above the nav. Pure CSS animation (no JS animation), GPU-accelerated.
 * The content row is rendered twice and the track translates -50% over 48s,
 * which means the visible content loops seamlessly with no jump.
 *
 * Pause-on-hover: nice touch so users can actually read a chip if they want.
 */

// Marquee carries studio VOICE + AVAILABILITY — content that doesn't appear
// in section 02 (which owns platform-proof badges). No platform names here.
const ITEMS = [
  '◆ SHIPPING SINCE 2021',
  '◆ NOW BOOKING Q3 · 2 SLOTS OPEN',
  '◆ JAKARTA · BALI · REMOTE',
  '◆ WE DON\'T DO BORING',
  '◆ PRODUCT, NOT POSTERS',
  '◆ FOUNDERS-ONLY',
  '◆ NO DECKS · NO HANDOFFS · NO DRAMA',
  '◆ SAY HELLO@ELUX.SPACE',
  '◆ NOT TAKING ON 6-MONTH SPEC DOCS',
  '◆ BUILT WITH FOUNDERS WHO SHIP',
]

function Track() {
  return (
    <div className="flex items-center gap-10 shrink-0 px-5">
      {ITEMS.map((it, i) => (
        <span
          key={i}
          className="font-display font-bold text-[11px] uppercase tracking-[0.16em] text-cream whitespace-nowrap"
        >
          {it}
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <div
      className="bg-ink-bg text-cream overflow-hidden border-b border-line-ink"
      style={{ height: 32 }}
      aria-label="Studio status"
    >
      <div className="relative h-full flex items-center">
        <div className="flex items-center marquee-track">
          <Track />
          <Track />
        </div>
      </div>
    </div>
  )
}
