import { motion } from 'framer-motion'

/**
 * v2 Section 05 — Problem → Solution.
 * BORING-style: three big stacked rows with thick ink borders, alternating
 * cream and dark surfaces, oversized headlines, blue accent on the kicker.
 * Static layout — no GSAP pin scroll (that's signature v1).
 */
const rows = [
  {
    kicker: "YOU'RE SHORT ON HANDS.",
    h: 'SHIP FAST WHEN YOUR TEAM IS AT CAPACITY.',
    p: 'We step in with clear ownership from UX to build-ready UI. Focused sprints, fast feedback, delivery that keeps your roadmap moving without delays.',
    cta: 'Extend my team',
    dark: false,
  },
  {
    kicker: 'ADOPTION IS SLOWING.',
    h: 'UX FRICTION IS HOLDING USERS BACK.',
    p: 'We audit what is breaking the experience, then redesign the flows that matter most so users move faster and the product scales cleanly.',
    cta: 'Redesign my product',
    dark: true,
  },
  {
    kicker: 'YOU NEED AN MVP.',
    h: 'INVESTOR-CREDIBLE PRODUCT IN 7 DAYS.',
    p: 'Prove the core value, ship the first version, and look legit from day one. Landing page, prototype, and pitch readiness in one sprint.',
    cta: 'Launch my MVP',
    dark: false,
  },
]

export default function ProblemSolution() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-24 md:py-32">
        <div className="max-w-6xl mb-14">
          <div className="eyebrow text-ink-3 mb-3">[PROBLEM → SOLUTION]</div>
          <h2 className="display-lg text-ink">
            BUILDING IS HARD.<br />
            <span className="text-ink-3">THE RIGHT PARTNER MAKES IT SIMPLER.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          {rows.map((r, i) => (
            <motion.div
              key={r.h}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group grid lg:grid-cols-[auto_1fr_auto] gap-8 items-center border-2 border-ink rounded-chip p-8 md:p-10 bg-cream-2 hover:bg-ink-bg transition-colors duration-300 cursor-pointer"
            >
              <div className="display-md text-primary leading-none">
                0{i + 1}
              </div>
              <div className="flex-1">
                <div className="font-display font-bold text-[11px] uppercase tracking-[0.14em] mb-2 text-primary">
                  {r.kicker}
                </div>
                <h3 className="display-md mb-3 text-ink group-hover:text-cream transition-colors duration-300">{r.h}</h3>
                <p className="body-md max-w-xl text-ink-2 group-hover:text-on-ink-2 transition-colors duration-300">{r.p}</p>
              </div>
              <a
                href="#contact"
                className="btn-cream group-hover:btn-primary transition-all duration-300"
              >
                {r.cta}
                <span className="inline-block w-4 h-4 leading-none">↗</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
