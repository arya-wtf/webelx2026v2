import { motion } from 'framer-motion'

export default function StillReading() {
  return (
    <section className="bg-cream text-ink border-t-2 border-ink">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div className="max-w-2xl">
            <div className="eyebrow text-ink-3 mb-3">[STILL READING?]</div>
            <h3 className="display-lg leading-[0.95]">
              GOOD. <span className="text-ink-2">THAT MEANS WE SHOULD TALK.</span>
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href="mailto:project@elux.space" className="btn-primary">
              Start a project
              <span className="inline-block w-4 h-4 leading-none">↗</span>
            </a>
            <a href="#work" className="font-display font-bold text-[12px] uppercase tracking-[0.12em] text-ink hover:text-primary transition-colors px-4 py-3 border-2 border-ink rounded-full">
              Or, see the work first
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
