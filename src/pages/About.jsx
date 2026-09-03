import { motion, useReducedMotion } from 'motion/react'
import PageHero from '../components/PageHero'
import WhyChooseUs from '../components/WhyChooseUs'
import CTABand from '../components/CTABand'
import Reveal, { EASE } from '../components/Reveal'
import { Pill } from '../components/ui'
import { company } from '../data/company'
import { gallery } from '../data/gallery'

const aboutMosaic = ['sauna-1', 'steam-4', 'sauna-4', 'steam-2'].map((id) =>
  gallery.find((item) => item.id === id),
)

export default function About() {
  const reduce = useReducedMotion()

  return (
    <>
      <PageHero kicker="Who we are" title="About Our Company" />

      <section className="container-page pb-24 lg:pb-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Real project photography rather than a single brand shot — the
              gallery images are of installations we actually delivered. */}
          <div className="grid grid-cols-2 items-start gap-3 lg:col-span-6 lg:gap-4">
            {aboutMosaic.map((item, i) => (
              <Reveal
                key={item.id}
                delay={0.06 * i}
                // The right-hand column drops half a step for a masonry rhythm.
                className={`overflow-hidden rounded-2xl bg-cream ${i % 2 === 1 ? 'lg:mt-12' : ''}`}
              >
                <motion.img
                  src={item.thumb}
                  alt={item.alt}
                  loading="lazy"
                  className="h-52 w-full object-cover sm:h-64 lg:h-72"
                  initial={{ scale: reduce ? 1 : 1.1, clipPath: 'inset(0 0 100% 0)' }}
                  whileInView={{ scale: 1, clipPath: 'inset(0 0 0% 0)' }}
                  viewport={{ once: true }}
                  transition={{ duration: reduce ? 0 : 1, delay: reduce ? 0 : 0.06 * i, ease: EASE }}
                />
              </Reveal>
            ))}
          </div>

          <div className="lg:col-span-6 lg:pt-6">
            {company.about.map((paragraph, i) => (
              <Reveal
                key={paragraph.slice(0, 24)}
                as="p"
                delay={0.05 * i}
                className="mb-6 text-base leading-relaxed text-charcoal/75 last:mb-0"
              >
                {paragraph}
              </Reveal>
            ))}

            <Reveal delay={0.15} className="mt-10">
              <p className="kicker mb-4">Sectors we serve</p>
              <div className="flex flex-wrap gap-2">
                {company.sectors.map((sector) => (
                  <Pill key={sector}>{sector}</Pill>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2} className="mt-10">
              <p className="kicker mb-4">Disciplines</p>
              <ul className="divide-y divide-bone border-y border-bone">
                {company.disciplines.map((discipline) => (
                  <li key={discipline} className="py-3.5 text-sm text-charcoal/80">
                    {discipline}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <WhyChooseUs className="border-y border-bone" />

      {/* Slide 16 — "Our Promise" */}
      <section className="bg-cream">
        <div className="container-page py-24 text-center lg:py-32">
          <Reveal as="p" className="kicker">
            Our promise
          </Reveal>

          {company.promise.map((line, i) => (
            <Reveal
              key={line.slice(0, 24)}
              as="p"
              delay={0.08 * (i + 1)}
              className={
                i === 0
                  ? 'display-xl mx-auto mt-6 max-w-4xl text-2xl sm:text-3xl lg:text-[2.25rem]'
                  : 'mx-auto mt-8 max-w-2xl text-base leading-relaxed text-charcoal/70'
              }
            >
              {line}
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand tone="charcoal" />
    </>
  )
}
