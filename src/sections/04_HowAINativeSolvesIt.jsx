import { motion } from 'framer-motion'
import { copy } from '../content/siteCopy'

export default function HowAINativeSolvesIt() {
  const aiCopy = copy.aiNative
  const headlineParts = aiCopy.headline.split('. ').filter(Boolean)
  const without = aiCopy.withoutItems.map((item) => ({ t: item.title, s: item.text }))
  const withUs = aiCopy.withItems.map((item) => ({ t: item.title, s: item.text }))

  return (
    <section className="bg-cream-2 border-t-2 border-ink">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-24 md:py-32">
        <div className="max-w-6xl mb-16">
          <div className="eyebrow text-ink-3 mb-3">{aiCopy.eyebrow}</div>
          <h2 className="display-lg text-ink">
            {headlineParts[0]}.<br />
            <span className="bg-primary text-cream px-3 inline-block">{headlineParts.slice(1).join('. ')}</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_88px_minmax(0,1fr)] gap-6 lg:gap-0 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="p-8 bg-cream border-2 border-ink rounded-chip"
          >
            <div className="inline-block px-3 py-1 mb-6 bg-ink text-cream rounded-chip font-display font-bold text-[10px] uppercase tracking-[0.14em]">
              {aiCopy.withoutLabel}
            </div>
            <h3 className="display-md text-ink mb-7 leading-[0.95]">{aiCopy.withoutHeadline}</h3>
            <ul className="space-y-2">
              {without.map((m) => (
                <li key={m.t} className="flex items-center gap-3 p-3 bg-cream-2 border border-ink/15 rounded-chip">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#E5403A] flex items-center justify-center text-cream font-bold">
                    x
                  </span>
                  <div className="font-body text-sm">
                    <span className="line-through decoration-danger decoration-[1.5px]">{m.t}</span>
                    <small className="block italic text-ink-3 text-[11px] mt-0.5">"{m.s}"</small>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 font-display font-bold text-xs uppercase tracking-[0.12em] text-danger">
              {aiCopy.withoutResult}
            </div>
          </motion.div>

          <div className="flex lg:flex-col items-center justify-center">
            <div className="bg-ink text-cream w-16 h-16 rounded-chip flex flex-col items-center justify-center">
              <span className="display-md leading-none">VS</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 bg-primary text-cream border-2 border-ink rounded-chip"
          >
            <div className="inline-block px-3 py-1 mb-6 bg-cream text-ink rounded-chip font-display font-bold text-[10px] uppercase tracking-[0.14em]">
              {aiCopy.withLabel}
            </div>
            <h3 className="display-md mb-7 leading-[0.95]">{aiCopy.withHeadline}</h3>
            <ul className="space-y-2">
              {withUs.map((m) => (
                <li key={m.t} className="flex items-center gap-3 p-3 bg-cream/10 border border-cream/20 rounded-chip">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#3BAC5A] flex items-center justify-center text-cream font-bold">
                    ✓
                  </span>
                  <div className="font-body text-sm">
                    {m.t}
                    <small className="block text-on-ink-3 text-[11px] mt-0.5">{m.s}</small>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 font-display font-bold text-xs uppercase tracking-[0.12em]">
              {aiCopy.withResult}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
