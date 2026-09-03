import { motion, useReducedMotion } from 'motion/react'
import Reveal, { EASE } from './Reveal'

/**
 * Kicker + title + the deck's 2px rounded rule, which wipes in from the left.
 */
export default function SectionHeading({ kicker, title, intro, align = 'left', className = '' }) {
  const reduce = useReducedMotion()
  const centered = align === 'center'

  return (
    <div className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {kicker && (
        <Reveal as="p" className="kicker mb-4">
          {kicker}
        </Reveal>
      )}

      <Reveal as="h2" delay={0.05} className="display-xl text-3xl sm:text-4xl lg:text-[2.75rem]">
        {title}
      </Reveal>

      <motion.div
        className={`mt-6 h-0.5 rounded-full bg-charcoal/50 ${centered ? 'mx-auto' : ''}`}
        style={{ transformOrigin: centered ? 'center' : 'left' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.15, ease: EASE }}
      />

      {intro && (
        <Reveal as="p" delay={0.15} className="mt-6 text-base leading-relaxed text-charcoal/70">
          {intro}
        </Reveal>
      )}
    </div>
  )
}
