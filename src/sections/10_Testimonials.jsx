import { motion } from 'framer-motion'

/**
 * v2 Section 10 — Testimonials.
 * BORING-style: oversized pull-quotes, alternating cream/dark cards.
 * Video tiles are ASSET-BLOCKED (real videos land later) — shown as
 * dashed placeholders next to the quote cards.
 */
const items = [
  { kind: 'quote', text: 'They moved fast without breaking the design.', logo: 'SISYPHUS', dark: false },
  { kind: 'video', brand: 'FLUZ' },
  { kind: 'quote', text: 'A real partner that accelerates our growth — not a vendor we have to manage.', logo: 'NETEVIA', dark: true },
  { kind: 'quote', text: 'Flexibility, scalability, and security we actually needed for a fintech MVP.', logo: 'SPLITIT', dark: false },
  { kind: 'video', brand: 'COINFLOW' },
  { kind: 'quote', text: 'With Elux we reliably expanded our product offering without scaling the team.', logo: 'BNY', dark: true },
]

export default function Testimonials() {
  return (
    <section className="bg-cream-2 border-y-2 border-ink">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-24 md:py-32">
        <div className="mb-12">
          <div className="eyebrow text-ink-3 mb-3">[IN THEIR WORDS]</div>
          <h2 className="display-lg text-ink">
            BUILT WITH<br />
            FOUNDERS WHO SHIP.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
            >
              {it.kind === 'video' ? (
                <div className="aspect-[4/5] rounded-chip border-2 border-dashed border-ink/40 bg-cream/40 flex flex-col items-center justify-center p-5 relative">
                  <div className="absolute top-4 left-4 font-display font-bold text-[11px] uppercase tracking-[0.14em] text-ink-2">{it.brand}</div>
                  <div className="w-14 h-14 rounded-chip bg-ink text-cream flex items-center justify-center">▶</div>
                  <div className="absolute bottom-4 font-display font-bold text-[9px] uppercase tracking-[0.14em] text-ink-3">Real video — to be added</div>
                </div>
              ) : (
                <div className={`aspect-[4/5] rounded-chip border-2 border-ink p-6 flex flex-col justify-between ${it.dark ? 'bg-ink-bg text-cream' : 'bg-cream text-ink'}`}>
                  <p className={`display-md leading-[1.05] ${it.dark ? '' : ''}`} style={{ fontSize: 'clamp(22px, 2.2vw, 32px)' }}>
                    "{it.text}"
                  </p>
                  <div className={`font-display font-bold text-base ${it.dark ? 'text-on-ink-2' : 'text-ink-2'}`}>{it.logo}</div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
