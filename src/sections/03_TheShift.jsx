import { motion } from 'framer-motion'
import { copy } from '../content/siteCopy'

export default function TheShift() {
  const shiftCopy = copy.theShift

  return (
    <section className="bg-ink-bg text-cream border-t-2 border-ink-bg">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-24 md:py-32">
        
        {/* Top Row: Headline Left — Sub-headline Right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-16 lg:mb-24">
          
          {/* Left — Headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
          >
            <div className="eyebrow text-cream/50 mb-6">{shiftCopy.eyebrow}</div>
            <h2 className="display-lg text-cream">
              {shiftCopy.headline.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>
          </motion.div>

          {/* Right — Sub-headline / Description */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:pt-12 font-body text-lg text-cream/70 flex flex-col gap-6 max-w-xl"
          >
            {shiftCopy.body.split('\n\n').map((p, i) => (
              <p key={i} className={i === 1 ? 'text-cream' : ''}>
                {p}
              </p>
            ))}
          </motion.div>
        </div>

        {/* Bottom Row: 4 Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {shiftCopy.items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative bg-[#111111] border border-cream/10 rounded-chip p-8 md:p-10 hover:border-primary/50 transition-colors duration-300 overflow-hidden"
            >
              {/* Subtle highlight gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="display-md text-primary leading-none mb-6">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display font-bold text-lg md:text-xl uppercase tracking-wide text-cream mb-4">
                  {/* Clean up the title (e.g. remove "01 — ") */}
                  {item.title.replace(/^\d+\s*—\s*/, '')}
                </h3>
                <p className="font-body text-base text-cream/70 leading-relaxed max-w-lg">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
