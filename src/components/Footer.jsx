import { Link } from 'react-router-dom'
import Logo from './Logo'
import { company } from '../data/company'
import { services } from '../data/services'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo tone="dark" markClassName="h-12 w-12" />
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/60">
              Complete electrical contracting and luxury wellness solutions for residential,
              commercial, hospitality and wellness projects.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-3 gap-y-2 text-xs text-white/40">
              {company.disciplines.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <p className="text-[0.65rem] font-medium tracking-[0.18em] text-white/40">SERVICES</p>
            <ul className="mt-6 space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[0.65rem] font-medium tracking-[0.18em] text-white/40">CONTACT</p>
            <ul className="mt-6 space-y-3 text-sm text-white/70">
              <li>
                <a href={company.tel} className="transition-colors hover:text-white">
                  {company.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={company.mailto} className="break-all transition-colors hover:text-white">
                  {company.email}
                </a>
              </li>
              <li>
                <a
                  href={company.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
              <li className="pt-2 text-white/50">{company.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p>Mahim, Mumbai</p>
        </div>
      </div>
    </footer>
  )
}
