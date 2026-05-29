import { motion } from 'framer-motion'
import saasImg from '../assets/work-images/saas.webp'
import fintechImg from '../assets/work-images/fintech.webp'
import aiAgentImg from '../assets/work-images/ai-agent.webp'
import mobilityImg from '../assets/work-images/mobility.webp'

/**
 * v2 Section 03 — Portfolio Highlight.
 * BORING-style heavy display headline + chip row.
 */
const cards = [
  { tag: 'SAAS · MVP',  title: 'SAAS MVP',   sub: 'Design & build from scratch',    img: saasImg     },
  { tag: 'FINTECH',     title: 'Fintech',     sub: 'Redesign & scale',               img: fintechImg  },
  { tag: 'AI AGENT',    title: 'AI Agent',    sub: 'AI-native product design',       img: aiAgentImg  },
  { tag: 'MOBILITY',    title: 'Mobility',    sub: 'End-to-end product',            img: mobilityImg },
]

export default function PortfolioHighlight() {
  return (
    <section id="work" className="bg-cream">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-24 md:py-32">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="eyebrow text-ink-3 mb-3">[RECENT WORK]</div>
            <h2 className="display-lg text-ink">
              SHIPPED.<br />
              NOT SHELVED.
            </h2>
          </div>
          <a href="#contact" className="btn-cream hidden md:inline-flex">
            All work ↗
          </a>
        </div>

        <div className="flex flex-col gap-6 items-center">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="w-full max-w-[72%] aspect-[16/9] rounded-chip relative overflow-hidden group cursor-pointer"
              style={{ backgroundImage: `url(${c.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-ink/40 group-hover:bg-ink/55 transition-colors duration-300 rounded-chip" />

              {/* Tag — top left */}
              <span className="absolute top-5 left-5 font-display font-bold text-[10px] uppercase tracking-[0.1em] text-cream bg-primary px-2 py-1 rounded-chip z-10">
                {c.tag}
              </span>

              {/* Title + sub — bottom left */}
              <div className="absolute bottom-5 left-5 z-10">
                <div className="font-display font-bold text-2xl uppercase text-cream">{c.title}</div>
                <div className="font-body text-xs text-cream/80 mt-1">{c.sub}</div>
              </div>

              {/* Arrow — bottom right */}
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
