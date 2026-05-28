export default function Footer() {
  return (
    <footer className="bg-ink-bg text-on-ink">


      {/* Middle Grid */}
      <div className="mx-auto max-w-page px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-8">
          
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-10">
            <div className="text-3xl font-display font-bold tracking-tight mb-6">
              elux<span className="text-primary">.</span>space
            </div>
            <p className="body-sm text-on-ink-2 max-w-sm mb-10">
              We help startups and companies design digital products people love and trust.
            </p>
            <div className="flex flex-col gap-3 font-body text-[15px] text-on-ink mb-6">
              <a href="mailto:hello@elux.space" className="hover:text-primary transition-colors">hello@elux.space</a>
              <a href="tel:+6285156989279" className="hover:text-primary transition-colors">+62 851-5698-9279</a>
            </div>
            <div className="text-[13px] font-body text-on-ink-3 mb-10">
              Jakarta · Bali · Remote
            </div>
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-line-ink bg-on-ink/5">
              <div className="w-1.5 h-1.5 rounded-full bg-success" />
              <span className="text-[11px] font-body text-on-ink-2">Booking Q3 — 2 slots open</span>
            </div>
          </div>

          {/* Links Cols */}
          <div>
            <h4 className="font-display font-bold text-[10px] uppercase tracking-[0.14em] text-on-ink-3 mb-6">Services</h4>
            <ul className="flex flex-col gap-5 text-[14px] font-body text-on-ink-2">
              <li><a href="#services" className="hover:text-on-ink transition-colors">MVP UX & UI Design</a></li>
              <li><a href="#services" className="hover:text-on-ink transition-colors">Clickable Prototype</a></li>
              <li><a href="#services" className="hover:text-on-ink transition-colors">Launch-Ready Landing</a></li>
              <li><a href="#services" className="hover:text-on-ink transition-colors">No-Code MVP Build</a></li>
              <li><a href="#services" className="hover:text-on-ink transition-colors">UX Audit & Review</a></li>
              <li><a href="#services" className="hover:text-on-ink transition-colors">Activation Flow Redesign</a></li>
              <li><a href="#services" className="hover:text-on-ink transition-colors">Design System Setup</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-[10px] uppercase tracking-[0.14em] text-on-ink-3 mb-6">Industries</h4>
            <ul className="flex flex-col gap-5 text-[14px] font-body text-on-ink-2">
              <li><a href="#industries" className="hover:text-on-ink transition-colors">AI & SaaS</a></li>
              <li><a href="#industries" className="hover:text-on-ink transition-colors">Fintech</a></li>
              <li><a href="#industries" className="hover:text-on-ink transition-colors">Health & Wellness</a></li>
              <li><a href="#industries" className="hover:text-on-ink transition-colors">Mobility</a></li>
              <li><a href="#industries" className="hover:text-on-ink transition-colors">Marketplace</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-[10px] uppercase tracking-[0.14em] text-on-ink-3 mb-6">Studio</h4>
            <ul className="flex flex-col gap-5 text-[14px] font-body text-on-ink-2">
              <li><a href="#" className="hover:text-on-ink transition-colors">Home</a></li>
              <li><a href="#work" className="hover:text-on-ink transition-colors">Work</a></li>
              <li><a href="#services" className="hover:text-on-ink transition-colors">Services</a></li>
              <li><a href="#process" className="hover:text-on-ink transition-colors">Process</a></li>
              <li><a href="#testimonials" className="hover:text-on-ink transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-on-ink transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-[10px] uppercase tracking-[0.14em] text-on-ink-3 mb-6">Connect</h4>
            <ul className="flex flex-col gap-5 text-[14px] font-body text-on-ink-2">
              <li><a href="https://dribbble.com" target="_blank" rel="noreferrer" className="hover:text-on-ink transition-colors">Dribbble</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-on-ink transition-colors">Instagram</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-on-ink transition-colors">LinkedIn</a></li>
              <li><a href="mailto:hello@elux.space" className="hover:text-on-ink transition-colors">Email Us</a></li>
            </ul>
          </div>

        </div>
      </div>

      <div className="border-t border-line-ink" aria-hidden="true" />

      {/* Bottom Section */}
      <div className="mx-auto max-w-page px-6 lg:px-10 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="font-body text-[13px] text-on-ink-3">
            © {new Date().getFullYear()} Elux Space. All rights reserved.
          </div>
          <div className="flex gap-8 text-[13px] font-body text-on-ink-2">
            <a href="#" className="hover:text-on-ink transition-colors">Privacy</a>
            <a href="#" className="hover:text-on-ink transition-colors">Terms</a>
            <a href="#" className="hover:text-on-ink transition-colors">Cookies</a>
            <a href="#" className="hover:text-on-ink transition-colors">Sitemap</a>
          </div>
          <div className="font-body text-[13px] text-on-ink-3">
            Built by Elux · v2026.1
          </div>
        </div>
      </div>
    </footer>
  )
}
