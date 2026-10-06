"use client"

import { useEffect, useRef, useState } from "react"

interface OrgChartScalerProps {
  children: React.ReactNode
}

export function OrgChartScaler({ children }: OrgChartScalerProps) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [height, setHeight] = useState<number | undefined>(undefined)

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    const update = () => {
      const prev = inner.style.transform
      inner.style.transform = "none"
      const naturalWidth = inner.scrollWidth
      const naturalHeight = inner.scrollHeight
      inner.style.transform = prev

      const available = outer.clientWidth
      const nextScale = naturalWidth > 0 ? Math.min(1, available / naturalWidth) : 1

      setScale(nextScale)
      setHeight(naturalHeight * nextScale)
    }

    update()

    const observer = new ResizeObserver(update)
    observer.observe(outer)
    observer.observe(inner)
    window.addEventListener("resize", update)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <div
      ref={outerRef}
      className="flex w-full justify-center overflow-hidden"
      style={{ height }}
    >
      <div
        ref={innerRef}
        className="w-max shrink-0"
        style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
      >
        {children}
      </div>
    </div>
  )
}