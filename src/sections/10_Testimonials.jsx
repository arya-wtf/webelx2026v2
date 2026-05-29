import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import DummyVideo from '../components/DummyVideo'

/**
 * v2 Section 10 — Testimonials.
 * 3-column infinite marquee:
 *  - Col 1: scrolls UP
 *  - Col 2: scrolls DOWN
 *  - Col 3: scrolls UP
 * Cards:
 *  - "video"  → landscape aspect-[16/10]
 *  - "quote"  → portrait-ish, avatar photo top + quote + name below (per reference image 1)
 */

// Testimonial card data
const quotes = [
  {
    kind: 'quote',
    avatar: 'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg?auto=compress&cs=tinysrgb&w=400',
    logo: 'MW®',
    text: 'Great thanks — I\'ve carved out time to review and go over this tomorrow morning. Cannot wait!!',
    name: 'TJ Kolesnik',
    role: 'CEO and Founder, Make Waves Agency',
  },
  {
    kind: 'quote',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    logo: 'NETEVIA',
    text: 'A real partner that accelerates our growth — not a vendor we have to manage.',
    name: 'Jason Park',
    role: 'CPO, Netevia',
  },
  {
    kind: 'video',
    brand: 'FLUZ',
  },
  {
    kind: 'quote',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    logo: 'SPLITIT',
    text: 'Flexibility, scalability, and security we actually needed for a fintech MVP.',
    name: 'Sarah Mills',
    role: 'Head of Product, Splitit',
  },
  {
    kind: 'quote',
    avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
    logo: 'BNY',
    text: 'With Elux we reliably expanded our product offering without scaling the team.',
    name: 'Marcus Chen',
    role: 'VP Engineering, BNY',
  },
  {
    kind: 'video',
    brand: 'COINFLOW',
  },
  {
    kind: 'quote',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    logo: 'SISYPHUS',
    text: 'They moved fast without breaking the design. Rare combo in any studio.',
    name: 'Priya Sharma',
    role: 'Founder, Sisyphus Labs',
  },
  {
    kind: 'quote',
    avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400',
    logo: 'VANCE',
    text: 'Shipped our MVP in 7 days. Investors were impressed before we even pitched.',
    name: 'Alex Vance',
    role: 'CEO, Vance AI',
  },
  {
    kind: 'video',
    brand: 'MODAL',
  },
]

// Each column gets a mix of video + quote cards
const col1Items = [quotes[0], quotes[2], quotes[3], quotes[8]]   // quote, video, quote, video
const col2Items = [quotes[1], quotes[5], quotes[4], quotes[6]]   // quote, video, quote, quote
const col3Items = [quotes[7], quotes[2], quotes[0], quotes[5]]   // quote, video, quote, video

function VideoCard({ item }) {
  return (
    <div className="rounded-2xl overflow-hidden relative bg-[#0a0d1a] w-full" style={{ aspectRatio: '16/10' }}>
      <DummyVideo brand={item.brand} />
    </div>
  )
}

function QuoteCard({ item }) {
  return (
    <div className="rounded-2xl border border-ink/20 bg-ink-bg text-cream overflow-hidden w-full">
      {/* Avatar photo — top */}
      <div className="w-full" style={{ aspectRatio: '4/3' }}>
        <img
          src={item.avatar}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Text content — bottom */}
      <div className="p-5">
        <div className="font-display font-bold text-[10px] uppercase tracking-[0.14em] text-primary mb-3">{item.logo}</div>
        <p className="font-body text-sm leading-snug text-on-ink-2 mb-4">"{item.text}"</p>
        <div className="pt-3 border-t border-cream/10">
          <div className="font-display font-bold text-[13px] text-cream">{item.name}</div>
          <div className="font-body text-[11px] text-on-ink-3 mt-0.5">{item.role}</div>
        </div>
      </div>
    </div>
  )
}

function Card({ item }) {
  return item.kind === 'video' ? <VideoCard item={item} /> : <QuoteCard item={item} />
}

function MarqueeColumn({ items, direction = 'up', speed = 35 }) {
  const doubled = [...items, ...items]

  return (
    <div className="h-full overflow-hidden relative">
      <style>{`
        @keyframes marqueeUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes marqueeDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
      `}</style>
      <div 
        className="flex flex-col"
        style={{
          animation: `${direction === 'up' ? 'marqueeUp' : 'marqueeDown'} ${speed}s linear infinite`,
          width: '100%',
        }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="pb-4 w-full">
            <Card item={item} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="bg-cream-2 border-y-2 border-ink overflow-hidden">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-24 md:py-32">
        <div className="mb-12">
          <div className="eyebrow text-ink-3 mb-3">[IN THEIR WORDS]</div>
          <h2 className="display-lg text-ink">
            BUILT WITH<br />
            FOUNDERS WHO SHIP.
          </h2>
        </div>

        {/* 3-column marquee container with fade overlays */}
        <div className="relative" style={{ height: '680px' }}>
        {/* Columns */}
          <div className="grid grid-cols-3 gap-4 h-full overflow-hidden">
            <div className="overflow-hidden">
              <MarqueeColumn items={col1Items} direction="up" speed={40} />
            </div>
            <div className="overflow-hidden">
              <MarqueeColumn items={col2Items} direction="down" speed={50} />
            </div>
            <div className="overflow-hidden">
              <MarqueeColumn items={col3Items} direction="up" speed={45} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
