import { motion } from 'framer-motion'

/**
 * v2 Section 11 — Who We're NOT For.
 * BORING-style anti-positioning. Dark ink section. Two-column "We don't / We do"
 * rhythm with oversized headlines, strikethroughs on the rejects, primary-blue
 * underlines on the affirmations.
 */
const REJECT = [
  { t: 'Just a quick logo and a banner.',  aside: 'Quick is a budget word.' },
  { t: 'Make it look like Apple.',          aside: 'Apple has 160K employees. You have a runway.' },
  { t: 'A 6-month spec doc, then build.',   aside: "You'd be out of cash before kickoff." },
  { t: 'Pixel-perfect or it is wrong.',     aside: 'Pixels are not the product. Outcomes are.' },
  { t: '"Use AI" as the entire brief.',     aside: 'AI is a tool. Founders are the strategy.' },
]
const ACCEPT = [
  'Founders who can decide in a meeting.',
  'Products that need to ship this quarter.',
  'Briefs that start with the user, not the tech.',
  'Teams who measure success in adoption, not awards.',
]

export default function WhoWereNotFor() {
  return (
    <section id="contact" className="bg-ink-bg text-cream">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mb-16"
        >
          <div className="eyebrow text-on-ink-3 mb-4">[⚠ HONEST FILTER]</div>
          <h2 className="display-xl leading-[0.95]">
            WE'RE{' '}
            <span
              className="inline"
              style={{
                textDecorationLine: 'line-through',
                textDecorationColor: '#DC2626',
                textDecorationThickness: '0.09em',
                textDecorationSkipInk: 'none',
              }}
            >
              GOOD FOR EVERYONE.
            </span>
            <br />
            BUILT FOR A FEW.
          </h2>
          <p className="body-lg text-on-ink-2 mt-7 max-w-2xl">
            Saying who we're <em>not</em> for is faster than 30 discovery calls. If the left column sounds like you, save us both a meeting.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] gap-10 lg:gap-0 mb-20">
          <div className="lg:pr-12 min-w-0">
            <div className="flex items-baseline gap-3 mb-8">
              <span className="display-md text-danger leading-none">×</span>
              <h3 className="display-md leading-none">WE DON'T TAKE ON:</h3>
            </div>
            <ul className="flex flex-col">
              {REJECT.map((r, i) => (
                <motion.li
                  key={r.t}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="py-5 border-b border-line-ink"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-display font-bold text-xs text-on-ink-3 pt-2 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <div className="flex-1">
                      <div className="font-display font-bold text-xl md:text-2xl uppercase tracking-[-0.01em] text-on-ink-2 leading-tight">
                        <span className="line-through decoration-danger decoration-[1.5px]">{r.t}</span>
                      </div>
                      <div className="font-body italic text-[13px] text-on-ink-3 mt-2">— {r.aside}</div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:block relative" aria-hidden="true">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px bg-line-ink h-[40%]" />
            <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-on-ink-3" />
            <div className="absolute left-1/2 top-[55%] -translate-x-1/2 w-px bg-line-ink h-[45%]" />
          </div>

          <div className="lg:pl-12 min-w-0">
            <div className="flex items-baseline gap-3 mb-8">
              <span className="display-md text-primary leading-none">✓</span>
              <h3 className="display-md leading-none">WE'RE BUILT FOR:</h3>
            </div>
            <ul className="flex flex-col min-w-0">
              {ACCEPT.map((a, i) => (
                <motion.li
                  key={a}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 + 0.15 }}
                  className="py-5 border-b border-line-ink"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-display font-bold text-xs text-primary pt-2 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <div className="flex-1">
                      <div className="relative inline-block font-display font-bold text-xl md:text-2xl uppercase tracking-[-0.01em] leading-tight">
                        <span>{a}</span>
                        <motion.span
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true, margin: '-60px' }}
                          transition={{ duration: 0.7, delay: i * 0.08 + 0.35 }}
                          className="absolute left-0 right-0 -bottom-1 h-[2px] bg-primary origin-left"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-10 border-t border-line-ink flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div className="max-w-2xl">
            <div className="eyebrow text-on-ink-3 mb-3">[STILL READING?]</div>
            <h3 className="display-lg leading-[0.95]">
              GOOD. <span className="text-on-ink-2">THAT MEANS WE SHOULD TALK.</span>
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href="mailto:project@elux.space" className="btn-primary">
              Start a project
              <span className="inline-block w-4 h-4 leading-none">↗</span>
            </a>
            <a href="#work" className="btn-ghost-ink">Or, see the work first</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
