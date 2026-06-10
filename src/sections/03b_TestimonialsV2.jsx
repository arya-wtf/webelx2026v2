import { useRef, useState } from 'react'
import { copy } from '../content/siteCopy'

const avatars = [
  // [0] Karis Cheng - Contra
  'https://media.contra.com/image/upload/w_1200,h_1200,c_fill,q_auto:best/wsg6odrnfiw5e3csu4ld',
  // [1] Gunnar Asmussen - Contra
  'https://media.contra.com/image/upload/w_1200,h_1200,c_fill,q_auto:best/ihajtqbtnpwtv2cnmttc',
  // [2] Niklas (Samsa AI)
  'https://cdn.prod.website-files.com/6989896e1913ef45a770138a/69afc6d1d6eb8c75836d2abf_Card%20Image-1.png',
  // [3] Yvonne Chou (Ai2)
  'https://cdn.prod.website-files.com/6989896e1913ef45a770138a/69afc6d1c051d194e2c9a9f8_Card%20Image-2.png',
  // [4] Taha Elraaid (Lamah)
  'https://cdn.prod.website-files.com/6989896e1913ef45a770138a/69afc6d10e0bf76a1afb783e_Card%20Image-3.png',
  // [5] Gabriel Sirbu (UI Core)
  'https://cdn.prod.website-files.com/6989896e1913ef45a770138a/69afc6d12e69851c78b49005_Card%20Image-4.png',
  // [6] David Albright (Ai2)
  'https://cdn.prod.website-files.com/6989896e1913ef45a770138a/69afc6d17d12de6f1b0aa60c_Card%20Image-5.png',
  // [7] PUI (Travelcircus)
  'https://cdn.prod.website-files.com/6989896e1913ef45a770138a/69afc6cd7fcfb5f4218c1c1a_Card%20Image-10.png',
  // [8] TJ Kolesnik (Make Waves)
  'https://cdn.prod.website-files.com/6989896e1913ef45a770138a/69afc6d113732437f678ddab_Card%20Image-6.png',
  // [9] Habil Masuri (Digital Quartier)
  'https://cdn.prod.website-files.com/6989896e1913ef45a770138a/69afc6d000e8a28a7db8dea2_Card%20Image.png',
  // [10] Cory Gill (Alia)
  'https://cdn.prod.website-files.com/6989896e1913ef45a770138a/69afc6d1e173b028620c752d_Card%20Image-11.png',
  // [11] Sadam Ali (JCD)
  'https://cdn.prod.website-files.com/6989896e1913ef45a770138a/69b24a83ba7729cc7f10b133_Card%20Image.png',
  // [12] Florian (Frontside Media)
  'https://cdn.prod.website-files.com/6989896e1913ef45a770138a/69b24a82c7fe0d9cbdb2bb36_Card%20Image-1.png',
  // [13] Karthik Murali (Resync)
  'https://cdn.prod.website-files.com/6989896e1913ef45a770138a/69b24a839ba094dd2c2ef383_Card%20Image-2.png',
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
        style={{ position: 'absolute', top: '-30%', left: '-30%', width: '160%', height: '160%', border: 0, pointerEvents: 'none' }}
      />
      <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
      <button
        onClick={toggleMute}
        className="absolute bottom-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors border border-white/20"
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? 'M' : 'U'}
      </button>
    </div>
  )
}

function QuoteCard({ item }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#111111] text-cream overflow-hidden w-full transition-colors duration-300 hover:border-primary/50">
      <div className="w-full" style={{ aspectRatio: '1/1' }}>
        <img
          src={item.avatar}
          alt={item.name}
          className="w-full h-full object-cover object-top"
          loading="eager"
          style={{ transform: 'translateZ(0)', WebkitTransform: 'translateZ(0)', imageRendering: '-webkit-optimize-contrast' }}
        />
      </div>
      <div className="p-6">
        <div className="font-display font-bold text-[11px] uppercase tracking-[0.14em] text-primary mb-3">{item.logo}</div>
        <p className="font-body text-[15px] leading-snug text-cream/90 mb-6">"{item.text}"</p>
        <div className="pt-4 border-t border-cream/10 flex items-center justify-between">
          <div>
            <div className="font-display font-bold text-[14px] text-cream">{item.name}</div>
            <div className="font-body text-[12px] text-cream/50 mt-0.5">{item.role}</div>
          </div>
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
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(0, -50%, 0); }
        }
        @keyframes marqueeDown {
          0% { transform: translate3d(0, -50%, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
      `}</style>
      <div
        className="flex flex-col"
        style={{
          animation: `${direction === 'up' ? 'marqueeUp' : 'marqueeDown'} ${speed}s linear infinite`,
          width: '100%',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        {doubled.map((item, i) => (
          <div key={`${item.kind}-${item.name ?? item.id}-${i}`} className="pb-4 md:pb-6 w-full">
            <Card item={item} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TestimonialsV2() {
  const testimonialCopy = copy.testimonials
  const quotes = testimonialCopy.quotes.map((quote, i) => ({ ...quote, avatar: avatars[i] }))
  const videos = testimonialCopy.videoIds.map((id) => ({ kind: 'youtube', id }))
  const fallbackVideo = videos[0]
  
  const col1Items = [videos[0], quotes[0], quotes[2], videos[1] ?? fallbackVideo, quotes[5], quotes[8], quotes[11]].filter(Boolean)
  const col2Items = [quotes[1], quotes[3], videos[1] ?? fallbackVideo, quotes[6], quotes[9], quotes[12]].filter(Boolean)
  const col3Items = [quotes[4], videos[0], quotes[7], quotes[10], quotes[13], quotes[0]].filter(Boolean)

  return (
    <section className="bg-ink-bg border-y-2 border-ink overflow-hidden">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-24 md:py-32">
        <div className="mb-14 max-w-2xl">
          <div className="eyebrow text-cream/50 mb-3">{testimonialCopy.eyebrow}</div>
          <h2 className="display-lg text-cream">{testimonialCopy.headline}</h2>
        </div>

        {/* Faded edges to make the scroll look premium */}
        <div className="relative" style={{ height: '780px' }}>
          
          <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-ink-bg to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-ink-bg to-transparent z-10 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full overflow-hidden">
            <div className="overflow-hidden">
              <MarqueeColumn items={col1Items} direction="up" speed={45} />
            </div>
            <div className="overflow-hidden hidden md:block">
              <MarqueeColumn items={col2Items} direction="down" speed={65} />
            </div>
            <div className="overflow-hidden hidden lg:block">
              <MarqueeColumn items={col3Items} direction="up" speed={50} />
            </div>
          </div>
        </div>
        
      </div>
    </section>
  )
}
