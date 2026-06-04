import { motion } from 'framer-motion'
import saasImg from '../assets/work-images/saas.webp'

export default function OwnProducts() {
  const products = [
    {
      title: 'PromptStash',
      desc: 'A curated library of copy-paste AI prompts that generate full landing pages. Pick a prompt, paste it into your AI builder, and ship.',
      tags: ['OWN PRODUCT', 'AI TOOLS'],
      status: 'Live',
      link: 'promptstash.com',
      img: saasImg,
    }
  ]

  return (
    <section className="bg-cream-2 border-t-2 border-ink">
      <div className="mx-auto max-w-page px-6 lg:px-10 pt-24 md:pt-32 pb-16 md:pb-24">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div>
            <div className="eyebrow text-ink-3 mb-3">[WE DON'T JUST BUILD FOR CLIENTS]</div>
            <h2 className="display-lg text-ink mb-4">WE SHIP OUR OWN PRODUCTS TOO.</h2>
            <p className="font-body text-lg text-ink-2 max-w-xl">
              We use the same design-to-build workflow on our own products — turning ideas into interfaces, launch-ready websites, and tools in the market.
            </p>
          </div>
          <a href="#own-products" className="btn-primary hidden md:inline-flex shrink-0">
            SEE ALL PRODUCTS ↗
          </a>
        </div>

        {/* Clean Layout: Large Image with Typography Below */}
        <div className="flex flex-col gap-24 md:gap-32">
          {products.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full flex flex-col group"
            >
              {/* Massive Image Card (Cinematic) */}
              <div className="w-full aspect-[4/3] md:aspect-[21/9] rounded-chip relative overflow-hidden mb-8 md:mb-10 cursor-pointer border-2 border-ink/5 bg-ink">
                <img 
                  src={product.img} 
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                />
                
                {/* Hover Overlay with Center Icon */}
                <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="w-16 h-16 rounded-full bg-cream text-ink flex items-center justify-center shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500 ease-out">
                    <span className="text-2xl leading-none">↗</span>
                  </div>
                </div>
              </div>

              {/* Typography & Info Layout Below Image */}
              <div className="grid md:grid-cols-[1fr_1.5fr] gap-6 md:gap-12 px-2 md:px-4">
                
                {/* Left Side: Title & Tags */}
                <div>
                  <h3 className="display-md text-ink mb-4">{product.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map(tag => (
                      <span key={tag} className="font-display font-bold text-[10px] uppercase tracking-[0.14em] text-primary bg-primary/10 px-3 py-1.5 rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side: Description & Status */}
                <div className="flex flex-col justify-between md:pt-2">
                  <p className="font-body text-lg md:text-xl text-ink-2 max-w-xl mb-6 md:mb-8 leading-relaxed">
                    {product.desc}
                  </p>
                  
                  <div className="font-display font-bold text-[11px] md:text-xs uppercase tracking-widest text-ink-3 flex items-center gap-3 border-t border-ink/10 pt-4 md:pt-6">
                    {product.status.includes('Live') && (
                      <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    )}
                    {product.status} <span className="text-ink/20 mx-2">|</span> {product.link}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-20 flex justify-center md:hidden">
           <a href="#own-products" className="btn-primary inline-flex">
            SEE ALL PRODUCTS ↗
          </a>
        </div>
        
      </div>
    </section>
  )
}
