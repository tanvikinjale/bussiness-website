import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import Reveal, { RevealGroup, EASE } from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import WhyChooseUs from '../components/WhyChooseUs'
import CTABand from '../components/CTABand'
import { Button, Pill } from '../components/ui'
import { company } from '../data/company'
import { services } from '../data/services'
import { gallery } from '../data/gallery'

/** Heading line that slides up from behind a mask. */
function MaskedLine({ children, delay = 0 }) {
  const reduce = useReducedMotion()
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: reduce ? 0 : '108%' }}
        animate={{ y: 0 }}
        transition={{ duration: reduce ? 0 : 0.95, delay: reduce ? 0 : delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // The image drifts slower than the page, and the copy lifts away as you leave.
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '16%'])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-24%'])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0])

  return (
    // -mt-20 pulls the section up under the fixed header, which sits transparent
    // over the photograph until the first scroll.
    <section
      ref={ref}
      className="relative -mt-20 flex min-h-[38rem] flex-col justify-end overflow-hidden bg-charcoal lg:min-h-screen"
    >
      <motion.img
        src="/images/hero.webp"
        alt="Luxury spa and pool interior installed by YASH Electricals & Spa Systems"
        className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover"
        style={{ y: imageY }}
        initial={{ scale: reduce ? 1 : 1.16, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: reduce ? 0 : 1.8, ease: EASE }}
      />

      {/* Two stacked scrims: one anchors the copy, one keeps the nav readable. */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/10" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-charcoal/70 to-transparent" />

      <motion.div
        className="relative container-page pt-36 pb-12 lg:pb-16"
        style={{ y: copyY, opacity: copyOpacity }}
      >
        <motion.p
          className="text-[0.6875rem] font-medium tracking-[0.18em] text-cream/70 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: reduce ? 0 : 0.35 }}
        >
          Mumbai · Electrical &amp; wellness systems
        </motion.p>

        <h1 className="display-xl mt-6 max-w-4xl text-[2.75rem] text-white sm:text-6xl lg:text-7xl xl:text-[5rem]">
          <MaskedLine delay={0.45}>{company.nameLines[0]}</MaskedLine>
          <MaskedLine delay={0.57}>{company.nameLines[1]}</MaskedLine>
        </h1>

        <motion.div
          className="mt-8 h-0.5 w-full max-w-md origin-left rounded-full bg-cream/50"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: reduce ? 0 : 1.1, delay: reduce ? 0 : 0.75, ease: EASE }}
        />

        <motion.p
          className="mt-8 max-w-xl text-base leading-relaxed text-white/75"
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: reduce ? 0 : 0.85, ease: EASE }}
        >
          Complete electrical contracting and luxury wellness solutions — designed, installed and
          maintained end to end.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: reduce ? 0 : 1, ease: EASE }}
        >
          <Button to="/services" variant="cream">
            Explore our services
          </Button>
          <Button to="/contact" variant="ghostOnDark">
            Talk to us
          </Button>
        </motion.div>
      </motion.div>

      {/* Discipline strip along the foot of the image. */}
      <motion.div
        className="relative border-t border-white/15"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: reduce ? 0 : 1.15 }}
      >
        <div className="container-page flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-5">
          <ul className="flex flex-wrap gap-x-6 gap-y-1 text-xs tracking-wide text-white/55">
            {company.disciplines.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <p className="text-xs text-white/45">
            <a href={company.tel} className="transition-colors hover:text-white">
              {company.phoneDisplay}
            </a>
            <span className="mx-2">·</span>
            {company.address}
          </p>
        </div>
      </motion.div>
    </section>
  )
}

function AboutTeaser() {
  return (
    <section className="container-page py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading kicker="About us" title="About Our Company" />
        </div>

        <div className="lg:col-span-7">
          {company.about.map((paragraph, i) => (
            <Reveal
              key={paragraph.slice(0, 24)}
              delay={0.05 * i}
              as="p"
              className="mb-6 text-base leading-relaxed text-charcoal/75 last:mb-0"
            >
              {paragraph}
            </Reveal>
          ))}

          <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-2">
            {company.sectors.map((sector) => (
              <Pill key={sector}>{sector}</Pill>
            ))}
          </Reveal>

          <Reveal delay={0.2} className="mt-10">
            <Button to="/about" variant="outline">
              More about us
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ServicesGrid() {
  return (
    <section className="border-y border-bone bg-white py-24 lg:py-32">
      <div className="container-page">
        <SectionHeading
          kicker="What we do"
          title="Our Services"
          intro="Seven disciplines under one roof, from luxury wellness installations to full-spectrum electrical contracting."
        />

        <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}

          <Reveal
            delay={0.1}
            className="flex flex-col justify-between rounded-2xl bg-cream p-8 sm:col-span-2 lg:col-span-1"
          >
            <p className="font-display text-xl font-semibold">
              Not sure which system fits your space?
            </p>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
              Tell us about the project and we will recommend the right setup.
            </p>
            <Link
              to="/contact"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium"
            >
              Talk to us
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
            </Link>
          </Reveal>
        </RevealGroup>
      </div>
    </section>
  )
}

function WorkStrip() {
  const preview = gallery.slice(0, 6)

  return (
    <section className="border-t border-bone bg-white py-24 lg:py-32">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading kicker="Our work" title="Recent installations" className="flex-1" />
          <Reveal delay={0.2}>
            <Button to="/gallery" variant="outline">
              View the gallery
            </Button>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((item) => (
            <Reveal key={item.id} className="group overflow-hidden rounded-xl bg-cream">
              <Link to="/gallery" aria-label={`${item.category} — view gallery`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.thumb}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <ServicesGrid />
      <WhyChooseUs className="border-b border-bone" />
      <WorkStrip />
      <CTABand tone="charcoal" />
    </>
  )
}
