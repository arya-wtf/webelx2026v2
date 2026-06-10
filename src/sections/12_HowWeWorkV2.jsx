import { motion } from 'framer-motion'
import { Player } from '@remotion/player'
import { RocketAnimation } from '../components/RocketAnimation'
import { FolderAnimation } from '../components/FolderAnimation'
import { SliderAnimation } from '../components/SliderAnimation'
import { copy } from '../content/siteCopy'

const animations = [FolderAnimation, SliderAnimation, RocketAnimation]
const durations = [180, 180, 150]

export default function HowWeWorkV2() {
  const processCopy = copy.process
  const steps = processCopy.steps.map((step, i) => ({
    ...step,
    animation: animations[i],
    durationInFrames: durations[i],
  }))

  return (
    <section style={{ backgroundColor: '#000000' }}>
      <div className="mx-auto max-w-page px-6 lg:px-10 py-24 md:py-32">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-end mb-14">
          <div>
            <div className="eyebrow text-on-ink-3 mb-3">{processCopy.eyebrow}</div>
            <h2 className="display-lg text-on-ink whitespace-pre-line">{processCopy.headline}</h2>
          </div>
          <p className="body-md text-on-ink-2">{processCopy.supportingCopy}</p>
        </div>

        <ol className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((s, i) => (
            <motion.li
              key={s.t}
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
                    style={{ width: '100%', height: '100%', position: 'absolute' }}
                  />
                )}
              </div>

              <div className="w-full p-4 lg:p-5 -mt-8 lg:-mt-10 relative z-10 flex-grow flex flex-col" style={{ backgroundColor: '#000000' }}>
                <div className="font-display font-bold text-[10px] uppercase tracking-[0.14em] text-on-ink-3 mb-1.5">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="display text-lg lg:text-xl xl:text-[22px] text-on-ink mb-2 leading-tight">{s.t}</h3>
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
          <div className="font-body text-sm text-on-ink-2 max-w-2xl pt-1">{processCopy.loopCopy}</div>
        </motion.div>
      </div>
    </section>
  )
}
