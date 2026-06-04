import { motion } from 'framer-motion'
import { copy } from '../content/siteCopy'

export default function StillReading() {
  const stillReadingCopy = copy.stillReading

  return (
    <section className="bg-cream text-ink border-t-2 border-ink">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 md:gap-12"
        >
          <div className="w-full max-w-4xl">
            <div className="eyebrow text-ink-3 mb-3">{stillReadingCopy.eyebrow}</div>
            <h3 className="display-lg leading-[0.95]">
              {stillReadingCopy.headline.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < stillReadingCopy.headline.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href="mailto:project@elux.space" className="btn-primary">
              {stillReadingCopy.primaryCta}
              <span className="inline-block w-4 h-4 leading-none">↗</span>
            </a>
            {stillReadingCopy.secondaryCta && (
              <a href="#work" className="font-display font-bold text-[12px] uppercase tracking-[0.12em] text-ink hover:text-primary transition-colors px-4 py-3 border-2 border-ink rounded-full">
                {stillReadingCopy.secondaryCta}
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
