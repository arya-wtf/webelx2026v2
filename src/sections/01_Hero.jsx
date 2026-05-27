import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * v2 Hero — composed for a single viewport.
 *
 * Architecture:
 *   Top row    — eyebrow chip
 *   Middle row — massive headline (the visual anchor)
 *                The final verb cycles: SHIP → LAUNCH → CONVERT → SCALE
 *                via a vertical letter-flip every 2.6s.
 *   Bottom row — split: lede + CTAs on the left, meta column on the right
 *   Footer row — proof strip hairlined off the bottom
 *
 * The grid uses CSS Grid `grid-rows` so the four bands distribute
 * vertically inside `min-h-[calc(100vh-64px)]` (viewport minus nav).
 * Headline upper-bound dropped from 168px → 128px so 3 lines clear
 * standard laptop viewports.
 */

const VERBS = ['SHIP.', 'LAUNCH.', 'CONVERT.', 'SCALE.']

function RotatingVerb() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % VERBS.length), 2600)
    return () => clearInterval(t)
  }, [])
  // Container uses Framer's `layout` prop so it tweens its width
  // automatically as the inner word changes length. The word itself
  // flips vertically with AnimatePresence inside.
  return (
    <motion.span
      layout
      transition={{ layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
      className="relative inline-flex items-center justify-center bg-primary text-cream px-3 -mx-1 overflow-hidden align-baseline"
      style={{ height: '1em', verticalAlign: 'baseline' }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={VERBS[i]}
          layout="position"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block whitespace-nowrap"
        >
          {VERBS[i]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  )
}

export default function Hero() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section className="relative isolate overflow-hidden bg-cream">
      {/* Floating dashed proof tile — depth element, honest placeholder for
          client work that'll land later. Hidden on mobile to keep the hero
          composition clean. Anchored to the top-right of the section. */}
      <motion.div
        initial={{ opacity: 0, y: -8, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: -3 }}
        transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ rotate: 0, scale: 1.04 }}
        className="hidden lg:flex absolute top-[88px] right-[5%] z-10 w-[220px] aspect-[5/3] rounded-chip border-2 border-dashed border-ink/40 bg-cream/60 backdrop-blur-sm p-4 flex-col justify-between"
        aria-hidden="true"
        style={{ transformOrigin: 'center' }}
      >
        <div className="flex items-center justify-between">
          <span className="font-display font-bold text-[9px] uppercase tracking-[0.14em] text-ink-3">
            ◆ NEXT CASE
          </span>
          <span className="font-display font-bold text-[9px] text-ink-3">
            01/12
          </span>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="font-display font-bold text-[11px] uppercase tracking-[0.1em] text-ink-2 mb-1">
              Real client work
            </div>
            <div className="font-body text-[9.5px] text-ink-3 leading-snug">
              lands here when<br />assets arrive
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-display font-bold text-[9px] uppercase tracking-[0.1em] text-primary">
            SHIPPED
          </span>
          <span className="font-display text-[9px] text-ink-3">→</span>
        </div>
      </motion.div>

      <div
        className="mx-auto max-w-page px-6 lg:px-10 grid"
        style={{
          minHeight: 'calc(100vh - 64px - 32px)',
          gridTemplateRows: 'auto 1fr auto auto',
          rowGap: 'clamp(20px, 3vh, 36px)',
          paddingTop: 'clamp(20px, 4vh, 44px)',
          paddingBottom: 'clamp(20px, 3vh, 36px)',
        }}
      >
        {/* ROW 1 — eyebrow chip */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.span variants={fadeUp} className="btn-cream">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            The Digital Studio
          </motion.span>
        </motion.div>

        {/* ROW 2 — headline (anchor of the composition) */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="display text-ink self-center"
          style={{
            fontSize: 'clamp(48px, 9.5vw, 128px)',
            lineHeight: 0.92,
            letterSpacing: '-0.025em',
            textTransform: 'uppercase',
          }}
        >
          AI-NATIVE
          <br />
          PRODUCTS THAT
          <br />
          ACTUALLY <RotatingVerb />
        </motion.h1>

        {/* ROW 3 — lede + CTAs (2-col on lg, stacked on small) */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }}
          className="grid lg:grid-cols-[1.3fr_0.7fr] gap-6 lg:gap-8 items-end"
        >
          <motion.p variants={fadeUp} className="body-lg max-w-xl text-ink-2">
            We design and build AI-native products for founders who need to launch fast
            and look credible from day one.
            <span className="block mt-2 text-ink-3 italic">
              UX, UI, and front-end — under one roof. No handoff. No drama.
            </span>
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 lg:justify-end">
            <a href="#contact" className="btn-primary">
              Start a project
              <span className="inline-block w-4 h-4 leading-none">↗</span>
            </a>
            <a href="#work" className="btn-cream">
              See recent work
            </a>
          </motion.div>
        </motion.div>

        {/* ROW 4 — proof strip (on the fold) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="pt-5 border-t border-line flex flex-wrap items-center justify-between gap-x-6 gap-y-2"
        >
          <div className="eyebrow text-ink-3">Trusted by 40+ founders</div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-ink-3 font-display text-[11px] uppercase tracking-[0.14em]">
            <span>Clutch · 5.0</span>
            <span className="text-line">·</span>
            <span>Contra · 5.0</span>
            <span className="text-line">·</span>
            <span>Dribbble · 2.9K</span>
            <span className="text-line">·</span>
            <span>DesignRush · Verified</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
