/**
 * The mark pairs the two halves of the business: a bolt for the electrical
 * contracting, a wave beneath it for the spa, steam and pool work. Drawn on the
 * deck's palette — charcoal tile, cream glyph — and flipped for dark surfaces.
 */
export function LogoMark({ className = 'h-10 w-10', tone = 'light' }) {
  const onDark = tone === 'dark'

  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <rect
        width="48"
        height="48"
        rx="13"
        className={onDark ? 'fill-cream' : 'fill-charcoal'}
      />
      <path
        d="M25.5 8 L13.5 22 H24 L23 31 L34.5 17.5 H24 Z"
        className={onDark ? 'fill-charcoal' : 'fill-white'}
      />
      <path
        d="M13.5 38 q 2.6 -3 5.2 0 t 5.2 0 t 5.2 0 t 5.2 0"
        fill="none"
        strokeWidth="2.2"
        strokeLinecap="round"
        className={onDark ? 'stroke-charcoal' : 'stroke-cream'}
      />
    </svg>
  )
}

/**
 * Mark + wordmark lockup, used in the header and footer.
 */
export default function Logo({ tone = 'light', className = '', markClassName = 'h-11 w-11' }) {
  const onDark = tone === 'dark'

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark tone={tone} className={markClassName} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-semibold tracking-tight">YASH</span>
        <span
          className={`mt-1 text-[0.6rem] font-medium tracking-[0.16em] ${
            onDark ? 'text-white/60' : 'text-charcoal/60'
          }`}
        >
          ELECTRICALS &amp; SPA SYSTEMS
        </span>
      </span>
    </span>
  )
}
