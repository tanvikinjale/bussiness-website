import PageHero from '../components/PageHero'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import { Pill } from '../components/ui'
import { company } from '../data/company'
import { services } from '../data/services'

const channels = [
  {
    label: 'Call',
    value: company.phoneDisplay,
    href: company.tel,
    note: 'Speak to us directly about your project.',
    icon: (
      <path
        d="M4 3h3l1.5 4-2 1.5a10 10 0 005 5L13 11.5 17 13v3a1 1 0 01-1.1 1A14 14 0 013 4.1 1 1 0 014 3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: 'WhatsApp',
    value: 'Message us',
    href: company.whatsapp,
    note: 'Share photos or drawings of your space.',
    icon: (
      <path
        d="M10 3a7 7 0 00-6 10.6L3 17l3.5-1a7 7 0 103.5-13z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: 'Email',
    value: company.email,
    href: company.mailto,
    note: 'Send us a brief and we will respond with options.',
    icon: (
      <>
        <rect x="3" y="5" width="14" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M3.5 6l6.5 5 6.5-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </>
    ),
  },
]

export default function Contact() {
  return (
    <>
      <PageHero
        kicker="Get in touch"
        title="Let's talk about your project"
        intro="Steam, sauna, jacuzzi, pool, chilled shower or a complete electrical fit-out — tell us what you need and we will take it from there."
      />

      <section className="container-page py-20 lg:py-28">
        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {channels.map((channel) => (
            <RevealItem key={channel.label}>
              <a
                href={channel.href}
                {...(channel.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="group flex h-full flex-col rounded-2xl border border-bone p-8 transition-colors duration-300 hover:border-charcoal/40 hover:bg-cream/40"
              >
                <svg viewBox="0 0 20 20" className="h-6 w-6 text-charcoal" aria-hidden="true">
                  {channel.icon}
                </svg>
                <p className="kicker mt-8">{channel.label}</p>
                <p className="mt-3 font-display text-lg font-semibold break-all">{channel.value}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/60">{channel.note}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
                  {channel.label === 'Call' ? 'Call now' : `Open ${channel.label}`}
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
              </a>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-20 grid gap-12 border-t border-bone pt-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal as="p" className="kicker">
              Office
            </Reveal>
            <Reveal as="p" delay={0.05} className="mt-5 font-display text-2xl font-semibold">
              {company.address}
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-4 text-sm leading-relaxed text-charcoal/60">
              Projects delivered across residential, commercial, hospitality and wellness spaces.
            </Reveal>

            <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-2">
              {company.sectors.map((sector) => (
                <Pill key={sector}>{sector}</Pill>
              ))}
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal as="p" className="kicker">
              Enquire about
            </Reveal>
            <RevealGroup as="ul" stagger={0.05} className="mt-5 divide-y divide-bone border-y border-bone">
              {services.map((service) => (
                <RevealItem
                  as="li"
                  key={service.slug}
                  className="flex items-baseline justify-between gap-6 py-4"
                >
                  <span className="text-sm text-charcoal/80">{service.title}</span>
                  <a
                    href={company.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 text-xs tracking-[0.14em] text-charcoal/45 uppercase transition-colors hover:text-charcoal"
                  >
                    Enquire
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>
    </>
  )
}
