import { motion } from 'framer-motion'
import logo1 from '../assets/logo-images/logo-1.png'
import logo2 from '../assets/logo-images/logo-2.png'
import logo3 from '../assets/logo-images/logo-3.png'
import logo4 from '../assets/logo-images/logo-4.png'
import logo5 from '../assets/logo-images/logo-5.png'
import logo6 from '../assets/logo-images/logo-6.png'
import logo7 from '../assets/logo-images/logo-7.png'
import logo8 from '../assets/logo-images/logo-8.png'

const clientLogos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8]
const clientNames = ['Alia', 'Upnova', 'Lamah Technologies', 'AI2', 'Makewaves', 'Travelcircus', 'Samsa AI', 'Saifa']

const ratings = [
  {
    stars: true,
    score: '5.0',
    platform: 'CLUTCH',
    href: 'https://clutch.co/profile/elux-space',
  },
  {
    stars: true,
    score: '5.0',
    platform: 'CONTRA',
    href: 'https://contra.com/eluxspace/work',
  },
  {
    stars: false,
    score: 'DRIBBBLE',
    platform: '2.9K FOLLOWERS',
    href: 'https://dribbble.com/eluxspace',
  },
  {
    stars: false,
    score: 'DESIGNRUSH',
    platform: 'VERIFIED AGENCY',
    href: 'https://www.designrush.com/agency/profile/elux-space',
  },
]

const inlineStats = [
  { value: '95+', label: 'products shipped' },
  { value: '34+', label: 'countries' },
]

export default function TrustStrip() {
  return (
    <section className="bg-cream-2 border-y-2 border-ink">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-10 lg:py-12">

        {/* ── Eyebrow ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4 }}
          className="eyebrow text-ink-3 mb-6"
        >
          [PROVEN ACROSS PRODUCTS, TEAMS, AND MARKETS]
        </motion.div>

        {/* ── Rating Badges ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: 0.07 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {ratings.map((r) => (
            <a
              key={r.platform}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-chip border-2 border-ink bg-cream hover:bg-ink hover:text-cream transition-all duration-200"
            >
              {r.stars && (
                <span className="text-primary group-hover:text-cream transition-colors tracking-[-1px] text-[12px] leading-none">
                  ★★★★★
                </span>
              )}
              <span className="font-display font-bold text-[12px] uppercase tracking-[0.1em] leading-none">
                {r.score}
              </span>
              {!r.stars && (
                <span className="w-px h-3 bg-ink/20 group-hover:bg-cream/30" />
              )}
              <span className="font-display font-bold text-[12px] uppercase tracking-[0.1em] leading-none text-ink-3 group-hover:text-cream/70 transition-colors">
                {r.platform}
              </span>
              <span className="text-[11px] text-ink-3 group-hover:text-cream/60 transition-colors">↗</span>
            </a>
          ))}
        </motion.div>

        {/* ── Divider + Logos ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: 0.13 }}
          className="border-t-2 border-ink/15 pt-7"
        >
          {/* Logos — flex wrap */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-x-6 gap-y-4 items-center">
            {clientLogos.map((logo, i) => (
              <img
                key={i}
                src={logo}
                alt={clientNames[i] || `Client ${i + 1}`}
                title={clientNames[i]}
                className="h-5 md:h-6 w-auto object-contain mx-auto"
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
