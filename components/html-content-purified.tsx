'use client'

import React from 'react'
import DOMPurify from 'dompurify'

interface HtmlContentPurifiedProps {
  content: string | null | undefined
  className?: string
}

export function HtmlContentPurified({ content, className = '' }: HtmlContentPurifiedProps) {
  if (!content) {
    return null
  }

  const htmlContent = typeof content === 'string' ? content : ''

  if (!htmlContent) {
    return null
  }

  // Sanitize HTML dengan DOMPurify
  const cleanHtml = DOMPurify.sanitize(htmlContent, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre', 'hr',
      'div', 'span', 'table', 'thead', 'tbody', 'tr', 'td', 'th'
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'src', 'alt', 'width', 'height',
      'class', 'style', 'title'
    ]
  })

  return (
    <div
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
      suppressHydrationWarning
    />
  )
}