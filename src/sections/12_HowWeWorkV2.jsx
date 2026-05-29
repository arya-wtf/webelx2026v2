import { motion } from 'framer-motion'
import { Player } from "@remotion/player"
import { RocketAnimation } from "../components/RocketAnimation"
import { FolderAnimation } from "../components/FolderAnimation"
import { SliderAnimation } from "../components/SliderAnimation"

/**
 * v2 Section 12 — How We Work V2 (Duplicate).
 * BORING-style vertical timeline. Big tabular time markers, ink-bordered
 * cards, deliverables strip, "and loop" return at the bottom.
 */
const STEPS = [
  {
    n: '01',
    time: '48H',
    timeLabel: 'to scope',
    t: 'BRIEF & ALIGN',
    desc: 'One async intake, one strategy call. We come back with scope, timeline, and the smallest first ship in 48 hours.',
    deliverables: ['Scoped brief', 'Timeline', 'First-ship plan'],
    animation: FolderAnimation,
    durationInFrames: 180,
  },
  {
    n: '02',
    time: 'DAY 1–6',
    timeLabel: 'design + build',
    t: 'DESIGN & BUILD IN PARALLEL',
    desc: 'UX, UI, and front-end happen in the same sprint. Less handoff. Faster feedback. Real builds, not pretty mockups.',
    deliverables: ['UX flows', 'UI screens', 'Production build'],
    animation: SliderAnimation,
    durationInFrames: 180,
  },
  {
    n: '03',
    time: 'DAY 7',
    timeLabel: 'live → ∞',
    t: 'SHIP & ITERATE',
    desc: 'Live on day 7. Then weekly improvements based on real users, not on Slack opinions.',
    deliverables: ['Public launch', 'Weekly improvements', 'Usage telemetry'],
    animation: RocketAnimation,
    durationInFrames: 150,
  },
]

export default function HowWeWorkV2() {
  return (
    <section style={{ backgroundColor: '#000000' }}>
      <div className="mx-auto max-w-page px-6 lg:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-end mb-14">
          <div>
            <div className="eyebrow text-on-ink-3 mb-3">[OUR PROCESS]</div>
            <h2 className="display-lg text-on-ink">
              A LOOP.<br />
              NOT A WATERFALL.
            </h2>
          </div>
          <p className="body-md text-on-ink-2">
            We don't hand off, then disappear. Same team designs it, ships it, and keeps shipping every week after launch.
          </p>
        </div>

        <ol className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="relative flex flex-col"
            >
              <div className="w-[90%] lg:w-[85%] mx-auto aspect-[4/3] sm:aspect-square bg-ink-bg relative overflow-hidden flex items-center justify-center">
                {s.animation && (
                  <Player
                    component={s.animation}
                    durationInFrames={s.durationInFrames}
                    fps={30}
                    compositionWidth={800}
                    compositionHeight={800}
                    autoPlay
                    loop
                    clickToPlay={false}
                    controls={false}
                    initiallyMuted={true}
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                    }}
                  />
                )}
              </div>
              
              <div className="w-full p-4 lg:p-5 -mt-8 lg:-mt-10 relative z-10 flex-grow flex flex-col" style={{ backgroundColor: '#000000' }}>
                <div className="font-display font-bold text-[10px] uppercase tracking-[0.14em] text-on-ink-3 mb-1.5">
                  STEP {s.n}
                </div>
                <h3 className="display text-lg lg:text-xl xl:text-[22px] text-on-ink mb-2 leading-none whitespace-nowrap overflow-hidden text-ellipsis">{s.t}</h3>
                <p className="text-[13px] lg:text-sm leading-relaxed text-on-ink-2 mb-4 flex-grow">{s.desc}</p>
                <div className="flex flex-col gap-2 pt-3 mt-auto" style={{ borderTop: '1px solid rgba(80,110,255,0.15)' }}>
                  <div className="font-display font-bold text-[10px] uppercase tracking-[0.14em] text-on-ink-3">
                    You walk away with
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {s.deliverables.map((d) => (
                      <span key={d} className="px-2 py-1 font-display font-bold text-[9px] uppercase tracking-[0.06em] text-on-ink-2" style={{ backgroundColor: 'rgba(80,110,255,0.08)', border: '1px solid rgba(80,110,255,0.2)' }}>
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>

        {/* AND LOOP return */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 pt-8 mt-16 border-t border-on-ink/10"
        >
          <div className="flex items-start gap-4">
            <div className="w-3.5 h-3.5 rounded-full bg-on-ink/30 mt-3" />
            <div>
              <div className="display-md text-primary leading-none">↑</div>
              <div className="font-display font-bold text-[11px] uppercase tracking-[0.14em] text-primary mt-2">
                and loop
              </div>
            </div>
          </div>
          <div className="font-body text-sm text-on-ink-2 max-w-2xl pt-1">
            After ship, we're not done. We're on weekly cycles. Each loop trims friction, adds value, and gets you closer to product-market fit.
          </div>
        </motion.div>
      </div>
    </section>
  )
}