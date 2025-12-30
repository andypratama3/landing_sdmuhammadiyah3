import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    // =====================================================
    // 1️⃣ Security primitives
    // =====================================================
    const timestamp = Math.floor(Date.now() / 1000).toString()
    const nonce = crypto.randomUUID()

    // =====================================================
    // 2️⃣ String to sign (HARUS IDENTIK DENGAN LARAVEL)
    // =====================================================
    const stringToSign = `${timestamp}.${nonce}`

    // =====================================================
    // 3️⃣ HEX SECRET → RAW BYTES (🔥 FIX PENTING)
    // =====================================================
    const secretHex = process.env.API_SECRET_KEY

    if (!secretHex) {
      throw new Error('API_SECRET_KEY not configured')
    }

    const secretKey = Buffer.from(secretHex, 'hex')

    // =====================================================
    // 4️⃣ Generate HMAC SHA256 (HEX OUTPUT)
    // =====================================================
    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(stringToSign)
      .digest('hex')

    // =====================================================
    // 5️⃣ Forward request to Laravel API
    // =====================================================
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-TIMESTAMP': timestamp,
          'X-NONCE': nonce,
          'X-SIGNATURE': signature,
        },
        cache: 'no-store',
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
        message: err.message ?? 'Internal error',
      },
      { status: 500 }
    )
  }
}