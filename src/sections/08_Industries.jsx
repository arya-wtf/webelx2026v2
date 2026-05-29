import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import aiSasImg from '../assets/service-images/Service Image - MVP UX and UI Design.webp'
import fintechImg from '../assets/service-images/Service Image - Dashboard and Data UX.webp'
import healthImg from '../assets/service-images/Service Image - Brand and Visual Enhancement.webp'
import mobilityImg from '../assets/service-images/Service Image - Website Redesign.webp'
import marketplaceImg from '../assets/service-images/Service Image - Launch Ready Landing Page.webp'

/**
 * v2 Section 08 — Industries.
 * BORING-style giant uppercase list. Click an industry, headline area
 * updates with real case visual.
 */
const industries = [
  { name: 'AI & SAAS',         count: '12', tagline: 'BUILT FOR BUILDERS.',     img: aiSasImg     },
  { name: 'FINTECH',           count: '07', tagline: 'MONEY. FASTER.',           img: fintechImg   },
  { name: 'HEALTH & WELLNESS', count: '05', tagline: 'CARE, DESIGNED.',         img: healthImg    },
  { name: 'MOBILITY',          count: '04', tagline: 'POWERED TO PLAY ALL DAY.', img: mobilityImg  },
  { name: 'MARKETPLACE',       count: '06', tagline: 'LIQUIDITY, BY DESIGN.',    img: marketplaceImg },
]

export default function Industries() {
  const [active, setActive] = useState(0)
  return (
    <section id="industries" className="bg-cream-2 border-y-2 border-ink">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-24 md:py-32">
        <div className="mb-12">
          <div className="eyebrow text-ink-3 mb-3">[BY INDUSTRY]</div>
          <h2 className="display-lg text-ink">
            BUILT ACROSS<br />
            SECTORS WHERE<br />
            <span className="bg-primary text-cream px-3 inline-block">SPEED COMPOUNDS.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <div className="flex flex-col">
            {industries.map((ind, i) => (
              <button
                key={ind.name}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="grid grid-cols-[auto_1fr_auto] gap-5 py-5 border-b-2 border-ink items-center text-left"
              >
                <span className={`font-display font-bold text-[11px] tabular-nums ${active === i ? 'text-primary' : 'text-ink-3'}`}>{ind.count}</span>
                <span className={`display-md tracking-[-0.01em] transition-colors ${active === i ? 'text-ink' : 'text-ink-3'}`}>{ind.name}</span>
                <span className={`w-9 h-9 rounded-chip border-2 flex items-center justify-center transition-colors ${active === i ? 'bg-primary text-cream border-primary' : 'border-ink-3 text-ink-3'}`}>↗</span>
              </button>
            ))}
          </div>

          <div className="lg:sticky lg:top-24">
            <div 
              className="aspect-[5/4] rounded-chip flex flex-col items-center justify-center p-10 relative overflow-hidden"
              style={{ backgroundImage: `url(${industries[active].img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              {/* Dark overlay (reduced since no text) */}
              <div className="absolute inset-0 bg-ink/20" />
              <div className="absolute top-5 left-5 font-display font-bold text-[10px] uppercase tracking-[0.12em] text-cream/60">
                elux/case-{String(active + 1).padStart(2, '0')}
              </div>
              <div className="absolute top-5 right-5 text-right font-body text-[10px] text-cream/60 leading-relaxed">
                UX & UI Design<br />No-code Build<br />Brand System<br />Launch
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
