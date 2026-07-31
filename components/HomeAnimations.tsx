'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

const toArray = (selector: string) => gsap.utils.toArray<HTMLElement>(selector)

const fromTo = (selector: string, from: gsap.TweenVars, to: gsap.TweenVars) => {
  const targets = toArray(selector)
  if (!targets.length) return null
  return gsap.fromTo(targets, from, to)
}

export default function HomeAnimations() {
  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return

    const quickLinkListeners: Array<{
      el: HTMLElement
      onMove: (e: MouseEvent) => void
      onLeave: () => void
    }> = []

    const ctx = gsap.context(() => {
      // Hero section animations
      const heroTimeline = gsap.timeline()

      // Animate badges
      heroTimeline.fromTo(
        '.ribbon-badge',
        {
          opacity: 0,
          y: -30,
          scale: 0.8,
          rotation: -10,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'elastic.out(1, 0.5)',
        }
      )

      // Animate logo
      heroTimeline.fromTo(
        '.hero-logo',
        {
          opacity: 0,
          scale: 0.5,
          rotation: -180,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.3)',
        },
        '-=0.4'
      )

      // Animate badge
      heroTimeline.fromTo(
        '.hero-badge',
        {
          opacity: 0,
          scale: 0.8,
          y: -20,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
        },
        '-=0.6'
      )

      // Animate heading with text reveal
      heroTimeline.fromTo(
        '.hero-title',
        {
          opacity: 0,
          y: 50,
          skewY: 5,
        },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.4'
      )

      // Animate description
      heroTimeline.fromTo(
        '.hero-description',
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.5'
      )

      // Animate buttons with stagger
      heroTimeline.fromTo(
        '.hero-button',
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
        },
        '-=0.4'
      )

      // Stats section scroll animation
      fromTo(
        '.stat-card',
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-stats',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Animate stat numbers with counter effect
      const statNumbers = toArray('.stat-number')
      statNumbers.forEach((stat) => {
        const target = parseFloat(stat.textContent?.replace(/[^0-9.]/g, '') || '0')
        const obj = { value: 0 }

        gsap.to(obj, {
          value: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stat,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: () => {
            stat.textContent = Math.round(obj.value).toLocaleString() + '+'
          },
        })
      })

      // Programs section stagger animation
      fromTo(
        '.program-card',
        {
          opacity: 0,
          y: 50,
          rotationX: 15,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-programs',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Accreditation section animation
      fromTo(
        '.accreditation-card',
        {
          opacity: 0,
          scale: 0.8,
          rotation: -5,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: '.gsap-accreditation',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Quick links 3D tilt effect
      toArray('.quick-link-card').forEach((link) => {
        const onMove = (e: MouseEvent) => {
          const rect = link.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          const centerX = rect.width / 2
          const centerY = rect.height / 2
          const rotateX = ((y - centerY) / centerY) * -10
          const rotateY = ((x - centerX) / centerX) * 10

          gsap.to(link, {
            rotateX,
            rotateY,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 1000,
          })
        }

        const onLeave = () => {
          gsap.to(link, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
          })
        }

        link.addEventListener('mousemove', onMove)
        link.addEventListener('mouseleave', onLeave)
        quickLinkListeners.push({ el: link, onMove, onLeave })
      })

      // Gallery scroll animation
      fromTo(
        '.gallery-card',
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.gsap-gallery',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Video section animation
      fromTo(
        '.video-container',
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-video',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // About section animation
      fromTo(
        '.about-content',
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.gsap-about',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Achievements section animation
      fromTo(
        '.achievement-card',
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-achievements',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Partners section animation
      fromTo(
        '.partner-logo',
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.gsap-partners',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // CTA section animation
      fromTo(
        '.cta-content',
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-cta',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Parallax effect on background blobs
      if (toArray('.hero-blob-1').length) {
        gsap.to('.hero-blob-1', {
          y: -100,
          scrollTrigger: {
            trigger: '.gsap-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }

      if (toArray('.hero-blob-2').length) {
        gsap.to('.hero-blob-2', {
          y: 100,
          scrollTrigger: {
            trigger: '.gsap-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
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
      quickLinkListeners.forEach(({ el, onMove, onLeave }) => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      })
      ctx.revert()
    }
  }, [])

  return null
}
