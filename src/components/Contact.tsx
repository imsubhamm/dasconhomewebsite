import { useState } from 'react'
import type { FormEvent } from 'react'
import { Reveal } from './Reveal'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const project = String(data.get('project') || '').trim()
    const message = String(data.get('message') || '').trim()

    if (!name || !email || !message) {
      setStatus('error')
      return
    }

    setStatus('sending')

    const subject = encodeURIComponent(
      `Project inquiry from ${name}${project ? ` — ${project}` : ''}`,
    )
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject type: ${project || 'Not specified'}\n\n${message}`,
    )

    window.location.href = `mailto:dscplkolkata@gmail.com?subject=${subject}&body=${body}`
    window.setTimeout(() => {
      setStatus('sent')
      form.reset()
    }, 400)
  }

  return (
    <section id="contact" className="bg-paper py-24 md:py-32">
      <div className="section-pad mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.18em] text-moss-deep uppercase">
              Contact
            </p>
            <h2 className="font-display mt-4 text-4xl leading-[1.05] font-bold tracking-tight text-ink md:text-5xl">
              Tell us about the building you need.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-steel md:text-lg">
              Share a short brief and we will follow up from Kolkata. For an
              immediate note, write to the company inbox below.
            </p>
          </Reveal>

          <Reveal delay={0.16} className="mt-10 space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-steel uppercase">
                Registered office
              </p>
              <p className="mt-2 max-w-sm text-base leading-relaxed text-ink">
                Twin Tower, 289 Swamiji Sarani, Block B, 2nd Floor, Kalindi,
                Kolkata, West Bengal 700048
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-steel uppercase">
                Email
              </p>
              <a
                href="mailto:dscplkolkata@gmail.com"
                className="mt-2 inline-block text-base font-medium text-ink underline-offset-4 hover:underline"
              >
                dscplkolkata@gmail.com
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-steel uppercase">
                Directors
              </p>
              <p className="mt-2 text-base leading-relaxed text-ink">
                Sumanta Das · Suvam Maji · Nilima Maji
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-steel uppercase">
                CIN
              </p>
              <p className="mt-2 text-base text-ink">U51909WB2008PTC124583</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <form
            onSubmit={onSubmit}
            className="border border-line bg-mist/60 p-6 md:p-8"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block sm:col-span-1">
                <span className="text-xs font-semibold tracking-[0.14em] text-steel uppercase">
                  Name
                </span>
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="mt-2 w-full border border-line bg-paper px-3 py-3 text-sm outline-none transition focus:border-ink"
                />
              </label>
              <label className="block sm:col-span-1">
                <span className="text-xs font-semibold tracking-[0.14em] text-steel uppercase">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-2 w-full border border-line bg-paper px-3 py-3 text-sm outline-none transition focus:border-ink"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-semibold tracking-[0.14em] text-steel uppercase">
                  Project type
                </span>
                <select
                  name="project"
                  className="mt-2 w-full border border-line bg-paper px-3 py-3 text-sm outline-none transition focus:border-ink"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option>Commercial flats</option>
                  <option>Residential building</option>
                  <option>Industrial shed</option>
                  <option>Hotel</option>
                  <option>Mall / retail</option>
                  <option>School / college</option>
                  <option>Material services</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-semibold tracking-[0.14em] text-steel uppercase">
                  Message
                </span>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="mt-2 w-full resize-y border border-line bg-paper px-3 py-3 text-sm outline-none transition focus:border-ink"
                  placeholder="Location, approximate scale, and timeline"
                />
              </label>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition hover:bg-ink-soft disabled:opacity-60"
              >
                {status === 'sending' ? 'Opening mail…' : 'Send inquiry'}
              </button>
              {status === 'sent' && (
                <p className="text-sm text-moss-deep" role="status">
                  Your mail client should open with the inquiry drafted.
                </p>
              )}
              {status === 'error' && (
                <p className="text-sm text-red-700" role="alert">
                  Please add your name, email, and a short message.
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
