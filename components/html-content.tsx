
'use client'

import React from 'react'

interface HtmlContentProps {
  content: string | null | undefined
  className?: string
}

export function HtmlContent({ content, className = '' }: HtmlContentProps) {
  if (!content) {
    return null
  }

  // Ensure it's a string
  const htmlContent = typeof content === 'string' ? content : ''

  if (!htmlContent) {
    return null
  }

  return (
    <div
      className={`prose prose-lg max-w-none ${className} [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-xl [&_img]:shadow-lg [&_p]:my-4`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      suppressHydrationWarning
    />
  )
}