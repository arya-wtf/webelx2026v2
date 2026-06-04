import { motion } from 'framer-motion'
import { copy } from '../content/siteCopy'

export default function ProblemSolution() {
  const problemCopy = copy.problemSolution

  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-24 md:py-32">
        <div className="max-w-6xl mb-14">
          <div className="eyebrow text-ink-3 mb-3">{problemCopy.eyebrow}</div>
          <h2 className="display-lg text-ink whitespace-pre-line">{problemCopy.headline}</h2>
        </div>

        <div className="flex flex-col gap-5">
          {problemCopy.rows.map((r, i) => (
            <motion.div
              key={r.headline}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group grid lg:grid-cols-[auto_1fr_auto] gap-8 items-center border-2 border-ink rounded-chip p-8 md:p-10 bg-cream-2 hover:bg-ink-bg transition-colors duration-300 cursor-pointer"
            >
              <div className="display-md text-primary leading-none">{String(i + 1).padStart(2, '0')}</div>
              <div className="flex-1">
                <div className="font-display font-bold text-[11px] uppercase tracking-[0.14em] mb-2 text-primary">
                  {r.kicker}
                </div>
                <h3 className="display-md mb-3 text-ink group-hover:text-cream transition-colors duration-300">{r.headline}</h3>
                <p className="body-md max-w-xl text-ink-2 group-hover:text-on-ink-2 transition-colors duration-300">{r.copy}</p>
              </div>
              <a href="#contact" className="btn-cream group-hover:btn-primary transition-all duration-300">
                {r.cta}
                <span className="inline-block w-4 h-4 leading-none">↗</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
