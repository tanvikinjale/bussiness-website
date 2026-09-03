import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import AnimatedIcon from './AnimatedIcon'
import { EASE } from './Reveal'

/**
 * Service tile — mirrors the icon / title / description stack on slide 3.
 */
export default function ServiceCard({ service, index }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : 28 },
        show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.6, ease: EASE } },
      }}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="h-full"
    >
      <Link
        to={`/services/${service.slug}`}
        className="group flex h-full flex-col rounded-2xl border border-bone bg-white p-8 transition-colors duration-300 hover:border-charcoal/40"
      >
        {index != null && (
          <span className="mb-6 block text-xs font-medium tracking-[0.18em] text-charcoal/35">
            {String(index + 1).padStart(2, '0')}
          </span>
        )}

        <AnimatedIcon name={service.slug} className="h-11 w-11 text-charcoal" />

        <h3 className="mt-7 font-display text-xl font-semibold">{service.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/65">{service.short}</p>

        <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-charcoal">
          Learn more
          <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1">
            <path
              d="M2 8h11M9 4l4 4-4 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Link>
    </motion.div>
  )
}
