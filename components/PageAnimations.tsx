'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
// Elemen opsional (mis. .ribbon-badge) boleh tidak ada di halaman tertentu
gsap.config({ nullTargetWarn: false })

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const ANIMATED_CHILD_SELECTOR =
  '.page-card, .page-list-item, .page-section, .page-image, .page-button, .page-tilt-card, .page-stat-number, .stat-card, .program-card, .achievement-card, .gallery-card, .partner-logo, .accreditation-card, .quick-link-card, .ribbon-badge, .hero-title, .hero-description, .hero-logo, .hero-badge, .video-container, .about-content, .cta-content'

const toArray = (selector: string) => gsap.utils.toArray<HTMLElement>(selector)

export default function PageAnimations() {
  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return

    const tiltListeners: Array<{
      el: HTMLElement
      onMove: (e: MouseEvent) => void
      onLeave: () => void
    }> = []

    const ctx = gsap.context(() => {
      const sections = toArray('main section')

      // ---- Hero entrance (pages using page-hero-* classes) ----
      const heroBadges = toArray('.page-hero-badge')
      if (heroBadges.length) {
        gsap.fromTo(
          heroBadges,
          { opacity: 0, y: -20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
        )
      }

      const heroTitles = toArray('.page-hero-title')
      if (heroTitles.length) {
        gsap.fromTo(
          heroTitles,
          { opacity: 0, y: 40, skewY: 3 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
        )
      }

      const heroDescriptions = toArray('.page-hero-description')
      if (heroDescriptions.length) {
        gsap.fromTo(
          heroDescriptions,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: 'power2.out' }
        )
      }

      // ---- Generic hero entrance fallback (pages without page-hero-* classes) ----
      const hero = sections[0]
      if (hero && !hero.querySelector('.page-hero-title')) {
        gsap.fromTo(
          hero.children,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.14, ease: 'power3.out' }
        )
      }

      // ---- Group animated children by their container for per-container stagger ----
      const groupByContainer = (selector: string) => {
        const groups = new Map<Element, HTMLElement[]>()
        toArray(selector).forEach((el) => {
          const container =
            el.closest('.page-cards-container, .page-list-container') ?? el.parentElement
          if (!container) return
          if (!groups.has(container)) groups.set(container, [])
          groups.get(container)!.push(el)
        })
        return groups
      }

      // Card stagger animations
      groupByContainer('.page-card').forEach((cards, container) => {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      // List item stagger animations
      groupByContainer('.page-list-item').forEach((items, container) => {
        gsap.fromTo(
          items,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      // Section animations
      const sectionsAnimated = toArray('.page-section')
      if (sectionsAnimated.length) {
        gsap.fromTo(
          sectionsAnimated,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionsAnimated,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Image animations
      const images = toArray('.page-image')
      if (images.length) {
        gsap.fromTo(
          images,
          { opacity: 0, scale: 0.9, rotation: -2 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: images,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Button animations
      const buttons = toArray('.page-button')
      if (buttons.length) {
        gsap.fromTo(
          buttons,
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: buttons,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Generic section reveal — covers sections without specific animated
      // children (including dynamically loaded content; children are queried
      // when the trigger fires, so async-rendered cards animate too).
      sections.forEach((section, index) => {
        if (index === 0) return
        if (section.querySelector(ANIMATED_CHILD_SELECTOR)) return
        ScrollTrigger.create({
          trigger: section,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              section.children,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' }
            )
          },
        })
      })

      // Stat counter animations
      const statNumbers = toArray('.page-stat-number')
      statNumbers.forEach((stat) => {
        const targetValue = parseFloat(stat.textContent?.replace(/[^0-9.]/g, '') || '0')
        const obj = { value: 0 }

        gsap.to(obj, {
          value: targetValue,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stat,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: () => {
            stat.textContent = Math.round(obj.value).toLocaleString()
          },
        })
      })

      // 3D tilt effect on cards
      toArray('.page-tilt-card').forEach((card) => {
        const el = card as HTMLElement
        const onMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          gsap.to(el, {
            rotateX: ((y - rect.height / 2) / rect.height) * -8,
            rotateY: ((x - rect.width / 2) / rect.width) * 8,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 1000,
          })
        }
        const onLeave = () => {
          gsap.to(el, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
          })
        }
        el.addEventListener('mousemove', onMove)
        el.addEventListener('mouseleave', onLeave)
        tiltListeners.push({ el, onMove, onLeave })
      })
    })

    // Refresh trigger positions once assets finish loading so reveal start
    // points stay accurate after images/layout settle.
    const onLoad = () => ScrollTrigger.refresh()
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 500)
    window.addEventListener('load', onLoad)

    // Cleanup
    return () => {
      window.removeEventListener('load', onLoad)
      window.clearTimeout(refreshTimer)
      tiltListeners.forEach(({ el, onMove, onLeave }) => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      })
      ctx.revert()
    }
  }, [])

  return null
}
