export default function Footer() {
  return (
    <footer className="bg-ink-bg text-on-ink">
      <div className="border-t border-line-ink" aria-hidden="true" />
      <div className="mx-auto max-w-page px-6 lg:px-10 py-16">
        <div className="display-md mb-8">
          DON'T BE BORING.<br />
          BUILD WITH ELUX.
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6 border-t border-line-ink">
          <div className="font-body text-xs text-on-ink-3">
            © {new Date().getFullYear()} Elux Space. All rights reserved.
          </div>
          <div className="flex gap-5 text-xs font-body text-on-ink-2">
            <a href="#" className="hover:text-on-ink">LinkedIn</a>
            <a href="#" className="hover:text-on-ink">Instagram</a>
            <a href="#" className="hover:text-on-ink">Dribbble</a>
            <a href="mailto:hello@elux.space" className="hover:text-on-ink">hello@elux.space</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
