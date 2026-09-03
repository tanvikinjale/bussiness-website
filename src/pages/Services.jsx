import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import AnimatedIcon from '../components/AnimatedIcon'
import { RevealGroup, RevealItem, EASE } from '../components/Reveal'
import { Pill } from '../components/ui'
import { services } from '../data/services'

/** Wide list row — image (where the deck has one) beside the copy. */
function ServiceRow({ service, index }) {
  const reduce = useReducedMotion()
  const flipped = index % 2 === 1

  return (
    <RevealItem>
      <Link
        to={`/services/${service.slug}`}
        className="group grid items-center gap-8 border-t border-bone py-12 lg:grid-cols-12 lg:gap-12"
      >
        <div className={`lg:col-span-5 ${flipped ? 'lg:order-2' : ''}`}>
          <motion.div
            className="aspect-[4/3] overflow-hidden rounded-2xl bg-cream"
            whileHover={reduce ? undefined : { scale: 1.01 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {service.image ? (
              <img
                src={service.image}
                alt={service.detailTitle}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <AnimatedIcon name={service.slug} className="h-20 w-20 text-charcoal/70" />
              </div>
            )}
          </motion.div>
        </div>

        <div className={`lg:col-span-7 ${flipped ? 'lg:order-1' : ''}`}>
          <span className="text-xs font-medium tracking-[0.18em] text-charcoal/35">
            {String(index + 1).padStart(2, '0')}
          </span>

          <h2 className="mt-5 font-display text-2xl font-semibold lg:text-3xl">
            {service.detailTitle}
          </h2>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-charcoal/70">{service.body}</p>

          {service.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <Pill key={tag}>{tag}</Pill>
              ))}
            </div>
          )}

          <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
            View details
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
            >
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
        </div>
      </Link>
    </RevealItem>
  )
}

export default function Services() {
  return (
    <>
      <PageHero
        kicker="What we do"
        title="Our Services"
        intro="From luxury steam, sauna and hydrotherapy installations to complete electrical contracting — designed, installed and maintained by one team."
      />

      <section className="container-page pt-8 pb-24 lg:pb-32">
        <RevealGroup stagger={0.06}>
          {services.map((service, i) => (
            <ServiceRow key={service.slug} service={service} index={i} />
          ))}
        </RevealGroup>
      </section>

      <CTABand tone="charcoal" />
    </>
  )
}
