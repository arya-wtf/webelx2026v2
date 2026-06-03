import { useRef, useState } from 'react'
import { copy } from '../content/siteCopy'

const avatars = [
  'https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400',
]

function YouTubeCard({ item }) {
  const iframeRef = useRef(null)
  const [muted, setMuted] = useState(true)

  const toggleMute = () => {
    const fw = iframeRef.current?.contentWindow
    if (!fw) return
    fw.postMessage(JSON.stringify({ event: 'command', func: muted ? 'unMute' : 'mute', args: [] }), '*')
    setMuted(!muted)
  }

  return (
    <div className="rounded-2xl overflow-hidden w-full bg-black relative" style={{ aspectRatio: '4/3' }}>
      <iframe
        ref={iframeRef}
        src={`https://www.youtube.com/embed/${item.id}?autoplay=1&mute=1&loop=1&playlist=${item.id}&rel=0&controls=0&modestbranding=1&showinfo=0&enablejsapi=1&iv_load_policy=3&disablekb=1`}
        title="Elux Space client testimonial"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        style={{ position: 'absolute', top: '-20%', left: '-15%', width: '130%', height: '140%', border: 0, pointerEvents: 'none' }}
      />
      <div className="absolute inset-0" />
      <button
        onClick={toggleMute}
        className="absolute bottom-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors"
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? 'M' : 'U'}
      </button>
    </div>
  )
}

function QuoteCard({ item }) {
  return (
    <div className="rounded-2xl border border-ink/20 bg-ink-bg text-cream overflow-hidden w-full">
      <div className="w-full" style={{ aspectRatio: '4/3' }}>
        <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
      </div>
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
  return item.kind === 'youtube' ? <YouTubeCard item={item} /> : <QuoteCard item={item} />
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
          <div key={`${item.kind}-${item.name ?? item.id}-${i}`} className="pb-4 w-full">
            <Card item={item} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Testimonials() {
  const testimonialCopy = copy.testimonials
  const quotes = testimonialCopy.quotes.map((quote, i) => ({ ...quote, avatar: avatars[i] }))
  const videos = testimonialCopy.videoIds.map((id) => ({ kind: 'youtube', id }))
  const fallbackVideo = videos[0]
  const col1Items = [videos[0], quotes[0], videos[1] ?? fallbackVideo, quotes[2], videos[0], quotes[4]].filter(Boolean)
  const col2Items = [quotes[1], videos[1] ?? fallbackVideo, quotes[3], quotes[5], videos[0], quotes[0]].filter(Boolean)
  const col3Items = [quotes[2], quotes[4], videos[0], quotes[1], videos[1] ?? fallbackVideo, quotes[3]].filter(Boolean)

  return (
    <section className="bg-cream-2 border-y-2 border-ink overflow-hidden">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-24 md:py-32">
        <div className="mb-12">
          <div className="eyebrow text-ink-3 mb-3">{testimonialCopy.eyebrow}</div>
          <h2 className="display-lg text-ink">{testimonialCopy.headline}</h2>
        </div>

        <div className="relative" style={{ height: '720px' }}>
          <div className="grid grid-cols-3 gap-4 h-full overflow-hidden">
            <div className="overflow-hidden">
              <MarqueeColumn items={col1Items} direction="up" speed={48} />
            </div>
            <div className="overflow-hidden">
              <MarqueeColumn items={col2Items} direction="down" speed={60} />
            </div>
            <div className="overflow-hidden">
              <MarqueeColumn items={col3Items} direction="up" speed={54} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
