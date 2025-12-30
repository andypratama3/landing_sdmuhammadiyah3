import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const timestamp = Math.floor(Date.now() / 1000).toString()
    const nonce = crypto.randomUUID()
    const stringToSign = `${timestamp}.${nonce}`

    const secretHex = process.env.API_SECRET_KEY
    if (!secretHex) throw new Error('API_SECRET_KEY not configured')
    const secretKey = Buffer.from(secretHex, 'hex')

    const signature = crypto.createHmac('sha256', secretKey)
      .update(stringToSign)
      .digest('hex')

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-TIMESTAMP': timestamp,
        'X-NONCE': nonce,
        'X-SIGNATURE': signature,
      },
      cache: 'no-store',
    })

    const data = await response.json()

    if (!data.success || !data.data) {
      return NextResponse.json(data, { status: response.status })
    }

    const { access_token, refresh_token, expires_in, refresh_expires_in } = data.data

    const res = NextResponse.json({
      success: true,
      message: 'Token set in cookie',
    })

    // Set HttpOnly cookies
    res.cookies.set('access_token', access_token, {
      httpOnly: true,
      path: '/',
      maxAge: expires_in, // seconds
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
    res.cookies.set('refresh_token', refresh_token, {
      httpOnly: true,
      path: '/',
      maxAge: refresh_expires_in || 7*24*60*60,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })

    return res
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message ?? 'Internal error' },
      { status: 500 }
    )
  }
}
