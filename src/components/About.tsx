import { Reveal } from './Reveal'

const facts = [
  { label: 'Legal entity', value: 'Dascon Sourav Commercial Private Limited' },
  { label: 'CIN', value: 'U51909WB2008PTC124583' },
  { label: 'Status', value: 'Active · RoC Kolkata' },
  { label: 'Incorporated', value: '28 March 2008' },
  { label: 'Registered office', value: 'Kalindi, Kolkata, West Bengal 700048' },
  {
    label: 'Directors',
    value: 'Sumanta Das · Suvam Maji · Nilima Maji',
  },
  { label: 'Nature of business', value: 'Construction service provider' },
  { label: 'GSTIN', value: '19AALCS8129G1ZW' },
  { label: 'IEC', value: '0215018711' },
]

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-paper py-24 md:py-32">
      <div className="texture-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="section-pad relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.18em] text-moss-deep uppercase">
              About
            </p>
            <h2 className="font-display mt-4 max-w-xl text-4xl leading-[1.05] font-bold tracking-tight text-ink md:text-5xl">
              A Kolkata construction partner with measured delivery.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-steel md:text-lg">
              Dascon Sourav Commercial Private Limited is an active private limited
              company incorporated in 2008 and registered with RoC Kolkata. The
              firm provides construction services for commercial flats, residential
              buildings, industrial sheds, hotels, malls, schools, and colleges —
              with building construction material support when a project needs it.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-steel md:text-lg">
              The work is grounded in West Bengal: clear scope, site discipline,
              and communication that keeps owners, consultants, and trades aligned
              from excavation through handover.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="self-end">
          <dl className="border-t border-line divide-y divide-line">
            {facts.map((row) => (
              <div
                key={row.label}
                className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
              >
                <dt className="text-sm text-steel">{row.label}</dt>
                <dd className="text-sm font-medium text-ink md:text-base">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
