import Reveal from './Reveal'
import { Button } from './ui'
import { company } from '../data/company'

/**
 * Closing call-to-action. `tone="cream"` matches the pill colour from the deck,
 * `tone="charcoal"` inverts it for the end of a page.
 */
export default function CTABand({
  eyebrow = 'Get in touch',
  title = 'Planning a spa, pool or electrical project?',
  text = 'Tell us what you have in mind and we will take it from design through installation and maintenance.',
  tone = 'cream',
}) {
  const dark = tone === 'charcoal'

  return (
    <section className={dark ? 'bg-charcoal text-white' : 'bg-cream text-charcoal'}>
      <div className="container-page py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal as="p" className={`kicker ${dark ? 'text-white/50' : ''}`}>
              {eyebrow}
            </Reveal>
            <Reveal
              as="h2"
              delay={0.05}
              className="display-xl mt-4 text-3xl sm:text-4xl lg:text-[2.75rem]"
            >
              {title}
            </Reveal>
            <Reveal
              as="p"
              delay={0.1}
              className={`mt-6 max-w-xl text-base leading-relaxed ${dark ? 'text-white/65' : 'text-charcoal/70'}`}
            >
              {text}
            </Reveal>
          </div>

          <Reveal delay={0.15} className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <Button href={company.tel} variant={dark ? 'cream' : 'solid'}>
              Call {company.phoneDisplay}
            </Button>
            <Button href={company.whatsapp} variant={dark ? 'ghostOnDark' : 'outline'}>
              WhatsApp
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
