
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
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      suppressHydrationWarning
    />
  )
}