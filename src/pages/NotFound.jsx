import Reveal from '../components/Reveal'
import { Button } from '../components/ui'

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col justify-center py-24">
      <Reveal as="p" className="kicker">
        404
      </Reveal>
      <Reveal as="h1" delay={0.05} className="display-xl mt-5 text-4xl sm:text-5xl">
        This page could not be found
      </Reveal>
      <Reveal as="p" delay={0.1} className="mt-6 max-w-md text-base leading-relaxed text-charcoal/70">
        The link may be out of date. Head back to the homepage or browse what we do.
      </Reveal>
      <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
        <Button to="/">Back to home</Button>
        <Button to="/services" variant="outline">
          Our services
        </Button>
      </Reveal>
    </section>
  )
}
