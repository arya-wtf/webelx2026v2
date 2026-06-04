import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ParticleSphere from '../components/ParticleSphere'
import { copy } from '../content/siteCopy'

/**
 * v2 Hero — composed for a single viewport + cinematic GSAP entrance.
 *
 * Sections:
 *   01 — HERO (this component)
 *   02 — CREDIBILITY BAR (TrustStrip)
 *   03 — PROOF BY NUMBER (Numbers)
 *
 * The proof strip has been moved out of the Hero into TrustStrip.
 */

const DEFAULT_VERBS = ['SHIP.', 'LAUNCH.', 'CONVERT.', 'SCALE.']

// Timing constants
const TYPE_SPEED = 90           // ms per character while typing
const ERASE_SPEED = 50          // ms per character while erasing
const PAUSE_AFTER_TYPE = 1600   // pause before starting to erase
const PAUSE_BEFORE_TYPE = 300   // pause before typing next word

function RotatingVerb({ words = DEFAULT_VERBS }) {
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState('typing') // 'typing' | 'pausing' | 'erasing'

  useEffect(() => {
    let cancelled = false
    const sleep = (ms) => new Promise((res) => setTimeout(res, ms))

    const run = async () => {
      let idx = 0
      await sleep(500) // initial delay

      while (!cancelled) {
        const word = words[idx]

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
        idx = (idx + 1) % words.length
      }
    }

    run()
    return () => { cancelled = true }
  }, [words])

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
  const heroCopy = copy.hero
  const headlineWords = heroCopy.headline
    .replace(/[.!?]+$/g, '')
    .split(/\s+/)
    .filter(Boolean)
  const firstLine = headlineWords.slice(0, 2)
  const secondLine = headlineWords.slice(2, -1)

  // Strip the arrow from CTA text if present in markdown
  const primaryCtaText = heroCopy.primaryCta.replace(/\s*→$/, '').trim()
  const secondaryCtaText = heroCopy.secondaryCta.trim()

  useEffect(() => {
    if (!rootRef.current) return
    const root = rootRef.current

    // grab all the animated parts
    const chip = root.querySelector('[data-hero-chip]')
    const words = root.querySelectorAll('[data-hero-word] > span')
    const highlight = root.querySelector('[data-hero-highlight]')
    const lede = root.querySelector('[data-hero-lede]')
    const ctas = root.querySelectorAll('[data-hero-cta]')
    const sphere = root.querySelector('[data-hero-sphere]')

    // set initial states
    gsap.set(chip, { yPercent: 60, opacity: 0 })
    gsap.set(words, { yPercent: 110 })
    gsap.set(highlight, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(lede, { yPercent: 30, opacity: 0 })
    gsap.set(ctas, { y: 18, opacity: 0 })
    if (sphere) gsap.set(sphere, { scale: 0.9, opacity: 0 })

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.to(chip, { yPercent: 0, opacity: 1, duration: 0.5 }, 0.0)
      .to(words, { yPercent: 0, duration: 0.75, stagger: 0.07, ease: 'expo.out' }, 0.4)
      .to(highlight, { scaleX: 1, duration: 0.55, ease: 'power3.inOut' }, 1.0)
      .to(lede, { yPercent: 0, opacity: 1, duration: 0.55 }, 1.55)
      .to(sphere, { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }, 1.6)
      .to(ctas, { y: 0, opacity: 1, duration: 0.45, stagger: 0.08 }, 1.8)

    return () => { tl.kill() }
  }, [])

  return (
    <section ref={rootRef} className="relative isolate overflow-hidden bg-cream">
      <div
        className="mx-auto max-w-page px-6 lg:px-10 grid"
        style={{
          minHeight: 'calc(100vh - 64px - 32px)',
          gridTemplateRows: 'auto 1fr auto',
          rowGap: 'clamp(20px, 3vh, 36px)',
          paddingTop: 'clamp(20px, 4vh, 44px)',
          paddingBottom: 'clamp(32px, 5vh, 56px)',
        }}
      >
        {/* ROW 1 — eyebrow chip */}
        <div className="overflow-hidden">
          <span data-hero-chip className="btn-cream inline-flex">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            {heroCopy.eyebrow}
          </span>
        </div>

        {/* ROW 2 — headline + sphere */}
        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-8 lg:gap-12 self-center items-center">
          <h1
            className="display text-ink"
            style={{
              fontSize: 'clamp(42px, 8.5vw, 125px)',
              lineHeight: 0.92,
              letterSpacing: '-0.025em',
              textTransform: 'uppercase',
            }}
          >
            <span className="block">
              <HeroWord lineIdx={0} wordIdx={0}>{firstLine.join(' ').toUpperCase()}</HeroWord>
            </span>
            <span className="block">
              <HeroWord lineIdx={1} wordIdx={0}>{secondLine.join(' ').toUpperCase()}</HeroWord>
            </span>
            <span className="block">
              <span
                data-hero-highlight
                className="inline-block"
                style={{ willChange: 'transform' }}
              >
                <RotatingVerb words={heroCopy.rotatingWords} />
              </span>
            </span>
          </h1>

          {/* Particle Sphere Animation */}
          <div className="hidden lg:block w-full max-w-[560px] aspect-square mx-auto" style={{ willChange: 'transform, opacity' }} data-hero-sphere>
            <ParticleSphere />
          </div>
        </div>

        {/* ROW 3 — lede + CTAs */}
        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-6 lg:gap-8 items-end">
          <p data-hero-lede className="body-lg max-w-xl text-ink-2" style={{ willChange: 'transform, opacity' }}>
            {heroCopy.subheadline}
          </p>

          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <a data-hero-cta href="#contact" className="btn-primary" style={{ willChange: 'transform, opacity' }}>
              {primaryCtaText}
              <span className="inline-block w-4 h-4 leading-none">↗</span>
            </a>
            <a data-hero-cta href="#work" className="btn-cream" style={{ willChange: 'transform, opacity' }}>
              {secondaryCtaText}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
