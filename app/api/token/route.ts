import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

/**
 * In-memory cache untuk token generation attempts
 * Prevents hammering backend dengan retry spam
 */
class TokenRetryCache {
  private static lastAttempt: number = 0
  private static minRetryInterval: number = 5 * 60 * 1000 // 5 menit
  private static isBackendDown: boolean = false

  static shouldAttempt(): boolean {
    const now = Date.now()
    const timeSinceLastAttempt = now - this.lastAttempt

    // Jika backend down, wait 5 menit sebelum retry
    if (this.isBackendDown && timeSinceLastAttempt < this.minRetryInterval) {
      return false
    }

    this.lastAttempt = now
    return true
  }

  static markBackendDown(): void {
    this.isBackendDown = true
    this.lastAttempt = Date.now()
    console.warn('⚠️ Backend marked as down, will retry in 5 minutes')
  }

  static markBackendUp(): void {
    this.isBackendDown = false
    console.log('✅ Backend is up')
  }

  static getTimeUntilNextRetry(): number {
    if (!this.isBackendDown) return 0
    const elapsed = Date.now() - this.lastAttempt
    return Math.max(0, this.minRetryInterval - elapsed)
  }
}

/**
 * POST /api/token
 * Generates/refreshes authentication token from backend
 * Handles HMAC signature validation and cookie management
 * With smart retry logic to prevent backend hammering
 */
export async function POST(req: NextRequest) {
  try {
    // ============================================
    // 0️⃣ CHECK RETRY COOLDOWN
    // ============================================
    if (!TokenRetryCache.shouldAttempt()) {
      const timeUntilRetry = TokenRetryCache.getTimeUntilNextRetry()
      const minutesLeft = Math.ceil(timeUntilRetry / 1000 / 60)
      
      return NextResponse.json(
        { 
          success: false, 
          message: `Backend temporarily unavailable, retry in ${minutesLeft} minutes`,
          error: 'RETRY_COOLDOWN',
          retryAfter: timeUntilRetry,
        },
        { status: 503 }
      )
    }

    // ============================================
    // 1️⃣ GENERATE SIGNATURE
    // ============================================
    const timestamp = Math.floor(Date.now() / 1000).toString()
    const nonce = crypto.randomUUID()
    const stringToSign = `${timestamp}.${nonce}`

    // Get secret from environment
    const secretHex = process.env.NEXT_PUBLIC_API_SECRET
    if (!secretHex) {
      console.error('❌ API_SECRET_KEY not configured in environment')
      return NextResponse.json(
        { 
          success: false, 
          message: 'Server configuration error' 
        },
        { status: 500 }
      )
    }

    // Convert hex to buffer
    let secretKey: Buffer
    try {
      secretKey = Buffer.from(secretHex, 'hex')
    } catch (error) {
      console.error('❌ Failed to parse API_SECRET_KEY as hex:', error)
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid API_SECRET_KEY format (must be hex)',
          error: 'INVALID_SECRET_FORMAT',
        },
        { status: 500 }
      )
    }

    // Create HMAC signature
    let signature: string
    try {
      signature = crypto
        .createHmac('sha256', secretKey)
        .update(stringToSign)
        .digest('hex')
    } catch (error) {
      console.error('❌ Failed to create signature:', error)
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to create signature',
        },
        { status: 500 }
      )
    }

    // ============================================
    // 2️⃣ CALL BACKEND API
    // ============================================
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) {
      console.error('❌ NEXT_PUBLIC_API_URL not configured')
      return NextResponse.json(
        { 
          success: false, 
          message: 'Server configuration error' 
        },
        { status: 500 }
      )
    }

    let backendResponse: Response
    let isNetworkError = false

    try {
      backendResponse = await fetch(
        `${apiUrl}/auth/token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-TIMESTAMP': timestamp,
            'X-NONCE': nonce,
            'X-SIGNATURE': signature,
            'User-Agent': 'NextJS-Client/1.0',
          },
          cache: 'no-store',
          signal: AbortSignal.timeout(10000), // 10 second timeout (shorter)
        }
      )
    } catch (err: any) {
      isNetworkError = true
      console.error('❌ Network error calling backend:', err.message)

      // Mark backend as down untuk prevent spam retries
      TokenRetryCache.markBackendDown()

      return NextResponse.json(
        { 
          success: false, 
          message: 'Backend service unavailable',
          error: 'BACKEND_UNAVAILABLE',
          retryAfter: 5 * 60 * 1000, // Retry after 5 minutes
        },
        { status: 503 }
      )
    }

    // ============================================
    // 3️⃣ HANDLE RESPONSE
    // ============================================
    if (!backendResponse.ok) {
      // Backend is responding but with error
      console.error(`❌ Backend error: ${backendResponse.status}`)

      // Mark as down untuk cooldown
      TokenRetryCache.markBackendDown()

      return NextResponse.json(
        { 
          success: false, 
          message: `Authentication failed: ${backendResponse.status}`,
          error: 'BACKEND_ERROR',
          retryAfter: 5 * 60 * 1000,
        },
        { status: 503 }
      )
    }

    // ============================================
    // 4️⃣ SUCCESS - MARK BACKEND AS UP
    // ============================================
    TokenRetryCache.markBackendUp()

    // Parse response
    const responseText = await backendResponse.text()
    let backendData: any
    try {
      backendData = JSON.parse(responseText)
    } catch {
      backendData = { success: true, message: responseText }
    }

    // ============================================
    // 5️⃣ CREATE RESPONSE WITH COOKIES
    // ============================================
    const setCookieHeader = backendResponse.headers.get('set-cookie')

    const response = NextResponse.json(
      { 
        success: true,
        message: 'Token generated successfully',
        data: backendData,
      },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
        },
      }
    )

    // Forward Set-Cookie header from backend
    if (setCookieHeader) {
      response.headers.set('set-cookie', setCookieHeader)
    }

    return response

  } catch (err: any) {
    console.error('❌ Token Generation Error:', err.message)

    // Mark backend as down
    TokenRetryCache.markBackendDown()

    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error',
        error: err.code || 'UNKNOWN_ERROR',
        retryAfter: 5 * 60 * 1000,
      },
      { status: 503 }
    )
  }
}

/**
 * GET /api/token
 * Check if user has valid token/session
 */
export async function GET(req: NextRequest) {
  try {
    const cookies = req.cookies.getAll()
    const hasAccessToken = cookies.some(c => c.name === 'access_token')

    if (hasAccessToken) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Valid session found',
          authenticated: true,
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'No valid session',
        authenticated: false,
      },
      { status: 401 }
    )

  } catch (err: any) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Session check failed',
        error: err.message,
      },
      { status: 500 }
    )
  }
}