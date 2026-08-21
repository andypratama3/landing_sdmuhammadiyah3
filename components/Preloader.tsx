"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Book, PenTool, Star, School, Sparkles, GraduationCap, Globe } from "lucide-react"

export default function Preloader() {
    const [isVisible, setIsVisible] = useState(true)
    const [radius, setRadius] = useState(130)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        if (typeof window !== "undefined" && window.innerWidth < 768) {
            setRadius(100)
        }
        // Much shorter duration for a snappier feel
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, 1800) 

        return () => clearTimeout(timer)
    }, [])

    if (!mounted) return null

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: "easeInOut" }
                    }}
                    className="fixed inset-0 z-[99999] flex items-center justify-center bg-background overflow-hidden"
                >
                    {/* 1. Initial Screen: Green Toska & Mode-aware Transition using CSS Variable */}
                    <motion.div
                        className="absolute inset-0 z-0 bg-[#33b962]"
                        initial={{ opacity: 1 }}
                        animate={{
                            backgroundColor: ["#33b962", "var(--background)"],
                        }}
                        transition={{ duration: 2, times: [0, 1], ease: "easeInOut" }}
                    />

                    {/* 2. Particles: Life-like Light Particles */}
                    <div className="absolute inset-0 z-1 pointer-events-none">
                        {[...Array(40)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-[#33b962]/40 dark:bg-emerald-400/40 rounded-full blur-[1px]"
                                initial={{
                                    x: "50%",
                                    y: "50%",
                                    opacity: 0,
                                    scale: 0
                                }}
                                animate={{
                                    x: `${Math.random() * 100}%`,
                                    y: `${Math.random() * 100}%`,
                                    opacity: [0, 0.8, 0],
                                    scale: [0, Math.random() * 2 + 1, 0],
                                }}
                                transition={{
                                    duration: 4 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </div>

                    <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-6">
                        {/* 3. Islamic Geometric Portal */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                            className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center"
                        >
                            <motion.svg
                                viewBox="0 0 100 100"
                                className="absolute inset-0 w-full h-full text-[#33b962]/10 dark:text-emerald-400/10"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            >
                                <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
                                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.2" />
                                {[...Array(12)].map((_, i) => (
                                    <circle
                                        key={i}
                                        cx={50 + 49 * Math.cos((i * 30 * Math.PI) / 180)}
                                        cy={50 + 49 * Math.sin((i * 30 * Math.PI) / 180)}
                                        r="0.8"
                                        fill="currentColor"
                                    />
                                ))}
                            </motion.svg>

                            <motion.div
                                className="absolute inset-[10%]"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            >
                                <svg viewBox="0 0 100 100" className="w-full h-full text-[#33b962] dark:text-emerald-400">
                                    <defs>
                                        <filter id="portal-glow" x="-20%" y="-20%" width="140%" height="140%">
                                            <feGaussianBlur stdDeviation="3" result="blur" />
                                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                        </filter>
                                    </defs>
                                    <motion.path
                                        d="M50 0 L61.7 38.3 L100 50 L61.7 61.7 L50 100 L38.3 61.7 L0 50 L38.3 38.3 Z"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        filter="url(#portal-glow)"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
                                    />
                                    <motion.path
                                        d="M50 20 L57 43 L80 50 L57 57 L50 80 L43 57 L20 50 L43 43 Z"
                                        fill="currentColor"
                                        fillOpacity="0.05"
                                        stroke="currentColor"
                                        strokeWidth="0.5"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 1.5, delay: 1.5 }}
                                    />
                                </svg>
                            </motion.div>

                            <div className="absolute inset-0 flex items-center justify-center">
                            {/* Outer Pulsing Aura */}
                            <motion.div
                                className="absolute inset-0 rounded-full bg-[#33b962]/10 dark:bg-emerald-400/10 blur-xl"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 0.8, 0.5]
                                }}
                                transition={{
                                    duration: 1.8,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />

                            {/* Center Main Icon */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                                className="relative z-10 p-5 bg-card rounded-full shadow-2xl border-4 border-[#33b962]/10 dark:border-emerald-400/10"
                            >
                                <Sparkles className="w-10 h-10 md:w-14 md:h-14 text-[#33b962] dark:text-emerald-400" />
                            </motion.div>
                        </motion.div>

                        <div className="mt-8 md:mt-12 space-y-4 text-center">
                            <div className="overflow-hidden">
                                <motion.h1
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-3xl md:text-5xl font-black text-[#33b962] dark:text-emerald-400 tracking-tight font-outfit"
                                >
                                    SD MUHAMMADIYAH 3
                                </motion.h1>
                            </div>

                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.6, duration: 0.6, ease: "circOut" }}
                                className="h-[3px] w-40 bg-gradient-to-r from-transparent via-[#ffd166] to-transparent mx-auto"
                            />

                            <div className="overflow-hidden">
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
                                    className="text-muted-foreground font-medium text-base md:text-lg font-quicksand"
                                >
                                    Mencetak Generasi Islami dan Berprestasi
                                </motion.p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
