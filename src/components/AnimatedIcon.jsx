import { useRef } from 'react'
import { useInView } from 'motion/react'

// Every icon lifted out of the deck, keyed by file name (see scripts/extract-assets.mjs).
const modules = import.meta.glob('../assets/icons/*.svg', {
  query: '?react',
  import: 'default',
  eager: true,
})

const icons = Object.fromEntries(
  Object.entries(modules).map(([path, Component]) => [
    path.split('/').pop().replace('.svg', ''),
    Component,
  ]),
)

/**
 * Line icon that draws itself the first time it scrolls into view.
 * Strokes inherit `currentColor`, so colour is set by the parent.
 */
export default function AnimatedIcon({ name, className = 'h-10 w-10' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const Svg = icons[name]

  if (!Svg) return null

  return (
    <span ref={ref} className={`icon-draw inline-block ${inView ? 'is-drawn' : ''}`}>
      <Svg className={className} aria-hidden="true" focusable="false" />
    </span>
  )
}
