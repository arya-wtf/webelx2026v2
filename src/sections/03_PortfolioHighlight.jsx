import { motion } from 'framer-motion'
import saasImg from '../assets/work-images/saas.webp'
import fintechImg from '../assets/work-images/fintech.webp'
import aiAgentImg from '../assets/work-images/ai-agent.webp'
import mobilityImg from '../assets/work-images/mobility.webp'
import { copy } from '../content/siteCopy'

const images = [saasImg, fintechImg, aiAgentImg, mobilityImg]

export default function PortfolioHighlight() {
  const portfolioCopy = copy.portfolio
  const cards = portfolioCopy.cards.map((card, i) => ({ ...card, img: images[i] }))

  return (
    <section id="work" className="bg-cream">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-24 md:py-32">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="eyebrow text-ink-3 mb-3">{portfolioCopy.eyebrow}</div>
            <h2 className="display-lg text-ink">{portfolioCopy.headline}</h2>
          </div>
          <a href="#contact" className="btn-cream hidden md:inline-flex">
            {portfolioCopy.cta} ↗
          </a>
        </div>

        <div className="flex flex-col gap-6 items-center">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="w-full max-w-[72%] aspect-[16/9] rounded-chip relative overflow-hidden group cursor-pointer"
              style={{ backgroundImage: `url(${c.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-ink/40 group-hover:bg-ink/55 transition-colors duration-300 rounded-chip" />

              <span className="absolute top-5 left-5 font-display font-bold text-[10px] uppercase tracking-[0.1em] text-cream bg-primary px-2 py-1 rounded-chip z-10">
                {c.tag}
              </span>

              <div className="absolute bottom-5 left-5 z-10">
                <div className="font-display font-bold text-2xl uppercase text-cream">{c.title}</div>
                <div className="font-body text-xs text-cream/80 mt-1">{c.sub}</div>
              </div>

              <div className="absolute bottom-5 right-5 z-10 w-9 h-9 rounded-full border border-cream/40 flex items-center justify-center text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                ↗
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
