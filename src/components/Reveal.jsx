import { motion, useReducedMotion } from 'motion/react'

export const EASE = [0.22, 1, 0.36, 1]

/**
 * Scroll-triggered fade + rise. Used in place of repeating variants on every
 * section. Pass `stagger` to have direct children animate in sequence — the
 * children then need to be <Reveal.Item> (or any motion element using
 * `itemVariants`).
 */
export default function Reveal({
  as = 'div',
  delay = 0,
  y = 24,
  duration = 0.65,
  once = true,
  className,
  children,
  ...rest
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -10% 0px' }}
      transition={{ duration: reduce ? 0 : duration, delay: reduce ? 0 : delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Container that staggers its children on view. */
export function RevealGroup({ as = 'div', stagger = 0.08, delay = 0, className, children, ...rest }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduce ? 0 : stagger,
            delayChildren: reduce ? 0 : delay,
          },
        },
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Child of RevealGroup. */
export function RevealItem({ as = 'div', y = 24, className, children, ...rest }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: reduce ? 0 : 0.6, ease: EASE },
        },
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
