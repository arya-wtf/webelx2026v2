import { motion } from 'framer-motion'

/**
 * v2 Section 09 — How We Work.
 * BORING-style vertical timeline. Big tabular time markers, ink-bordered
 * cards, deliverables strip, "and loop" return at the bottom.
 */
const STEPS = [
  {
    n: '01',
    time: '48H',
    timeLabel: 'to scope',
    t: 'BRIEF & ALIGN',
    desc: 'One async intake, one strategy call. We come back with scope, timeline, and the smallest first ship in 48 hours.',
    deliverables: ['Scoped brief', 'Timeline', 'First-ship plan'],
  },
  {
    n: '02',
    time: 'DAY 1–6',
    timeLabel: 'design + build',
    t: 'DESIGN & BUILD IN PARALLEL',
    desc: 'UX, UI, and front-end happen in the same sprint. Less handoff. Faster feedback. Real builds, not pretty mockups.',
    deliverables: ['UX flows', 'UI screens', 'Production build'],
  },
  {
    n: '03',
    time: 'DAY 7',
    timeLabel: 'live → ∞',
    t: 'SHIP & ITERATE',
    desc: 'Live on day 7. Then weekly improvements based on real users, not on Slack opinions.',
    deliverables: ['Public launch', 'Weekly improvements', 'Usage telemetry'],
  },
]

export default function HowWeWork() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-end mb-14">
          <div>
            <div className="eyebrow text-ink-3 mb-3">[OUR PROCESS]</div>
            <h2 className="display-lg text-ink">
              A LOOP.<br />
              NOT A WATERFALL.
            </h2>
          </div>
          <p className="body-md text-ink-2">
            We don't hand off, then disappear. Same team designs it, ships it, and keeps shipping every week after launch.
          </p>
        </div>

        <ol className="flex flex-col">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="grid lg:grid-cols-[28%_1fr] gap-10 pb-10 last:pb-0"
            >
              <div className="flex items-start gap-4">
                <div className="w-3.5 h-3.5 rounded-full bg-primary mt-3" />
                <div>
                  <div className="display-md text-ink leading-none tabular-nums">{s.time}</div>
                  <div className="font-display font-bold text-[11px] uppercase tracking-[0.14em] text-ink-3 mt-2">
                    {s.timeLabel}
                  </div>
                </div>
              </div>

              <div className="bg-cream-2 border-2 border-ink rounded-chip p-7">
                <div className="font-display font-bold text-[11px] uppercase tracking-[0.14em] text-ink-3 mb-3">
                  STEP {s.n}
                </div>
                <h3 className="display-md text-ink mb-3">{s.t}</h3>
                <p className="body-md text-ink-2 mb-5 max-w-2xl">{s.desc}</p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 border-t-2 border-ink/15">
                  <div className="font-display font-bold text-[10px] uppercase tracking-[0.14em] text-ink-3">
                    You walk away with
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {s.deliverables.map((d) => (
                      <span key={d} className="px-2.5 py-1 rounded-chip bg-cream border border-ink/30 font-display font-bold text-[10px] uppercase tracking-[0.06em] text-ink-2">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>

        {/* AND LOOP return */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid lg:grid-cols-[28%_1fr] gap-10 pt-4 border-t-2 border-ink/15"
        >
          <div className="flex items-start gap-4">
            <div className="w-3.5 h-3.5 rounded-full bg-ink mt-3" />
            <div>
              <div className="display-md text-primary leading-none">↑</div>
              <div className="font-display font-bold text-[11px] uppercase tracking-[0.14em] text-primary mt-2">
                and loop
              </div>
            </div>
          </div>
          <div className="font-body text-sm text-ink-2 max-w-2xl pt-1">
            After ship, we're not done. We're on weekly cycles. Each loop trims friction, adds value, and gets you closer to product-market fit.
          </div>
        </motion.div>
      </div>
    </section>
  )
}
