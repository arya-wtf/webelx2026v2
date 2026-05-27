import { motion } from 'framer-motion'

/**
 * v2 Section 02 — Trust Strip.
 * BORING-style: tight chip row in caps, ink-bordered chips on cream,
 * Elux-blue accent dots. Real platform proof (Clutch / Contra / Dribbble /
 * DesignRush) with outbound links.
 */
const badges = [
  { name: 'Clutch',     rating: '5.0',  proof: '10 verified reviews',                  href: 'https://clutch.co/profile/elux-space' },
  { name: 'Contra',     rating: '5.00', proof: '11× hired · LottieFiles × Figma',      href: 'https://contra.com/eluxspace/work' },
  { name: 'Dribbble',   rating: null,   proof: 'Featured · 2.9K followers',            href: 'https://dribbble.com/eluxspace' },
  { name: 'DesignRush', rating: null,   proof: 'Verified agency',                      href: 'https://www.designrush.com/agency/profile/elux-space' },
]

export default function TrustStrip() {
  return (
    <section className="bg-cream-2 border-y-2 border-ink">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="eyebrow text-ink-3 mb-2">[VERIFIED BY]</div>
            <h2 className="display-md text-ink leading-[1]">
              FOUR PLATFORMS.<br />
              ZERO FAKING IT.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {badges.map((b, i) => (
              <motion.a
                key={b.name}
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group flex items-center gap-2 px-3 py-2 rounded-chip bg-cream border-2 border-ink hover:bg-primary hover:text-cream transition-colors"
              >
                {b.rating && <span className="text-[#F5B544] tracking-[1.5px] text-xs leading-none">★★★★★</span>}
                {b.rating && <span className="font-display font-bold text-sm tabular-nums leading-none">{b.rating}</span>}
                <span className="font-display font-bold text-[11px] uppercase tracking-[0.08em] leading-none">{b.name}</span>
                <span className="hidden md:inline font-body text-[11px] leading-none">· {b.proof}</span>
                <span className="font-body text-[11px] leading-none">↗</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Honest dashed client-logo placeholders */}
        <div className="mt-8 pt-6 border-t-2 border-ink/15 grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-center">
          <div>
            <div className="eyebrow text-ink-3 mb-1">[WORKING WITH]</div>
            <div className="font-body text-xs text-ink-2 max-w-[180px] leading-snug">
              Founders in Singapore, Sydney, Scotland &amp; New York.
            </div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[5/2] rounded-chip border-2 border-dashed border-ink/30 flex items-center justify-center"
                title="Real client logo — to be added"
              >
                <span className="font-display font-bold text-[9px] uppercase tracking-[0.1em] text-ink-3">Client</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
