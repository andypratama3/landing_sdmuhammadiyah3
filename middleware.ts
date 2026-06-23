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
  
  // Only set Permissions-Policy in middleware (not in next.config.js to avoid duplicates)
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
  
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json).*)',
  ],
}