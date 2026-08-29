"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// Elemen opsional (mis. .ribbon-badge) boleh tidak ada di halaman tertentu
gsap.config({ nullTargetWarn: false })

export default function GSAPAnimations() {
  useEffect(() => {
    // Wait for DOM to be ready
    const initAnimations = () => {
      // Hero Section - Parallax effect on scroll
      const heroSection = document.querySelector(".gsap-hero");
      if (heroSection) {
        gsap.fromTo(
          heroSection,
          {
            backgroundPositionY: "0%",
          },
          {
            backgroundPositionY: "50%",
            ease: "none",
            scrollTrigger: {
              trigger: heroSection,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Stats Section - Staggered fade in
      const statsSection = document.querySelector(".gsap-stats");
      if (statsSection) {
        const cards = statsSection.querySelectorAll(".medal-counter");
        gsap.fromTo(
          cards,
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsSection,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Programs Section - Cards slide in with scale
      const programsSection = document.querySelector(".gsap-programs");
      if (programsSection) {
        const cards = programsSection.querySelectorAll(".card-bento");
        gsap.fromTo(
          cards,
          {
            y: 80,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: programsSection,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Gallery Section - Fade in with scale
      const gallerySection = document.querySelector(".gsap-gallery");
      if (gallerySection) {
        const images = gallerySection.querySelectorAll("img");
        gsap.fromTo(
          images,
          {
            scale: 0.8,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gallerySection,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Achievements Section - Cards flip in
      const achievementsSection = document.querySelector(".gsap-achievements");
      if (achievementsSection) {
        const cards = achievementsSection.querySelectorAll(".card-premium");
        gsap.fromTo(
          cards,
          {
            rotationX: -90,
            opacity: 0,
            transformOrigin: "top center",
          },
          {
            rotationX: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: achievementsSection,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Awards Section - Scale up with bounce
      const awardsSection = document.querySelector(".gsap-awards");
      if (awardsSection) {
        const badges = awardsSection.querySelectorAll(".ribbon-badge");
        if (badges.length) gsap.fromTo(
          badges,
          {
            scale: 0,
            rotation: -180,
          },
          {
            scale: 1,
            rotation: 0,
            duration: 1,
            stagger: 0.3,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: awardsSection,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // CTA Section - Reveal from bottom
      const ctaSection = document.querySelector(".gsap-cta");
      if (ctaSection) {
        const content = ctaSection.children;
        gsap.fromTo(
          content,
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: ctaSection,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    };

    // Small delay to ensure DOM is ready
    const timeout = setTimeout(initAnimations, 100);

    // Cleanup
    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
