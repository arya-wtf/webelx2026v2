import { motion } from 'framer-motion'

/**
 * v2 Section 03 — Portfolio Highlight (ASSET-BLOCKED, same as v1).
 * Honest dashed placeholders so the section reads as deliberately unfinished
 * until real client work lands. BORING-style heavy display headline + chip row.
 */
const cards = [
  { tag: 'SAAS · MVP',  title: 'CASE 01',  sub: 'Replace with real project'   },
  { tag: 'FINTECH',     title: 'CASE 02',  sub: 'Replace with real project'   },
  { tag: 'AI AGENT',    title: 'CASE 03',  sub: 'Replace with real project'   },
  { tag: 'MOBILITY',    title: 'CASE 04',  sub: 'Replace with real project'   },
]

export default function PortfolioHighlight() {
  return (
    <section id="work" className="bg-cream">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-24 md:py-32">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="eyebrow text-ink-3 mb-3">[RECENT WORK]</div>
            <h2 className="display-lg text-ink">
              SHIPPED.<br />
              NOT SHELVED.
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button className="w-11 h-11 rounded-chip border-2 border-ink hover:bg-primary hover:text-cream transition-colors">←</button>
            <button className="w-11 h-11 rounded-chip bg-ink text-cream">→</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="aspect-[3/4] rounded-chip border-2 border-dashed border-ink/40 bg-cream-3/40 p-5 flex flex-col justify-between relative"
            >
              <span className="self-start font-display font-bold text-[10px] uppercase tracking-[0.1em] text-ink-3 bg-cream px-2 py-1 rounded-chip border border-ink/20">
                {c.tag}
              </span>
              <div className="flex-1 flex items-center justify-center">
                <span className="font-display font-bold text-[10px] uppercase tracking-[0.14em] text-ink-3">Asset placeholder</span>
              </div>
              <div>
                <div className="font-display font-bold text-xl uppercase">{c.title}</div>
                <div className="font-body text-xs text-ink-3 mt-1">{c.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
