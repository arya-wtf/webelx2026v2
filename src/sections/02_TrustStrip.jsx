import { motion } from 'framer-motion'
import logo1 from '../assets/logo-images/logo-1.png'
import logo2 from '../assets/logo-images/logo-2.png'
import logo3 from '../assets/logo-images/logo-3.png'
import logo4 from '../assets/logo-images/logo-4.png'
import logo5 from '../assets/logo-images/logo-5.png'
import logo6 from '../assets/logo-images/logo-6.png'

const clientLogos = [logo1, logo2, logo3, logo4, logo5, logo6]

/**
 * v2 Section 02 — Trust Strip.
 * BORING-style: tight chip row in caps, ink-bordered chips on cream,
 * Elux-blue accent dots. Real platform proof (Clutch / Contra / Dribbble /
 * DesignRush) with outbound links.
 */
const badges = [
  { name: 'Clutch',     rating: '5.0',  proof: '10 verified reviews',                  href: 'https://clutch.co/profile/elux-space' },
  { name: 'Contra',     rating: '5.00', proof: '11× hired · LottieFiles × Figma',      href: 'https://contra.com/eluxspace/work' },
  { name: 'Dribbble',   rating: null,   proof: 'Featured · 2.9K followers',            href: 'https://dribbble.com/eluxspace' },
  { name: 'DesignRush', rating: null,   proof: 'Verified agency',                      href: 'https://www.designrush.com/agency/profile/elux-space' },
]

export default function TrustStrip() {
  return (
    <section className="bg-cream-2 border-y-2 border-ink">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="eyebrow text-ink-3 mb-2">[VERIFIED BY]</div>
            <h2 className="display-md text-ink leading-[1]">
              FOUR PLATFORMS.<br />
              ZERO FAKING IT.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* Badges removed per user request */}
          </div>
        </div>

        {/* Client logos */}
        <div className="mt-8 pt-6 border-t-2 border-ink/15 grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-center">
          <div>
            <div className="eyebrow text-ink-3 mb-1">[WORKING WITH]</div>
            <div className="font-body text-xs text-ink-2 max-w-[180px] leading-snug">
              Founders in Singapore, Sydney, Scotland &amp; New York.
            </div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 items-center">
            {clientLogos.map((logo, i) => (
              <img
                key={i}
                src={logo}
                alt={`Client logo ${i + 1}`}
                className="w-full h-6 object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
