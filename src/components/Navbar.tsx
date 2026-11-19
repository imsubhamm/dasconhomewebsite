import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

const links = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const menu =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-40 bg-paper text-ink md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <ul className="section-pad flex h-full flex-col justify-center gap-6 pt-16">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <a
                    href={link.href}
                    className="font-display text-4xl font-bold text-ink"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <a
                  href="#contact"
                  className="mt-4 inline-block bg-ink px-5 py-3 text-sm font-semibold text-paper"
                  onClick={() => setOpen(false)}
                >
                  Start a project
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
    )

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || open
            ? 'bg-paper/90 text-ink shadow-[0_1px_0_var(--color-line)] backdrop-blur-md'
            : 'bg-transparent text-paper'
        }`}
      >
        <nav className="section-pad mx-auto flex h-16 max-w-7xl items-center justify-between md:h-20">
          <a
            href="#top"
            className="font-display text-lg font-bold tracking-tight md:text-xl"
            onClick={() => setOpen(false)}
          >
            Dascon Sourav
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium tracking-wide opacity-85 transition hover:opacity-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className={
                  scrolled || open
                    ? 'rounded-sm bg-ink px-4 py-2 text-sm font-semibold text-paper transition hover:bg-ink-soft'
                    : 'rounded-sm bg-paper px-4 py-2 text-sm font-semibold text-ink transition hover:bg-stone'
                }
              >
                Start a project
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-0.5 w-full origin-center transition ${
                  open ? 'translate-y-2 rotate-45 bg-ink' : 'bg-current'
                }`}
              />
              <span
                className={`h-0.5 w-full transition ${
                  open ? 'opacity-0' : 'bg-current'
                }`}
              />
              <span
                className={`h-0.5 w-full origin-center transition ${
                  open ? '-translate-y-2 -rotate-45 bg-ink' : 'bg-current'
                }`}
              />
            </div>
          </button>
        </nav>
      </header>
      {menu}
    </>
  )
}
