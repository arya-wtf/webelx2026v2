const links = ['Home', 'Work', 'Services', 'About', 'Insights', 'Contact']

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur">
      <div className="mx-auto max-w-page px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#" className="display text-2xl tracking-tighter normal-case">
          elux<span className="text-ink">.</span>space
        </a>
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="font-body text-[13px] font-semibold text-ink hover:text-ink-2 transition-colors"
            >
              {l}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn-primary">
          Let's talk
          <span className="inline-block w-4 h-4 leading-none">↗</span>
        </a>
      </div>
    </header>
  )
}
