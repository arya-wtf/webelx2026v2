import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { copy } from '../content/siteCopy'

gsap.registerPlugin(ScrollTrigger)

function useCountUp(target) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!ref.current) return
    const obj = { n: 0 }
    const tween = gsap.to(obj, {
      n: target,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => setVal(Math.round(obj.n)),
      paused: true,
      scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' },
    })

    return () => {
      tween.kill()
      ScrollTrigger.getAll().filter((t) => t.trigger === ref.current).forEach((t) => t.kill())
    }
  }, [target])

  return [ref, val]
}

function Tile({ stat, featured, featuredCream }) {
  const [ref, val] = useCountUp(stat.val)
  const isLarge = featured || featuredCream

  return (
    <div
      ref={ref}
      className={`p-8 md:p-10 rounded-chip border-2 border-ink flex flex-col justify-center h-full ${
        featured ? 'bg-ink-bg text-cream' : 'bg-cream text-ink'
      }`}
    >
      <div>
        <div className="display flex items-baseline" style={{ fontSize: isLarge ? 'clamp(72px,12vw,140px)' : 'clamp(56px,8vw,100px)' }}>
          <span className="tabular-nums">{val}</span>
          <span className="text-primary">{stat.suf}</span>
        </div>
        <div className={`font-display font-bold text-[11px] uppercase tracking-[0.14em] mt-3 ${featured ? 'text-on-ink-3' : 'text-ink-3'}`}>
          {stat.lab}
        </div>
      </div>
    </div>
  )
}

export default function Numbers() {
  const numbersCopy = copy.numbers
  const stats = numbersCopy.stats

  return (
    <section className="bg-cream-2">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="eyebrow text-ink-3">[OUTCOMES BY NUMBERS]</div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mb-5">
          <div className="md:col-span-2">
            <Tile stat={stats[1] ?? stats[0]} featured />
          </div>
          <Tile stat={stats[0]} />
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <Tile stat={stats[2] ?? stats[0]} />
          <div className="md:col-span-2">
            <Tile stat={stats[3] ?? stats[0]} featuredCream />
          </div>
        </div>
      </div>
    </section>
  )
}
