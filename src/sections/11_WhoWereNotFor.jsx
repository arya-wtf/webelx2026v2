import { motion } from 'framer-motion'
import { copy } from '../content/siteCopy'

export default function WhoWereNotFor() {
  const fitCopy = copy.fitCheck

  return (
    <section id="contact" className="bg-ink-bg text-cream">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="eyebrow text-on-ink-3 mb-4">{fitCopy.eyebrow}</div>
          <h2 className="display-lg max-w-5xl">{fitCopy.headline}</h2>
          <p className="body-lg text-on-ink-2 mt-7 max-w-2xl">{fitCopy.supportingCopy}</p>
        </motion.div>

        <ul className="flex flex-col">
          {fitCopy.accepts.map((a, i) => {
            const [title, desc] = a.split(' | ')
            return (
              <motion.li
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="py-6 border-b border-line-ink"
              >
                <div className="grid grid-cols-[2rem_1fr] md:grid-cols-[2.5rem_minmax(0,2fr)_minmax(0,3fr)] gap-x-6 md:gap-x-10 items-start">
                  {/* Number */}
                  <span className="font-display font-bold text-xs text-primary pt-1 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Title */}
                  <div className="relative inline-block font-display font-bold text-xl md:text-2xl uppercase tracking-[-0.01em] leading-tight self-start">
                    <span>{title}</span>
                    <motion.span
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.7, delay: i * 0.08 + 0.25 }}
                      className="absolute left-0 right-0 -bottom-1 h-[2px] bg-primary origin-left"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Description — desktop: third column */}
                  {desc && (
                    <p className="hidden md:block font-body text-sm text-on-ink-2 leading-relaxed self-center">
                      {desc}
                    </p>
                  )}

                  {/* Description — mobile: below title */}
                  {desc && (
                    <p className="md:hidden col-start-2 font-body text-sm text-on-ink-2 leading-relaxed mt-3">
                      {desc}
                    </p>
                  )}
                </div>
              </motion.li>
            )
          })}
        </ul>

        {fitCopy.cta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 flex justify-center"
          >
            <a href="#contact" className="btn-primary inline-flex">
              {fitCopy.cta} ↗
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}
