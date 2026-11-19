import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import heroImage from '../assets/hero.jpg'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18])

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-ink text-paper"
    >
      <motion.div
        className="absolute inset-0"
        style={reduceMotion ? undefined : { y: imageY, scale: imageScale }}
      >
        <img
          src={heroImage}
          alt="Construction crew at work on an active building site"
          className="h-full w-full object-cover object-[center_35%]"
          fetchPriority="high"
        />
      </motion.div>

      <div className="hero-scrim absolute inset-0" aria-hidden />

      <div className="section-pad relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end pb-16 pt-28 md:justify-center md:pb-24 md:pt-32">
        <div className="max-w-3xl">
          <motion.p
            className="font-display mb-5 text-sm font-semibold tracking-[0.22em] text-stone uppercase md:text-base"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            Dascon Sourav Commercial
          </motion.p>

          <motion.h1
            className="font-display text-[clamp(2.6rem,8vw,5.75rem)] leading-[0.95] font-extrabold tracking-tight"
            initial={reduceMotion ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
          >
            Built for lasting structure.
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-stone/90 md:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          >
            Construction services across commercial, residential, industrial, and
            institutional projects — delivered from Kolkata by a company
            incorporated in 2008.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
          >
            <a
              href="#contact"
              className="bg-paper px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-stone"
            >
              Discuss your site
            </a>
            <a
              href="#services"
              className="border border-paper/40 px-6 py-3.5 text-sm font-semibold text-paper transition hover:border-paper hover:bg-paper/10"
            >
              View services
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
