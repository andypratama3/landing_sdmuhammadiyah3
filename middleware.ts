import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Generate a random nonce
  const nonce = crypto.randomUUID().replace(/-/g, '')
  
  const requestHeaders = new Headers(request.headers)
  
  // Store nonce in request headers for server components to access
  requestHeaders.set('x-nonce', nonce)
  
  // Create response and pass headers through
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  
  // Build the CSP header with nonce (unsafe-inline for YouTube embeds in development)
  const isDevelopment = process.env.NODE_ENV === 'production'
  const scriptSrc = isDevelopment 
    ? `'self' 'unsafe-inline' 'unsafe-eval' 'nonce-${nonce}' 'sha256-n46vPwSWuMC0W703pBofImv82Z26xo4LXymv0E9caPk=' 'sha256-rbbnijHn7DZ6ps39myQ3cVQF1H+U/PJfHh5ei/Q2kb8=' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://maps.googleapis.com https://maps.gstatic.com https://fonts.googleapis.com https://static.cloudflareinsights.com https://www.tiktok.com https://www.youtube.com https://www.youtube-nocookie.com`
    : `'self' 'nonce-${nonce}' 'sha256-n46vPwSWuMC0W703pBofImv82Z26xo4LXymv0E9caPk=' 'sha256-rbbnijHn7DZ6ps39myQ3cVQF1H+U/PJfHh5ei/Q2kb8=' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://maps.googleapis.com https://maps.gstatic.com https://fonts.googleapis.com https://static.cloudflareinsights.com https://www.tiktok.com https://www.youtube.com https://www.youtube-nocookie.com`

  // Allow local Laravel storage over http only in development
  const imgSrc = isDevelopment
    ? `'self' data: blob: https: http://localhost:8000 http://localhost:3000`
    : `'self' data: blob: https:`

  const cspHeader = `default-src 'self'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src ${imgSrc} https://maps.googleapis.com https://maps.gstatic.com https://*.googleusercontent.com https://www.google-analytics.com https://www.googletagmanager.com https://stats.g.doubleclick.net https://*.tiktok.com https://i.ytimg.com https://yt3.ggpht.com; font-src 'self' data: https://fonts.gstatic.com; frame-src 'self' https://www.google.com https://youtube.com https://www.youtube.com https://www.youtube-nocookie.com https://www.tiktok.com https://tiktok.com; connect-src 'self' https://app.sdmuhammadiyah3smd.com https://dashboard.sdmuhammadiyah3smd.com http://localhost:8000 https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://maps.googleapis.com https://youtube.com https://www.youtube.com https://www.youtube-nocookie.com https://stats.g.doubleclick.net https://www.tiktok.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'; media-src 'self' https: blob:;`

  response.headers.set('Content-Security-Policy', cspHeader)

  // Only set Permissions-Policy in middleware (not in next.config.js to avoid duplicates)
  const permissionsPolicy = isDevelopment
    ? 'geolocation=(), microphone=(), camera=(), execution-while-not-rendered=(), execution-while-out-of-viewport=()'
    : 'geolocation=(), microphone=(), camera=()'
  response.headers.set('Permissions-Policy', permissionsPolicy)
  
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json).*)',
  ],
}