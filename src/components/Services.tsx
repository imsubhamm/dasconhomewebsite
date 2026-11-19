import { motion, useReducedMotion } from 'framer-motion'
import { Reveal } from './Reveal'

const services = [
  {
    title: 'Commercial flats',
    body: 'Multi-unit commercial flat construction with coordinated structural, MEP, and finishing sequences.',
  },
  {
    title: 'Residential buildings',
    body: 'Homes and residential blocks planned for constructability, safety, and durable finishes.',
  },
  {
    title: 'Industrial sheds',
    body: 'Shed and industrial envelopes built for clear spans, loading access, and operational flow.',
  },
  {
    title: 'Hotels & hospitality',
    body: 'Hotel building construction that respects programme density, back-of-house logistics, and guest zones.',
  },
  {
    title: 'Malls & retail',
    body: 'Mall and retail shells delivered with attention to circulation, frontage, and service corridors.',
  },
  {
    title: 'Schools & colleges',
    body: 'Institutional campuses and academic buildings shaped around occupancy, access, and long-term use.',
  },
  {
    title: 'Material services',
    body: 'Building construction material support when procurement needs to move in step with site progress.',
  },
]

export function Services() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="services" className="bg-ink py-24 text-paper md:py-32">
      <div className="section-pad mx-auto max-w-7xl">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.18em] text-moss uppercase">
            Services
          </p>
          <h2 className="font-display mt-4 max-w-2xl text-4xl leading-[1.05] font-bold tracking-tight md:text-5xl">
            Construction scopes we take from brief to built form.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone/80 md:text-lg">
            One provider for the building types listed on IndiaMART — commercial,
            residential, industrial, hospitality, retail, and institutional work.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-px bg-ink-soft/80 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.li
              key={service.title}
              className="bg-ink p-7 md:p-8"
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.55,
                delay: reduceMotion ? 0 : index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="font-display text-xs tracking-[0.2em] text-moss uppercase">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display mt-4 text-2xl font-bold tracking-tight">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone/75 md:text-base">
                {service.body}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
