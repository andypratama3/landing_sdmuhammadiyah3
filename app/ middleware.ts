import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Generate a random nonce
  const nonce = Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString('base64')
  
  const requestHeaders = new Headers(request.headers)
  
  // Store nonce in request headers for server components to access
  requestHeaders.set('x-nonce', nonce)
  
  // Create response and pass headers through
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  
  // Build the CSP header with the actual nonce value
  const cspHeader = `default-src 'self'; script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://maps.googleapis.com https://maps.gstatic.com https://fonts.googleapis.com https://static.cloudflareinsights.com https://www.tiktok.com https://www.youtube.com https://www.youtube-nocookie.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob: https://maps.googleapis.com https://maps.gstatic.com https://*.googleusercontent.com https://www.google-analytics.com https://stats.g.doubleclick.net https://*.tiktok.com https://i.ytimg.com https://yt3.ggpht.com; font-src 'self' data: https://fonts.gstatic.com; frame-src 'self' https://www.google.com https://youtube.com https://www.youtube.com https://www.youtube-nocookie.com https://www.tiktok.com https://tiktok.com; connect-src 'self' https://dashboard.sdmuhammadiyah3smd.com https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://maps.googleapis.com https://youtube.com https://www.youtube.com https://www.youtube-nocookie.com https://stats.g.doubleclick.net https://www.tiktok.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'; media-src 'self' https: blob:;`
  
  response.headers.set('Content-Security-Policy', cspHeader)
  
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json).*)',
  ],
}