import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

/**
 * Gallery viewer. Opens from the clicked thumbnail via a shared layoutId, and
 * supports arrow-key / Escape navigation.
 */
export default function Lightbox({ items, index, onClose, onNavigate }) {
  const reduce = useReducedMotion()
  const open = index != null
  const item = open ? items[index] : null

  useEffect(() => {
    if (!open) return

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate((index + 1) % items.length)
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + items.length) % items.length)
    }

    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, index, items.length, onClose, onNavigate])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/95 p-4 sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <NavButton
            side="left"
            onClick={(e) => {
              e.stopPropagation()
              onNavigate((index - 1 + items.length) % items.length)
            }}
          />
          <NavButton
            side="right"
            onClick={(e) => {
              e.stopPropagation()
              onNavigate((index + 1) % items.length)
            }}
          />

          <motion.figure
            layoutId={`gallery-${item.id}`}
            className="max-h-full"
            onClick={(e) => e.stopPropagation()}
            transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="max-h-[78vh] w-auto rounded-lg object-contain"
            />
            <figcaption className="mt-4 flex items-center justify-between text-xs text-white/60">
              <span className="tracking-[0.18em] uppercase">{item.category}</span>
              <span>
                {index + 1} / {items.length}
              </span>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function NavButton({ side, onClick }) {
  const left = side === 'left'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={left ? 'Previous image' : 'Next image'}
      className={`absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10 sm:flex ${
        left ? 'left-5' : 'right-5'
      }`}
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
        <path
          d={left ? 'M10 3L5 8l5 5' : 'M6 3l5 5-5 5'}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
