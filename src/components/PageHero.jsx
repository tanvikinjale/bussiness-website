import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import Reveal, { EASE } from './Reveal'

/** Standard masthead for inner pages. */
export default function PageHero({ kicker, title, intro, breadcrumb }) {
  const reduce = useReducedMotion()

  return (
    <section className="border-b border-bone">
      <div className="container-page py-20 lg:py-28">
        {breadcrumb && (
          <Reveal as="nav" className="mb-8 text-xs text-charcoal/50" aria-label="Breadcrumb">
            <Link to={breadcrumb.to} className="transition-colors hover:text-charcoal">
              {breadcrumb.label}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal/70">{title}</span>
          </Reveal>
        )}

        {kicker && (
          <Reveal as="p" className="kicker">
            {kicker}
          </Reveal>
        )}

        <Reveal
          as="h1"
          delay={0.05}
          className="display-xl mt-5 max-w-4xl text-4xl sm:text-5xl lg:text-[3.5rem]"
        >
          {title}
        </Reveal>

        <motion.div
          className="mt-8 h-0.5 max-w-xl origin-left rounded-full bg-charcoal/50"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: reduce ? 0 : 1, delay: reduce ? 0 : 0.2, ease: EASE }}
        />

        {intro && (
          <Reveal
            as="p"
            delay={0.15}
            className="mt-8 max-w-2xl text-base leading-relaxed text-charcoal/70"
          >
            {intro}
          </Reveal>
        )}
      </div>
    </section>
  )
}
