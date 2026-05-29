import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ParticleSphere from '../components/ParticleSphere'

/**
 * v2 Hero — composed for a single viewport + cinematic GSAP entrance.
 *
 * Pattern (grounded in awwwards GSAP refs + Webflow nf-daily-12):
 * the hero PERFORMS ITSELF on page load via a single GSAP timeline.
 *
 *   0.0s  → chip slides up + fades in
 *   0.4s  → headline words stagger in (clip-path mask wipe)
 *   1.0s  → highlight box scales-X from 0 → 1 (draws in)
 *   1.2s  → rotating verb resolves inside the box
 *   1.3s  → lede fades up
 *   1.6s  → CTAs pop, staggered
 *   1.9s  → proof strip fades in
 *
 * After the entrance, the verb keeps rotating (SHIP → LAUNCH →
 * CONVERT → SCALE), cycling through a typewriter effect.
 */

const VERBS = ['SHIP.', 'LAUNCH.', 'CONVERT.', 'SCALE.']

// Timing constants
const TYPE_SPEED = 90           // ms per character while typing
const ERASE_SPEED = 50          // ms per character while erasing
const PAUSE_AFTER_TYPE = 1600   // pause before starting to erase
const PAUSE_BEFORE_TYPE = 300   // pause before typing next word

function RotatingVerb() {
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState('typing') // 'typing' | 'pausing' | 'erasing'

  useEffect(() => {
    let cancelled = false
    const sleep = (ms) => new Promise((res) => setTimeout(res, ms))

    const run = async () => {
      let idx = 0
      await sleep(500) // initial delay

      while (!cancelled) {
        const word = VERBS[idx]

        // TYPE characters one by one
        setPhase('typing')
        for (let i = 1; i <= word.length; i++) {
          if (cancelled) return
          setDisplayed(word.slice(0, i))
          await sleep(TYPE_SPEED + (Math.random() * 40 - 20))
        }

        // PAUSE with blinking cursor
        setPhase('pausing')
        await sleep(PAUSE_AFTER_TYPE)

        // ERASE characters one by one
        setPhase('erasing')
        for (let i = word.length - 1; i >= 0; i--) {
          if (cancelled) return
          setDisplayed(word.slice(0, i))
          await sleep(ERASE_SPEED)
        }

        // Brief gap before next word
        await sleep(PAUSE_BEFORE_TYPE)
        idx = (idx + 1) % VERBS.length
      }
    }

    run()
    return () => { cancelled = true }
  }, [])

  return (
    <span className="inline-block bg-primary text-cream px-3 -mx-1 align-baseline whitespace-nowrap">
      {displayed}
      <span
        className={`inline-block w-[2px] h-[0.85em] bg-cream align-middle ml-[2px] translate-y-[-0.05em] ${
          phase === 'pausing' ? 'animate-blink' : 'opacity-100'
        }`}
      />
    </span>
  )
}

// helper: split a string of words into <span> wrappers we can target
function HeroWord({ children, lineIdx, wordIdx }) {
  return (
    <span
      data-hero-word
      data-line={lineIdx}
      data-word={wordIdx}
      className="inline-block overflow-hidden align-bottom"
    >
      <span className="inline-block" style={{ willChange: 'transform' }}>
        {children}
      </span>
    </span>
  )
}

export default function Hero() {
  const rootRef = useRef(null)

  useEffect(() => {
    if (!rootRef.current) return
    const root = rootRef.current

    // grab all the animated parts
    const chip = root.querySelector('[data-hero-chip]')
    const words = root.querySelectorAll('[data-hero-word] > span')
    const highlight = root.querySelector('[data-hero-highlight]')
    const lede = root.querySelector('[data-hero-lede]')
    const ctas = root.querySelectorAll('[data-hero-cta]')
    const proof = root.querySelector('[data-hero-proof]')
    const sphere = root.querySelector('[data-hero-sphere]')

    // set initial states (so SSR/hydration doesn't flash final state)
    gsap.set(chip, { yPercent: 60, opacity: 0 })
    gsap.set(words, { yPercent: 110 })
    gsap.set(highlight, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(lede, { yPercent: 30, opacity: 0 })
    gsap.set(ctas, { y: 18, opacity: 0 })
    gsap.set(proof, { y: 12, opacity: 0 })
    if (sphere) gsap.set(sphere, { scale: 0.9, opacity: 0 })

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.to(chip, { yPercent: 0, opacity: 1, duration: 0.5 }, 0.0)
      .to(words, { yPercent: 0, duration: 0.75, stagger: 0.07, ease: 'expo.out' }, 0.4)
      .to(highlight, { scaleX: 1, duration: 0.55, ease: 'power3.inOut' }, 1.0)
      .to(lede, { yPercent: 0, opacity: 1, duration: 0.55 }, 1.55)
      .to(sphere, { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }, 1.6)
      .to(ctas, { y: 0, opacity: 1, duration: 0.45, stagger: 0.08 }, 1.8)
      .to(proof, { y: 0, opacity: 1, duration: 0.5 }, 2.1)

    return () => { tl.kill() }
  }, [])

  return (
    <section ref={rootRef} className="relative isolate overflow-hidden bg-cream">
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
        <div className="overflow-hidden">
          <span data-hero-chip className="btn-cream inline-flex">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            The Digital Studio
          </span>
        </div>

        {/* ROW 2 — headline + sphere */}
        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-8 lg:gap-12 self-center items-center">
          <h1
            className="display text-ink"
            style={{
              fontSize: 'clamp(48px, 9.5vw, 128px)',
              lineHeight: 0.92,
              letterSpacing: '-0.025em',
              textTransform: 'uppercase',
            }}
          >
            <span className="block">
              <HeroWord lineIdx={0} wordIdx={0}>AI-NATIVE</HeroWord>
            </span>
            <span className="block">
              <HeroWord lineIdx={1} wordIdx={0}>PRODUCTS</HeroWord>{' '}
              <HeroWord lineIdx={1} wordIdx={1}>THAT</HeroWord>
            </span>
            <span className="block">
              <HeroWord lineIdx={2} wordIdx={0}>ACTUALLY</HeroWord>{' '}
              <span
                data-hero-highlight
                className="inline-block"
                style={{ willChange: 'transform' }}
              >
                <RotatingVerb />
              </span>
            </span>
          </h1>

          {/* Particle Sphere Animation */}
          <div className="hidden lg:block w-full max-w-[420px] aspect-square mx-auto" style={{ willChange: 'transform, opacity' }} data-hero-sphere>
            <ParticleSphere />
          </div>
        </div>

        {/* ROW 3 — lede + CTAs */}
        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-6 lg:gap-8 items-end">
          <p data-hero-lede className="body-lg max-w-xl text-ink-2" style={{ willChange: 'transform, opacity' }}>
            We design and build AI-native products for founders who need to launch fast
            and look credible from day one.
            <span className="block mt-2 text-ink-3 italic">
              UX, UI, and front-end — under one roof. No handoff. No drama.
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <a data-hero-cta href="#contact" className="btn-primary" style={{ willChange: 'transform, opacity' }}>
              Start a project
              <span className="inline-block w-4 h-4 leading-none">↗</span>
            </a>
            <a data-hero-cta href="#work" className="btn-cream" style={{ willChange: 'transform, opacity' }}>
              See recent work
            </a>
          </div>
        </div>

        {/* ROW 4 — proof strip */}
        <div
          data-hero-proof
          className="pt-5 border-t border-line flex flex-wrap items-center justify-between gap-x-6 gap-y-2"
          style={{ willChange: 'transform, opacity' }}
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
        </div>
      </div>
    </section>
  )
}
