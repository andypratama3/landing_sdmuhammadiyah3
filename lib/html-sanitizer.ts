export function sanitizeHtml(html: string): string {
  if (!html) return ''
  
  // Whitelist tag yang aman
  const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
                       'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre', 'hr']
  
  const allowedAttributes = {
    'a': ['href', 'target', 'rel'],
    'img': ['src', 'alt', 'width', 'height', 'style'],
    '*': ['class', 'style']
  }

  // Create temporary DOM
  if (typeof window === 'undefined') {
    // Server-side fallback - return as is (Next.js server component)
    return html
  }

  const temp = document.createElement('div')
  temp.innerHTML = html

  // Sanitize function
  const sanitize = (node: Element) => {
    const nodesToRemove: Element[] = []

    // Iterate through all elements
    Array.from(node.querySelectorAll('*')).forEach((el) => {
      const tagName = el.tagName.toLowerCase()

      // Remove disallowed tags
      if (!allowedTags.includes(tagName)) {
        // Move content up
        while (el.firstChild) {
          el.parentNode?.insertBefore(el.firstChild, el)
        }
        nodesToRemove.push(el)
        return
      }

      // Remove disallowed attributes
      Array.from(el.attributes).forEach((attr) => {
        const attrName = attr.name.toLowerCase()
        const allowedAttrs = allowedAttributes[tagName as keyof typeof allowedAttributes] || []
        const globalAttrs = allowedAttributes['*'] || []

        if (!allowedAttrs.includes(attrName) && !globalAttrs.includes(attrName)) {
          el.removeAttribute(attrName)
        }
      })

      // Sanitize href (prevent XSS)
      if (tagName === 'a') {
        const href = el.getAttribute('href')
        if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('/')) {
          el.removeAttribute('href')
        }
      }

      // Sanitize src (prevent XSS)
      if (tagName === 'img') {
        const src = el.getAttribute('src')
        if (src && !src.startsWith('http') && !src.startsWith('data:')) {
          el.removeAttribute('src')
        }
      }
    })

    // Remove disallowed elements
    nodesToRemove.forEach(el => el.remove())
  }

  sanitize(temp)
  return temp.innerHTML
}
