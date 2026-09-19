import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * POST /api/revalidate
 * On-demand revalidation webhook dari backend ProductSchool.
 *
 * Backend mengirim sinyal ini SETIAP data landing berubah (postingan,
 * alumni, berita, galeri, prestasi, guru, jadwal, kalender, rapor, dll.)
 * sehingga semua halaman ISR (revalidate 3600) langsung ter-refresh tanpa
 * menunggu jendela cache — data tetap realtime walau ada cache.
 *
 * Body JSON:
 *   { "secret": "xxx", "tags": ["landing"], "paths": ["/alumni"] }
 *
 * Field opsional. Jika "tags" berisi "landing" (atau kosong), SEMUA halaman
 * landing yang ter-tag ikut direvalidasi. Header "Authorization: Bearer <secret>"
 * juga diterima sebagai alternatif.
 */
const LANDING_PATHS = [
  '/',
  '/berita',
  '/galeri',
  '/prestasi',
  '/guru',
  '/tenaga-pendidikan',
  '/ekstrakurikuler',
  '/fasilitas',
  '/jadwal',
  '/kalender-akademik',
  '/alumni',
  '/kontak',
  '/pembayaran',
  '/rapot',
  '/spmb',
]

function readSecret(req: NextRequest, body: any): string | null {
  const bearer = req.headers.get('authorization')
  if (bearer && bearer.startsWith('Bearer ')) return bearer.slice(7).trim()
  if (body && typeof body.secret === 'string') return body.secret.trim()
  const q = req.nextUrl.searchParams.get('secret')
  if (q) return q.trim()
  return null
}

export async function POST(req: NextRequest) {
  const expected = process.env.LANDING_REVALIDATION_SECRET
  if (!expected) {
    return NextResponse.json(
      { success: false, message: 'Revalidation secret not configured' },
      { status: 500 }
    )
  }

  let body: any = null
  try {
    body = await req.json()
  } catch {
    body = null
  }

  const provided = readSecret(req, body)
  if (!provided || provided !== expected) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }

  const tags: string[] = Array.isArray(body?.tags)
    ? body.tags.filter((t: unknown): t is string => typeof t === 'string')
    : []
  const paths: string[] = Array.isArray(body?.paths)
    ? body.paths.filter((p: unknown): p is string => typeof p === 'string')
    : []

  try {
    if (tags.includes('landing') || tags.length === 0) {
      // Full-site refresh: semua halaman yang ter-tag "landing" + daftar rute utama.
      revalidateTag('landing', { expire: 0 })
      for (const p of LANDING_PATHS) revalidatePath(p)
    }

    for (const t of tags) {
      if (t === 'landing') continue
      revalidateTag(t, { expire: 0 })
    }
    for (const p of paths) revalidatePath(p)

    return NextResponse.json({ success: true, revalidated: true, tags, paths })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Revalidation failed', error: String(err?.message ?? err) },
      { status: 500 }
    )
  }
}