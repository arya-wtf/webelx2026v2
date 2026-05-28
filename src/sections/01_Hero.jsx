import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

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
 * After the entrance, only the verb keeps rotating (SHIP → LAUNCH →
 * CONVERT → SCALE every 2.6s, container width tweens via Framer layout).
 */

const VERBS = ['SHIP.', 'LAUNCH.', 'CONVERT.', 'SCALE.']

function RotatingVerb() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % VERBS.length), 2600)
    return () => clearInterval(t)
  }, [])
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

// live status ledger block — small text only, no decoration
function LedgerBlock({ label, dotPulse = false, line1, line2, line2Href }) {
  return (
    <div data-hero-ledger style={{ willChange: 'transform, opacity' }}>
      <div className="flex items-center gap-2 mb-1.5">
        {dotPulse ? (
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-primary opacity-50 animate-ping" />
            <span className="relative w-2 h-2 rounded-full bg-primary" />
          </span>
        ) : (
          <span className="text-ink-3 text-[11px] leading-none">◇</span>
        )}
        <span className="font-display font-bold text-[10px] uppercase tracking-[0.18em] text-ink-3">
          {label}
        </span>
      </div>
      <div className="font-display font-semibold text-[14px] tracking-[-0.005em] text-ink leading-tight">
        {line1}
      </div>
      {line2 && (
        line2Href ? (
          <a
            href={line2Href}
            className="font-body text-[12px] text-ink-3 hover:text-primary transition-colors mt-0.5 inline-block"
          >
            {line2}
          </a>
        ) : (
          <div className="font-body text-[12px] text-ink-3 mt-0.5">{line2}</div>
        )
      )}
    </div>
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
    const ledger = root.querySelectorAll('[data-hero-ledger]')
    const lede = root.querySelector('[data-hero-lede]')
    const ctas = root.querySelectorAll('[data-hero-cta]')
    const proof = root.querySelector('[data-hero-proof]')

    // set initial states (so SSR/hydration doesn't flash final state)
    gsap.set(chip, { yPercent: 60, opacity: 0 })
    gsap.set(words, { yPercent: 110 })
    gsap.set(highlight, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(ledger, { y: 16, opacity: 0 })
    gsap.set(lede, { yPercent: 30, opacity: 0 })
    gsap.set(ctas, { y: 18, opacity: 0 })
    gsap.set(proof, { y: 12, opacity: 0 })

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.to(chip, { yPercent: 0, opacity: 1, duration: 0.5 }, 0.0)
      .to(words, { yPercent: 0, duration: 0.75, stagger: 0.07, ease: 'expo.out' }, 0.4)
      .to(highlight, { scaleX: 1, duration: 0.55, ease: 'power3.inOut' }, 1.0)
      .to(ledger, { y: 0, opacity: 1, duration: 0.55, stagger: 0.12 }, 1.2)
      .to(lede, { yPercent: 0, opacity: 1, duration: 0.55 }, 1.55)
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

        {/* ROW 2 — headline (left) + live status ledger (right) */}
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 self-center items-center">
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

          {/* live status ledger — honest, real, no faking */}
          <aside
            className="hidden lg:flex flex-col gap-5 border-l-2 border-ink/15 pl-6 min-w-[220px] max-w-[260px]"
            aria-label="Studio activity"
          >
            <LedgerBlock
              label="NOW SHIPPING"
              dotPulse
              line1="Sand & Witch — MVP"
              line2="Day 5 of 7"
            />
            <LedgerBlock
              label="NEXT UP"
              line1="Q3 · 2 slots open"
              line2="Book a call →"
              line2Href="#contact"
            />
            <LedgerBlock
              label="LAST WEEK"
              line1="Pasta Palette went live"
              line2="View case →"
              line2Href="#work"
            />
          </aside>
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
