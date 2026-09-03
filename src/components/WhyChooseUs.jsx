import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import SectionHeading from './SectionHeading'
import AnimatedIcon from './AnimatedIcon'
import { RevealGroup, RevealItem } from './Reveal'
import { whyChooseUs } from '../data/whyChooseUs'

/** Ticks the item's index up to its value when it scrolls into view. */
function CountUp({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, value, {
      duration: 0.8,
      ease: 'easeOut',
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, value])

  return (
    <span ref={ref} className="block text-xs font-medium tracking-[0.18em] text-charcoal/35">
      {String(n).padStart(2, '0')}
    </span>
  )
}

export default function WhyChooseUs({ className = '' }) {
  return (
    <section className={`container-page py-24 lg:py-32 ${className}`}>
      <SectionHeading
        kicker="Why choose us"
        title="Built on craftsmanship, delivered on time"
        intro="Six reasons clients keep coming back to us for their wellness and electrical projects."
      />

      <RevealGroup className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {whyChooseUs.map((item, i) => (
          <RevealItem key={item.icon} className="group">
            <CountUp value={i + 1} />
            <div className="mt-6">
              <AnimatedIcon name={item.icon} className="h-10 w-10 text-charcoal" />
            </div>
            <h3 className="mt-6 font-display text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/65">{item.text}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}
