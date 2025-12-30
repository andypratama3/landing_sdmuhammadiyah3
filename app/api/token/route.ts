import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

function getUserIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return '0.0.0.0'
}

export async function POST(req: NextRequest) {
  try {
    const userIp = getUserIp(req)
    const timestamp = Math.floor(Date.now() / 1000).toString()
    const nonce = crypto.randomUUID()

    // ⚠️ HARUS SAMA DENGAN LARAVEL
    const stringToSign = `${timestamp}.${nonce}.${userIp}`

    const secret = process.env.API_SECRET_KEY
    if (!secret) {
      throw new Error('API secret key not configured')
    }

    const signature = crypto
      .createHmac('sha256', secret)
      .update(stringToSign)
      .digest('hex')

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

          // 🔐 SECURITY HEADERS
          'X-TIMESTAMP': timestamp,
          'X-NONCE': nonce,
          'X-SIGNATURE': signature,
          'X-CLIENT-IP': userIp, 
        },
      }
    )

    const data = await response.json()

    return NextResponse.json(data, {
      status: response.status,
    })

  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 }
    )
  }
}
