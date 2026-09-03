import { Link } from 'react-router-dom'

/** Cream chip — the tag treatment used on the steam and jacuzzi slides. */
export function Pill({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-cream px-4 py-2 text-sm font-medium text-charcoal ${className}`}
    >
      {children}
    </span>
  )
}

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300'

const variants = {
  solid: 'bg-charcoal text-white hover:bg-charcoal/85',
  outline: 'border border-charcoal/25 text-charcoal hover:border-charcoal hover:bg-charcoal/5',
  cream: 'bg-cream text-charcoal hover:bg-cream/80',
  ghostOnDark: 'border border-white/25 text-white hover:border-white hover:bg-white/10',
}

/**
 * One button that renders as a router <Link>, an <a> for external/tel/mailto
 * targets, or a plain <button>, depending on the props it gets.
 */
export function Button({ to, href, variant = 'solid', className = '', children, ...rest }) {
  const cls = `${base} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
        <Arrow />
      </Link>
    )
  }

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        {...rest}
      >
        {children}
        <Arrow />
      </a>
    )
  }

  return (
    <button type="button" className={cls} {...rest}>
      {children}
      <Arrow />
    </button>
  )
}

function Arrow() {
  return (
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
  )
}

/** Full-width rule matching the hairline dividers in the deck. */
export function Rule({ className = '' }) {
  return <div className={`h-px w-full bg-bone ${className}`} />
}
