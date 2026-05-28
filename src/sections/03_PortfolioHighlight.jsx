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
          <div className="hidden md:flex gap-2">
            <button className="w-11 h-11 rounded-chip border-2 border-ink hover:bg-primary hover:text-cream transition-colors">←</button>
            <button className="w-11 h-11 rounded-chip bg-ink text-cream">→</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="aspect-[3/4] rounded-chip p-5 flex flex-col justify-between relative overflow-hidden"
              style={{ backgroundImage: `url(${c.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-ink/50 rounded-chip" />

              <span className="self-start font-display font-bold text-[10px] uppercase tracking-[0.1em] text-cream bg-primary px-2 py-1 rounded-chip relative z-10">
                {c.tag}
              </span>

              <div className="relative z-10">
                <div className="font-display font-bold text-xl uppercase text-cream">{c.title}</div>
                <div className="font-body text-xs text-cream/80 mt-1">{c.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
