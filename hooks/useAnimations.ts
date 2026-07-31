'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// iOS 2026-style animation configurations
export const iosAnimationConfig = {
  // Smooth spring physics like iOS
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  },
  // Smooth ease for general transitions
  smooth: {
    ease: 'power3.out',
    duration: 0.6,
  },
  // Quick snappy transitions
  snappy: {
    ease: 'power2.out',
    duration: 0.3,
  },
  // Slow elegant reveals
  elegant: {
    ease: 'expo.out',
    duration: 1,
  },
}

// Hook for fade-in-up animation (iOS style)
export function useFadeInUp(delay = 0) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(
      ref.current,
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
        delay,
        ease: 'power3.out',
      }
    )
  }, [delay])

  return ref
}

// Hook for stagger animation on children
export function useStaggerAnimation(selector = '.animate-item', delay = 0.1) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const items = containerRef.current.querySelectorAll(selector)
    
    gsap.fromTo(
      items,
      {
        opacity: 0,
        y: 20,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: delay,
        ease: 'power2.out',
        delay: 0.2,
      }
    )
  }, [selector, delay])

  return containerRef
}

// Hook for scroll-triggered animations
export function useScrollAnimation(
  trigger: string,
  animation: gsap.TweenVars,
  options?: ScrollTrigger.Vars
) {
  useEffect(() => {
    const elements = document.querySelectorAll(trigger)
    
    elements.forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ...animation,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            ...options,
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [trigger, animation, options])
}

// Hook for parallax effect
export function useParallax(speed = 0.5) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * speed
      
      gsap.to(ref.current, {
        y: rate,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return ref
}

// Hook for magnetic button effect (iOS style)
export function useMagneticButton(strength = 0.3) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])

  return ref
}

// Hook for animated counter
export function useAnimatedCounter(end: number, duration = 2) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const obj = { value: 0 }

    gsap.to(obj, {
      value: end,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.round(obj.value).toLocaleString()
        }
      },
    })
  }, [end, duration])

  return ref
}

// Hook for scale-on-hover effect
export function useScaleHover(scale = 1.05) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [scale])

  return ref
}

// Hook for text reveal animation (iOS style)
export function useTextReveal(delay = 0) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const text = ref.current.textContent || ''
    ref.current.innerHTML = ''

    // Split text into words
    const words = text.split(' ')
    words.forEach((word, index) => {
      const span = document.createElement('span')
      span.textContent = word + ' '
      span.style.display = 'inline-block'
      span.style.opacity = '0'
      span.style.transform = 'translateY(20px)'
      ref.current?.appendChild(span)
    })

    const spans = ref.current.querySelectorAll('span')
    
    gsap.to(spans, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.05,
      delay,
      ease: 'power2.out',
    })
  }, [delay])

  return ref
}

// Hook for 3D tilt effect (iOS style)
export function useTiltEffect(maxRotation = 10) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -maxRotation
      const rotateY = ((x - centerX) / centerX) * maxRotation

      gsap.to(element, {
        rotateX,
        rotateY,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000,
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [maxRotation])

  return ref
}

// Hook for smooth page transition
export function usePageTransition() {
  useEffect(() => {
    // Fade in on mount
    gsap.fromTo(
      'body',
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    )

    return () => {
      // Fade out on unmount
      gsap.to('body', {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      })
    }
  }, [])
}

// Hook for floating animation
export function useFloatingAnimation(duration = 3, distance = 10) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.to(ref.current, {
      y: distance,
      duration,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [duration, distance])

  return ref
}

// Hook for pulse animation
export function usePulseAnimation(scale = 1.05, duration = 2) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.to(ref.current, {
      scale,
      duration,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [scale, duration])

  return ref
}
