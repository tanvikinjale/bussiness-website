import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import { EASE } from './components/Reveal'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  const reduce = useReducedMotion()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'instant' })
  }, [pathname, reduce])

  return null
}

export default function App() {
  const location = useLocation()
  const reduce = useReducedMotion()

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />

      <main className="flex-1 pt-20">
        <AnimatePresence mode="wait" initial={false}>
          {/* `location` is passed explicitly so the outgoing copy keeps rendering
              the previous page while it animates out. */}
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -8 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
