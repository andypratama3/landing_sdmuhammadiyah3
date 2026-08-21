'use client'

import React from 'react'
import DOMPurify from 'dompurify'
import { cleanRichText } from '@/lib/html-sanitizer'

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
  const cleanHtml = DOMPurify.sanitize(cleanRichText(htmlContent), {
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
      className={`prose prose-lg max-w-none ${className} [&_img]:max-w-full [&_img]:h-auto [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_pre]:overflow-x-auto [&_code]:break-words [&_iframe]:max-w-full [&_video]:max-w-full`}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
      suppressHydrationWarning
    />
  )
}