import { motion } from 'framer-motion'
import { copy } from '../content/siteCopy'

export default function HowWeWork() {
  const howCopy = copy.howWeWork

  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-end mb-14">
          <div>
            <div className="eyebrow text-ink-3 mb-3">{howCopy.eyebrow}</div>
            <h2 className="display-lg text-ink">{howCopy.headline}</h2>
          </div>
          <p className="body-md text-ink-2">{howCopy.supportingCopy}</p>
        </div>

        <ol className="flex flex-col">
          {howCopy.steps.map((s, i) => (
            <motion.li
              key={s.t}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="grid lg:grid-cols-[28%_1fr] gap-10 pb-10 last:pb-0"
            >
              <div className="flex items-start gap-4">
                <div className="w-3.5 h-3.5 rounded-full bg-primary mt-3" />
                <div>
                  <div className="display-md text-ink leading-none tabular-nums">STEP {String(i + 1).padStart(2, '0')}</div>
                  <div className="font-display font-bold text-[11px] uppercase tracking-[0.14em] text-ink-3 mt-2">
                    {s.timeLabel}
                  </div>
                </div>
              </div>

              <div className="bg-cream-2 border-2 border-ink rounded-chip p-7">
                <div className="font-display font-bold text-[11px] uppercase tracking-[0.14em] text-ink-3 mb-3">
                  STEP {String(i + 1).padStart(2, '0')}
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
          <div className="font-body text-sm text-ink-2 max-w-2xl pt-1">{howCopy.loopCopy}</div>
        </motion.div>
      </div>
    </section>
  )
}
