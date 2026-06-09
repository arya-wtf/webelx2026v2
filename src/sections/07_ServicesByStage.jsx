import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { copy } from '../content/siteCopy'

const ORDER = ['Seed', 'Growth', 'Scale']

function AccordionItem({ num, title, desc, delay }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="border-b-2 border-ink group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      <div className="grid grid-cols-[auto_1fr_auto] gap-4 md:gap-5 py-5 md:py-6 items-center">
        <span className="font-display font-bold text-[11px] text-ink-3 tabular-nums w-6">{num}</span>
        <span className="font-display font-bold text-lg md:text-xl uppercase tracking-[0.02em] group-hover:text-primary transition-colors pr-2 md:pr-4">{title}</span>
        <span className={`w-8 h-8 md:w-9 md:h-9 rounded-chip border-2 flex items-center justify-center transition-all duration-300 ${isHovered ? 'bg-primary text-cream border-primary rotate-45' : 'border-ink group-hover:border-primary group-hover:text-primary'}`}>
           +
        </span>
      </div>
      
      <AnimatePresence>
        {isHovered && desc && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-10 md:pl-14 pr-8 md:pr-12 font-body text-base md:text-lg text-ink-2 leading-relaxed">
              {desc}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function ServicesByStage() {
  const servicesCopy = copy.services
  const [stage, setStage] = useState('Seed')
  const data = servicesCopy.stages[stage]

  return (
    <section id="services" className="bg-cream">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-24 md:py-32">
        {/* Header: Full-width */}
        <div className="mb-12">
          <div className="eyebrow text-ink-3 mb-3">{servicesCopy.eyebrow}</div>
          <h2 className="display-lg text-ink max-w-4xl mb-6">{servicesCopy.headline}</h2>
          <p className="font-body text-xl text-ink-2 max-w-3xl leading-relaxed">{servicesCopy.supportingCopy}</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {ORDER.map((s, i) => {
            const active = stage === s
            return (
              <button
                key={s}
                onClick={() => setStage(s)}
                className={`flex items-center gap-3 px-5 py-3 border-2 border-ink rounded-chip font-display font-bold uppercase text-base tracking-[0.04em] transition-colors ${
                  active ? 'bg-ink text-cream' : 'bg-cream text-ink hover:bg-cream-2'
                }`}
              >
                <span className={`text-xs ${active ? 'text-primary' : 'text-ink-3'}`}>0{i + 1}</span>
                {s}
              </button>
            )
          })}
        </div>

        {/* Content: Headline Left, Description Right */}
        <div className="mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="mb-8 grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-16 items-start"
            >
              {/* Left — Headline */}
              <h3 className="display-md text-ink whitespace-pre-line leading-[1.05]">{data.h}</h3>
              
              {/* Right — Description + CTA */}
              <div className="lg:pt-2">
                {data.sprint && (
                  <div className="font-body italic text-ink-3 mb-4">{data.sprint}</div>
                )}
                <p className="font-body text-lg text-ink-2 leading-relaxed mb-6">{data.p}</p>
                <a href="#contact" className="btn-primary inline-flex">
                  {data.cta} ↗
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* 2-Column Accordion */}
          <div className="border-t-2 border-ink grid md:grid-cols-2 gap-0 md:gap-x-8 lg:gap-x-12">
            {data.items.map((it, i) => {
              // Parse '01 Title | Description'
              const [titleWithNum, desc] = it.split(' | ')
              const numMatch = titleWithNum?.match(/^(\d+)\s+(.*)$/)
              const num = numMatch ? numMatch[1] : `0${i + 1}`
              const title = numMatch ? numMatch[2] : titleWithNum
              
              return (
                 <AccordionItem 
                   key={`${stage}-${title}`} 
                   num={num} 
                   title={title} 
                   desc={desc} 
                   delay={i * 0.06} 
                 />
              )
            })}
          </div>
        </div>


      </div>
    </section>
  )
}
