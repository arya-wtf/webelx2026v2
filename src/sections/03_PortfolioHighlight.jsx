import { motion } from 'framer-motion'
import saasImg from '../assets/work-images/saas.webp'
import fintechImg from '../assets/work-images/fintech.webp'
import aiAgentImg from '../assets/work-images/ai-agent.webp'
import mobilityImg from '../assets/work-images/mobility.webp'
import { copy } from '../content/siteCopy'

const images = [saasImg, fintechImg, aiAgentImg, mobilityImg]

export default function PortfolioHighlight() {
  const portfolioCopy = copy.portfolio
  const cards = portfolioCopy.cards.map((card, i) => ({ ...card, img: images[i % images.length] }))

  return (
    <section id="work" className="bg-cream">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-8">
          <div>
            <div className="eyebrow text-ink-3 mb-3">{portfolioCopy.eyebrow}</div>
            <h2 className="display-lg text-ink mb-4">{portfolioCopy.headline}</h2>
            {portfolioCopy.body && (
              <p className="font-body text-lg text-ink-2 max-w-xl">{portfolioCopy.body}</p>
            )}
          </div>
          <a href="#contact" className="btn-cream hidden md:inline-flex shrink-0">
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
              {/* Lighter overall overlay + gradient at the bottom for text readability */}
              <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/30 transition-colors duration-300 rounded-chip" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/70 to-transparent pointer-events-none rounded-b-chip" />

              <span className="absolute top-5 left-5 font-display font-bold text-[10px] uppercase tracking-[0.1em] text-cream bg-primary px-2 py-1 rounded-chip z-10 shadow-sm">
                {c.tag}
              </span>

              {/* Added right-16 to prevent overlapping the arrow button */}
              <div className="absolute bottom-5 left-5 right-16 z-10">
                <div className="font-display font-bold text-2xl uppercase text-cream drop-shadow-md">{c.title}</div>
                {/* Increased text size and contrast for readability */}
                <div className="font-body text-sm text-cream/90 mt-1 drop-shadow-sm leading-relaxed">{c.sub}</div>
              </div>

              {/* Added bg-ink/20 and backdrop-blur to make the button stand out */}
              <div className="absolute bottom-5 right-5 z-20 w-9 h-9 rounded-full border border-cream/40 bg-ink/20 backdrop-blur-sm flex items-center justify-center text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                ↗
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
