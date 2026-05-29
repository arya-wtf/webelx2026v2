import { motion } from 'framer-motion'

/**
 * v2 Section 04 — How AI-Native Solves It.
 * BORING-style "Without / With" contrast: thick black borders, oversized
 * uppercase headers, struck-through items on the left, blue accents on the right.
 * The 'VS' pivot is a chunky chip in the middle.
 */
const without = [
  { ic: '✕', t: 'Designer ping',   s: '"need copy by EOD"' },
  { ic: '✕', t: 'Manual handoff',  s: 'Figma → Webflow rebuild' },
  { ic: '✕', t: 'Scope surprise',  s: '"+2 weeks for backend"' },
  { ic: '✕', t: 'Budget creep',    s: 'Two vendors. One invoice.' },
]
const withUs = [
  { ic: '✓', t: 'Brief intake',                s: 'Auto-scoped in 24h' },
  { ic: '✓', t: 'Design + build in parallel',  s: 'UX, UI, no-code together' },
  { ic: '✓', t: 'Live product',                s: 'Investor-ready, user-tested' },
]

export default function HowAINativeSolvesIt() {
  return (
    <section className="bg-cream-2 border-t-2 border-ink">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-24 md:py-32">
        <div className="max-w-6xl mb-16">
          <div className="eyebrow text-ink-3 mb-3">[THE DIFFERENCE]</div>
          <h2 className="display-lg text-ink">
            STITCHING TOOLS<br />
            <span className="bg-primary text-cream px-3 inline-block">VS SHIPPING.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_88px_minmax(0,1fr)] gap-6 lg:gap-0 items-stretch">
          {/* WITHOUT */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="p-8 bg-cream border-2 border-ink rounded-chip"
          >
            <div className="inline-block px-3 py-1 mb-6 bg-ink text-cream rounded-chip font-display font-bold text-[10px] uppercase tracking-[0.14em]">
              Without Elux
            </div>
            <h3 className="display-md text-ink mb-7 leading-[0.95]">
              EVERYONE IN A<br />
              DIFFERENT SLACK.
            </h3>
            <ul className="space-y-2">
              {without.map((m) => (
                <li key={m.t} className="flex items-center gap-3 p-3 bg-cream-2 border border-ink/15 rounded-chip">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#E5403A] flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 2L12 12M12 2L2 12" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <div className="font-body text-sm">
                    <span className="line-through decoration-danger decoration-[1.5px]">{m.t}</span>
                    <small className="block italic text-ink-3 text-[11px] mt-0.5">"{m.s}"</small>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 font-display font-bold text-xs uppercase tracking-[0.12em] text-danger">
              ✗ Result: 6 weeks late.
            </div>
          </motion.div>

          {/* VS */}
          <div className="flex lg:flex-col items-center justify-center">
            <div className="bg-ink text-cream w-16 h-16 rounded-chip flex flex-col items-center justify-center">
              <span className="display-md leading-none">VS</span>
            </div>
          </div>

          {/* WITH */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 bg-primary text-cream border-2 border-ink rounded-chip"
          >
            <div className="inline-block px-3 py-1 mb-6 bg-cream text-ink rounded-chip font-display font-bold text-[10px] uppercase tracking-[0.14em]">
              With Elux
            </div>
            <h3 className="display-md mb-7 leading-[0.95]">
              ONE TEAM.<br />
              ONE LOOP.
            </h3>
            <ul className="space-y-2">
              {withUs.map((m) => (
                <li key={m.t} className="flex items-center gap-3 p-3 bg-cream/10 border border-cream/20 rounded-chip">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#3BAC5A] flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 7L5.5 10.5L12 3.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <div className="font-body text-sm">
                    {m.t}
                    <small className="block text-on-ink-3 text-[11px] mt-0.5">{m.s}</small>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 font-display font-bold text-xs uppercase tracking-[0.12em]">
              ✓ Result: 7 days to MVP.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
