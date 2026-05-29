import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * v2 Section 06 — Numbers.
 * BORING-style: numbers are the section. Massive condensed display digits,
 * thick borders, a featured tile in ink-bg with blue accent. Count-up on scroll.
 */
const stats = [
  { val: 7,  suf: 'D',  lab: 'AVG MVP TIMELINE',     desc: 'From signed brief to live, investor-ready MVP.',           src: 'Avg across 12 Seed launches' },
  { val: 55, suf: '%',  lab: 'FASTER ONBOARDING',    desc: 'Median lift on activation flow after one Elux sprint.',    src: 'Median across 8 Growth redesigns' },
  { val: 89, suf: '%',  lab: 'FEWER REGRESSIONS',    desc: 'Design + dev under one roof — bugs do not ping-pong.',     src: 'Internal QA, 2025 cohort' },
  { val: 40, suf: '+',  lab: 'FOUNDERS SHIPPED',      desc: 'From pre-seed to Series A — every one launched live.',     src: 'Since 2021, across 9 industries' },
]

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
      className={`p-8 md:p-10 rounded-chip border-2 border-ink flex flex-col justify-between min-h-[280px] h-full ${
        featured ? 'bg-ink-bg text-cream' : 'bg-cream text-ink'
      }`}
    >
      <div>
        <div className="display flex items-baseline" style={{ fontSize: isLarge ? 'clamp(96px,16vw,200px)' : 'clamp(72px,10vw,128px)' }}>
          <span className="tabular-nums">{val}</span>
          <span className="text-primary">{stat.suf}</span>
        </div>
        <div className={`font-display font-bold text-[11px] uppercase tracking-[0.14em] mt-3 ${featured ? 'text-on-ink-3' : 'text-ink-3'}`}>
          {stat.lab}
        </div>
      </div>
      <div>
        <p className={`font-body text-[13px] leading-snug ${featured ? 'text-on-ink-2' : 'text-ink-2'}`}>
          {stat.desc}
        </p>
        <div className={`font-display font-bold text-[10px] uppercase tracking-[0.12em] mt-2 ${featured ? 'text-on-ink-3' : 'text-ink-3'}`}>
          ↳ {stat.src}
        </div>
      </div>
    </div>
  )
}

export default function Numbers() {
  return (
    <section className="bg-cream-2 border-y-2 border-ink">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-end mb-12"
        >
          <div>
            <div className="eyebrow text-ink-3 mb-3">[BY THE NUMBERS]</div>
            <h2 className="display-lg text-ink">
              OUTCOMES.<br />
              NOT PROMISES.
            </h2>
          </div>
          <p className="body-md text-ink-2">
            Three numbers we will defend in a meeting. With receipts. Across <strong>40+ launches</strong>, here is what partners actually see.
          </p>
        </motion.div>

        {/* Row 1: big featured (55%) + small (7D) */}
        <div className="grid md:grid-cols-3 gap-5 mb-5">
          <div className="md:col-span-2">
            <Tile stat={stats[1]} featured />
          </div>
          <Tile stat={stats[0]} />
        </div>

        {/* Row 2: small (89%) + new full cream card */}
        <div className="grid md:grid-cols-3 gap-5">
          <Tile stat={stats[2]} />
          <div className="md:col-span-2">
            <Tile stat={stats[3]} featuredCream />
          </div>
        </div>

        <div className="mt-10 pt-6 border-t-2 border-ink/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="font-body text-[13px] text-ink-2 max-w-2xl">
            Numbers are from real engagements. Baseline is the client's pre-engagement metric — not an industry average. Methodology available on request.
          </div>
          <a href="#contact" className="font-display font-bold text-[12px] uppercase tracking-[0.12em] text-primary hover:underline">
            Ask for the methodology ↗
          </a>
        </div>
      </div>
    </section>
  )
}
