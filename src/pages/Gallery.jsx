import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import Lightbox from '../components/Lightbox'
import { EASE } from '../components/Reveal'
import { gallery, galleryCategories } from '../data/gallery'

const columnCount = () => {
  if (typeof window === 'undefined') return 3
  if (window.matchMedia('(min-width: 1024px)').matches) return 3
  return window.matchMedia('(min-width: 640px)').matches ? 2 : 1
}

export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const [openIndex, setOpenIndex] = useState(null)
  const [columnsWide, setColumnsWide] = useState(columnCount)
  const reduce = useReducedMotion()

  // Masonry is built from real flex columns rather than CSS `columns`, because
  // Framer's layout projection mismeasures elements inside a multi-column box.
  useEffect(() => {
    const update = () => setColumnsWide(columnCount())
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const items = useMemo(
    () => (filter === 'All' ? gallery : gallery.filter((item) => item.category === filter)),
    [filter],
  )

  const columns = useMemo(() => {
    const buckets = Array.from({ length: columnsWide }, () => [])
    items.forEach((item, i) => buckets[i % columnsWide].push(item))
    return buckets
  }, [items, columnsWide])

  return (
    <>
      <PageHero
        kicker="Our work"
        title="Recent installations"
        intro="A selection of steam and sauna rooms delivered for homes, hotels and wellness spaces."
      />

      <section className="container-page py-16 lg:py-20">
        <div className="flex flex-wrap gap-2">
          {galleryCategories.map((category) => {
            const active = category === filter
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setFilter(category)
                  setOpenIndex(null)
                }}
                className="relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300"
              >
                {active && (
                  <motion.span
                    layoutId="gallery-filter"
                    className="absolute inset-0 rounded-full bg-charcoal"
                    transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
                  />
                )}
                <span
                  className={`relative z-10 ${active ? 'text-white' : 'text-charcoal/60 hover:text-charcoal'}`}
                >
                  {category}
                </span>
              </button>
            )
          })}
          <span className="ml-auto self-center text-xs text-charcoal/40">
            {items.length} {items.length === 1 ? 'project' : 'projects'}
          </span>
        </div>

        <LayoutGroup>
          <div className="mt-10 flex items-start gap-4">
            {columns.map((column, ci) => (
              <div key={ci} className="flex min-w-0 flex-1 flex-col gap-4">
                <AnimatePresence mode="popLayout">
                  {column.map((item) => (
                    <motion.button
                      key={item.id}
                      type="button"
                      layoutId={`gallery-${item.id}`}
                      onClick={() => setOpenIndex(items.indexOf(item))}
                      initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                      transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
                      className="group block w-full overflow-hidden rounded-xl bg-cream"
                      aria-label={`Open ${item.category} image`}
                    >
                      <span className="relative block overflow-hidden">
                        <img
                          src={item.thumb}
                          alt={item.alt}
                          loading="lazy"
                          className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-charcoal/70 to-transparent px-4 pt-10 pb-4 text-xs tracking-[0.14em] text-white uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          {item.category}
                        </span>
                      </span>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </LayoutGroup>
      </section>

      <Lightbox
        items={items}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />

      <CTABand tone="cream" />
    </>
  )
}
