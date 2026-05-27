import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * v2 Section 07 — Services by Stage.
 * BORING-style: heavy uppercase service list, big stage chips, ink-bordered cards.
 * No earned-reveal preview here — that's signature v1. Instead, v2 leans into
 * scale: the active stage gets a giant headline + a flat numbered service list.
 */
const STAGES = {
  Seed: {
    h: 'VALIDATE FAST.\nSHIP A CREDIBLE MVP\nIN 7 DAYS.',
    p: 'Prove the core value, ship the first version, look legit from day one.',
    cta: 'Start a Seed engagement',
    items: ['MVP UX & UI Design', 'Clickable Prototype', 'Launch-Ready Landing Page', 'No-Code MVP Build', 'Pitch & Demo Readiness'],
  },
  Growth: {
    h: 'REDUCE FRICTION.\nSCALE ACTIVATION\nAND RETENTION.',
    p: 'Audit, redesign, and ship the flows that compound user value.',
    cta: 'Start a Growth engagement',
    items: ['UX Audit & Heuristic Review', 'Activation Flow Redesign', 'Design System Setup', 'A/B Test Variants', 'Feature Sprint Support'],
  },
  Scale: {
    h: 'MATURE THE PRODUCT.\nOPERATE LIKE A SYSTEM.\nNOT A STACK.',
    p: 'Design ops, brand evolution, and dedicated squad support.',
    cta: 'Book a Scale call',
    items: ['Brand Evolution', 'Design Ops Setup', 'Dedicated Squad', 'Internal Tools UX', 'Quarterly Strategy'],
  },
}
const ORDER = ['Seed', 'Growth', 'Scale']

export default function ServicesByStage() {
  const [stage, setStage] = useState('Seed')
  const data = STAGES[stage]

  return (
    <section id="services" className="bg-cream">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-24 md:py-32">
        <div className="mb-12">
          <div className="eyebrow text-ink-3 mb-3">[SERVICES BY STAGE]</div>
          <h2 className="display-lg text-ink">SUPPORT THAT FITS WHERE YOU ARE.</h2>
        </div>

        {/* big stage chips */}
        <div className="flex flex-wrap gap-2 mb-12">
          {ORDER.map((s, i) => {
            const active = stage === s
            return (
              <button
                key={s}
                onClick={() => setStage(s)}
                className={`flex items-center gap-3 px-5 py-3 border-2 border-ink rounded-chip font-display font-bold uppercase text-base tracking-[0.04em] transition-colors ${
                  active ? 'bg-ink text-cream' : 'bg-cream text-ink hover:bg-cream-2'
                }`}
              >
                <span className={`text-xs ${active ? 'text-primary' : 'text-ink-3'}`}>0{i + 1}</span>
                {s}
              </button>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-12 items-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <h3 className="display-lg text-ink whitespace-pre-line leading-[0.95]">
                {data.h}
              </h3>
              <p className="body-lg text-ink-2 mt-6 max-w-md">{data.p}</p>
              <a href="#contact" className="btn-primary mt-8">
                {data.cta}
                <span className="inline-block w-4 h-4 leading-none">↗</span>
              </a>
            </motion.div>
          </AnimatePresence>

          <div className="border-t-2 border-ink">
            {data.items.map((it, i) => (
              <motion.div
                key={`${stage}-${it}`}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="grid grid-cols-[auto_1fr_auto] gap-5 py-5 border-b-2 border-ink items-center group cursor-pointer"
              >
                <span className="font-display font-bold text-[11px] text-ink-3 tabular-nums">0{i + 1}</span>
                <span className="font-display font-bold text-lg uppercase tracking-[0.02em] group-hover:text-primary transition-colors">{it}</span>
                <span className="w-9 h-9 rounded-chip border-2 border-ink flex items-center justify-center group-hover:bg-primary group-hover:text-cream group-hover:border-primary transition-colors">↗</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
