import { Link, Navigate, useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import AnimatedIcon from '../components/AnimatedIcon'
import Reveal, { RevealGroup, RevealItem, EASE } from '../components/Reveal'
import { Pill } from '../components/ui'
import { services, getService } from '../data/services'

/**
 * Renders every one of the seven services from src/data/services.js. Entries
 * with a photograph get the deck's split layout; the two without (swimming pool
 * and annual maintenance) get an icon-led cream panel instead.
 */
export default function ServiceDetail() {
  const { slug } = useParams()
  const reduce = useReducedMotion()
  const service = getService(slug)

  if (!service) return <Navigate to="/services" replace />

  const index = services.findIndex((s) => s.slug === slug)
  const prev = services[(index - 1 + services.length) % services.length]
  const next = services[(index + 1) % services.length]

  return (
    <>
      <PageHero
        kicker="Service"
        title={service.detailTitle}
        intro={service.body}
        breadcrumb={{ to: '/services', label: 'Services' }}
      />

      <section className="container-page py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            {service.image ? (
              <div className="overflow-hidden rounded-2xl">
                <motion.img
                  src={service.image}
                  alt={service.detailTitle}
                  className="h-[26rem] w-full object-cover sm:h-[32rem] lg:h-[38rem]"
                  initial={{ scale: reduce ? 1 : 1.08, clipPath: 'inset(0 0 100% 0)' }}
                  whileInView={{ scale: 1, clipPath: 'inset(0 0 0% 0)' }}
                  viewport={{ once: true }}
                  transition={{ duration: reduce ? 0 : 1.1, ease: EASE }}
                />
              </div>
            ) : (
              <div className="flex aspect-[16/10] items-center justify-center rounded-2xl bg-cream">
                <AnimatedIcon name={service.slug} className="h-32 w-32 text-charcoal/75" />
              </div>
            )}
          </Reveal>

          <div className="lg:col-span-5">
            {service.tags.length > 0 && (
              <Reveal delay={0.1}>
                <p className="kicker mb-5">Applications</p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <Pill key={tag}>{tag}</Pill>
                  ))}
                </div>
              </Reveal>
            )}

            {service.groups.map((group, gi) => (
              <div key={group.title ?? gi} className={gi === 0 && !service.tags.length ? '' : 'mt-10'}>
                {group.title && (
                  <Reveal as="p" delay={0.1} className="kicker mb-5">
                    {group.title}
                  </Reveal>
                )}

                <RevealGroup as="ul" stagger={0.07} className="space-y-0">
                  {group.items.map((point) => (
                    <RevealItem
                      as="li"
                      key={point}
                      className="flex items-start gap-4 border-b border-bone py-4 text-sm text-charcoal/80 last:border-b-0"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-charcoal/50" />
                      {point}
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            ))}

            <Reveal delay={0.2} className="mt-10 rounded-2xl bg-cream p-8">
              <p className="font-display text-lg font-semibold">Every installation includes</p>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                Design, supply, installation, commissioning and after-sales maintenance — handled by
                the same team from start to finish.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-bone">
        <div className="container-page grid gap-px py-0 sm:grid-cols-2">
          <NeighbourLink service={prev} direction="prev" />
          <NeighbourLink service={next} direction="next" />
        </div>
      </section>

      <CTABand tone="charcoal" />
    </>
  )
}

function NeighbourLink({ service, direction }) {
  const isPrev = direction === 'prev'

  return (
    <Link
      to={`/services/${service.slug}`}
      className={`group flex flex-col gap-3 py-10 ${
        isPrev ? 'sm:pr-10' : 'sm:items-end sm:border-l sm:border-bone sm:pl-10 sm:text-right'
      }`}
    >
      <span className="kicker">{isPrev ? 'Previous' : 'Next'}</span>
      <span className="font-display text-xl font-semibold transition-colors duration-300 group-hover:text-charcoal/60">
        {service.title}
      </span>
    </Link>
  )
}
