/**
 * Bersihkan konten rich text dari Quill editor:
 * - Hapus inline style color/background-color hasil editor dark mode
 *   (mis. background-color: rgb(33, 35, 40); color: rgb(248, 249, 249))
 *   yang tampak seperti bug di light mode karena teks jadi punya
 *   outline/latar gelap. Warna teks selanjutnya mengikuti tema situs.
 * - Hapus sisa span ql-cursor (berisi karakter BOM tak terlihat).
 * Murni operasi string sehingga aman dipakai di server component (SSR).
 */
export function cleanRichText(html: string): string {
  if (!html) return ''

  let result = html

  // Hapus span kursor Quill yang menyisakan karakter BOM (\uFEFF)
  result = result.replace(/<span class="ql-cursor">\uFEFF?<\/span>/gi, '')
  // BOM telanjang di luar span
  result = result.replace(/\uFEFF/g, '')

  // Hapus deklarasi color & background-color dari setiap style attribute
  result = result.replace(/style="([^"]*)"/gi, (match, styles: string) => {
    const kept = styles
      .split(';')
      .map((s) => s.trim())
      .filter((s) => {
        const prop = s.split(':')[0].trim().toLowerCase()
        return s && prop !== 'color' && prop !== 'background-color'
      })
    return kept.length > 0 ? `style="${kept.join('; ')}"` : ''
  })

  // Rapikan tag yang style-nya habis dibersihkan (mis. <span > -> <span>)
  result = result.replace(/(<[a-zA-Z][a-zA-Z0-9-]*)\s+>/g, '$1>')

  return result
}

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
