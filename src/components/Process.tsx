import processImage from '../assets/process.jpg'
import { Reveal } from './Reveal'

const steps = [
  {
    title: 'Brief & site review',
    body: 'We align on programme, constraints, and site conditions before drawings harden into commitments.',
  },
  {
    title: 'Scoped execution plan',
    body: 'Sequencing, trades, and materials are set so progress on site stays readable to every stakeholder.',
  },
  {
    title: 'Controlled construction',
    body: 'Day-to-day site management keeps quality, safety, and schedule visible — not buried in site noise.',
  },
  {
    title: 'Handover ready',
    body: 'Snagging, documentation, and close-out so the finished building is usable without lingering loose ends.',
  },
]

export function Process() {
  return (
    <section id="process" className="bg-mist py-24 md:py-32">
      <div className="section-pad mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="text-sm font-semibold tracking-[0.18em] text-moss-deep uppercase">
                Why Dascon
              </p>
              <h2 className="font-display mt-4 text-4xl leading-[1.05] font-bold tracking-tight text-ink md:text-5xl">
                A process that keeps structure ahead of surprise.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-steel md:text-lg">
                Construction succeeds when decisions arrive early and stay
                coherent. Dascon Sourav Commercial works as a service provider —
                coordinating the build so owners see progress they can trust,
                not activity without direction.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <figure className="mt-10 overflow-hidden">
                <img
                  src={processImage}
                  alt="Concrete structure under construction with scaffolding"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </figure>
            </Reveal>
          </div>

          <ol className="space-y-0">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={0.08 * index} as="li">
                <div className="grid gap-4 border-t border-line py-8 sm:grid-cols-[4.5rem_1fr] sm:gap-8 md:py-10">
                  <span className="font-display text-3xl font-bold text-moss-deep/70">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-base leading-relaxed text-steel">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
