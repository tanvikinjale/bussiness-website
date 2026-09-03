import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useReducedMotion } from 'motion/react'
import { company } from '../data/company'
import Logo from './Logo'
import { EASE } from './Reveal'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const { scrollY, scrollYProgress } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const reduce = useReducedMotion()
  const { pathname } = useLocation()

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 8)
    const previous = scrollY.getPrevious() ?? 0
    // Only retract once past the hero, and never while the mobile menu is open.
    setHidden(!menuOpen && y > 240 && y > previous)
  })

  // The home page opens on a full-bleed photograph, so the bar sits transparent
  // over it until the first scroll.
  const overHero = pathname === '/' && !scrolled && !menuOpen

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMenuOpen(false), [pathname])

  // Lock scrolling behind the full-screen menu.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      animate={{ y: hidden && !reduce ? '-100%' : '0%' }}
      transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
    >
      {/* Bar background and link colours share one duration so the crossfade
          never leaves pale text on a pale bar. */}
      <div
        className={`transition-colors duration-200 ${
          overHero
            ? 'bg-transparent'
            : scrolled || menuOpen
              ? 'bg-white/90 backdrop-blur-md'
              : 'bg-white'
        }`}
      >
        <div className="container-page flex h-20 items-center justify-between">
          <Link to="/" aria-label={company.name} className={overHero ? 'text-white' : undefined}>
            <Logo tone={overHero ? 'dark' : 'light'} />
          </Link>

          <div className="flex items-center gap-8">
            <nav className="hidden items-center gap-9 lg:flex">
              {nav.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className="group relative py-1"
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`text-sm transition-colors duration-200 ${
                          overHero ? '[text-shadow:0_1px_14px_rgba(20,18,16,0.55)]' : ''
                        } ${
                          isActive
                            ? overHero
                              ? 'text-white'
                              : 'text-charcoal'
                            : overHero
                              ? 'text-white/70 group-hover:text-white'
                              : 'text-charcoal/60 group-hover:text-charcoal'
                        }`}
                      >
                        {link.label}
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className={`absolute -bottom-0.5 left-0 h-px w-full ${
                            overHero ? 'bg-white' : 'bg-charcoal'
                          }`}
                          transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            >
              <motion.span
                className={`block h-px w-6 ${overHero ? 'bg-white' : 'bg-charcoal'}`}
                animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
              />
              <motion.span
                className={`block h-px w-6 ${overHero ? 'bg-white' : 'bg-charcoal'}`}
                animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
              />
            </button>
          </div>
        </div>

        {/* Reading progress — doubles as the header's bottom hairline. */}
        <div className={`h-px w-full transition-colors duration-300 ${scrolled ? 'bg-bone' : 'bg-transparent'}`}>
          <motion.div className="h-px origin-left bg-charcoal" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-x-0 top-20 bottom-0 z-40 bg-white lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
          >
            <div className="container-page flex h-full flex-col justify-between py-10">
              <nav className="flex flex-col gap-2">
                {nav.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduce ? 0 : 0.06 * i, duration: 0.4, ease: EASE }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        `block border-b border-bone py-4 font-display text-3xl ${
                          isActive ? 'text-charcoal' : 'text-charcoal/50'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div className="space-y-1 text-sm text-charcoal/70">
                <a href={company.tel} className="block text-charcoal">
                  {company.phoneDisplay}
                </a>
                <a href={company.mailto} className="block break-all">
                  {company.email}
                </a>
                <p>{company.address}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
