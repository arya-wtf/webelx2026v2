import { motion } from 'framer-motion'
import { copy } from '../content/siteCopy'

function BrandIcon({ slug, className }) {
  return (
    <img 
      src={slug.includes('http') ? slug : `https://api.iconify.design/${slug}.svg`} 
      alt={slug}
      className={className}
      loading="lazy"
    />
  )
}

const AI_STACK = [
  { name: 'ChatGPT', slug: 'logos/openai-icon' },
  { name: 'Claude', slug: 'logos/claude-icon' },
  { name: 'Cursor', slug: 'devicon/cursor' },
  { name: 'Vercel v0', slug: 'simple-icons/v0' },
  { name: 'Copilot', slug: 'logos/github-copilot' },
  { name: 'Figma AI', slug: 'logos/figma' },
  { name: 'Gemini', slug: 'logos/google-gemini' },
  { name: 'Notion AI', slug: 'logos/notion-icon' },
]

export default function TheAIStack() {
  const stackCopy = copy.aiStack

  return (
    <section className="bg-cream overflow-hidden">
      <div className="mx-auto max-w-page px-6 lg:px-10 py-24 md:py-32">
        <div className="mb-14">
          <div>
            <div className="eyebrow text-ink-3 mb-3">THE AI STACK</div>
            <h2 className="display text-[clamp(32px,4.5vw,64px)] text-ink max-w-none whitespace-pre-line leading-[0.95]">{stackCopy.headline}</h2>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="relative group -mx-6 lg:-mx-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        >
          <div 
            className="flex w-max animate-marquee hover:[animation-play-state:paused] py-2"
            style={{ animationDuration: '40s' }}
          >
            {/* First Set */}
            <div className="flex items-center gap-4 md:gap-5 px-2 md:px-2.5 shrink-0">
              {AI_STACK.map((tool, idx) => (
                <div
                  key={`a-${idx}`}
                  className="flex items-center gap-4 py-4 px-6 md:py-5 md:px-7 bg-cream-2 border-2 border-ink rounded-chip transition-colors duration-300 hover:bg-white"
                >
                  <BrandIcon 
                    slug={tool.slug} 
                    className="w-6 h-6 md:w-8 md:h-8" 
                  />
                  <span className="font-display font-bold text-[11px] md:text-xs uppercase tracking-[0.1em] text-ink">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
            {/* Duplicate Set for Seamless Loop */}
            <div className="flex items-center gap-4 md:gap-5 px-2 md:px-2.5 shrink-0">
              {AI_STACK.map((tool, idx) => (
                <div
                  key={`b-${idx}`}
                  className="flex items-center gap-4 py-4 px-6 md:py-5 md:px-7 bg-cream-2 border-2 border-ink rounded-chip transition-colors duration-300 hover:bg-white"
                >
                  <BrandIcon 
                    slug={tool.slug} 
                    className="w-6 h-6 md:w-8 md:h-8" 
                  />
                  <span className="font-display font-bold text-[11px] md:text-xs uppercase tracking-[0.1em] text-ink">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
