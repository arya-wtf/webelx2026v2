import { motion } from 'framer-motion'

/**
 * v2 Hero — BORING-style.
 * Cream canvas, oversized condensed Bricolage display, Elux-blue CTA,
 * an editorial chip at the top, and a tight chip-row of meta info
 * at the bottom (BORING's hero pattern).
 *
 * Single static composition for v1-of-v2. Motion is gentle fade-up
 * staggers — BORING doesn't lean on flashy hero motion either.
 */
export default function Hero() {
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section className="relative isolate overflow-hidden bg-cream">
      <div className="mx-auto max-w-page px-6 lg:px-10 pt-12 pb-20 md:pt-16 md:pb-28">
        {/* Top meta row — single left chip; Let's talk lives in the nav */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mb-12 md:mb-16"
        >
          <motion.span variants={fadeUp} className="btn-cream">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            The Digital Studio
          </motion.span>
        </motion.div>

        {/* Massive headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="display-xl text-ink"
        >
          AI-NATIVE
          <br />
          PRODUCTS THAT
          <br />
          ACTUALLY <span className="bg-primary text-cream px-3 -mx-1 inline-block">SHIP.</span>
        </motion.h1>

        {/* Sub-row: lede + CTA */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } } }}
          className="mt-10 md:mt-14 grid lg:grid-cols-[1.3fr_0.7fr] gap-8 items-end"
        >
          <motion.p variants={fadeUp} className="body-lg max-w-xl text-ink-2">
            We design and build AI-native products for founders who need to
            launch fast and look credible from day one.
            <span className="block mt-2 text-ink-3 italic">
              UX, UI, and front-end — under one roof. No handoff. No drama.
            </span>
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn-primary">
              Start a project
              <span className="inline-block w-4 h-4 leading-none">↗</span>
            </a>
            <a href="#work" className="btn-cream">
              See recent work
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom meta strip — like BORING's hero footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 md:mt-24 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4"
        >
          <div className="eyebrow text-ink-3">Trusted by 40+ founders</div>
          <div className="flex items-center gap-6 text-ink-3 font-body text-xs uppercase tracking-[0.12em]">
            <span>Clutch · 5.0</span>
            <span>·</span>
            <span>Contra · 5.0</span>
            <span>·</span>
            <span>Dribbble · 2.9K</span>
            <span>·</span>
            <span>DesignRush · Verified</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
