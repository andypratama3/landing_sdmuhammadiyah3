"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Breadcrumb from "@/components/breadcrumb"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Search, CreditCard, CheckCircle, XCircle, Printer, Wallet,
  ChevronDown, ChevronRight, Loader2, AlertCircle, RefreshCw,
  Users, GraduationCap, ArrowRight
} from "lucide-react"
import Image from "next/image"
import { useState, useMemo, useEffect } from "react"
import { useApi } from "@/hooks/useApi"
import type { PembayaranResponse, PembayaranItem, GroupedPembayaran } from "@/types/pembayaran.types"

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

export default function PembayaranPage() {
  const [nisnInput, setNisnInput] = useState("")
  const [selectedNisn, setSelectedNisn] = useState<string | null>(null)
  const [expandedYears, setExpandedYears] = useState<string[]>([])
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  // Debounce NISN input
  const debouncedNisn = useDebounce(nisnInput, 500)
  const isTyping = nisnInput !== debouncedNisn

  // Fetch pembayaran data
  const {
    data: pembayaranResponse,
    loading: pembayaranLoading,
    error: pembayaranError,
    refetch: refetchPembayaran
  } = useApi<PembayaranResponse>(
    selectedNisn ? `/pembayaran/search?nisn=${selectedNisn}` : '',
    {
      cache: false,
      cacheTTL: 300000,
      immediate: !!selectedNisn,
    }
  )

  // Safe extract data
  const siswa = pembayaranResponse?.siswa
  const chargesData = pembayaranResponse?.charges

  // Convert charges to array format (handle both array and object)
  const charges = useMemo(() => {
    if (!chargesData) return []

    // If already an array, return it
    if (Array.isArray(chargesData)) {
      return chargesData
    }

    // If it's an object, flatten all values
    return Object.values(chargesData).flat()
  }, [chargesData])

  const hasError = pembayaranError || (!pembayaranLoading && selectedNisn && !siswa)

  // Transform charges to frontend format
  const pembayaran: PembayaranItem[] = useMemo(() => {
    return charges.map(charge => ({
      id: charge.id,
      category: charge.category || 'Lainnya',
      categoryId: charge.category_id,
      description: charge.name,
      month: charge.created_at ? new Date(charge.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' }) : '-',
      amount: charge.amount,
      status: charge.status as 'paid' | 'unpaid',
      date: charge.transaction_time
        ? new Date(charge.transaction_time).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
        : '-',
      va_number: charge.va_number,
      transaction_id: charge.transaction_id,
      snap_token: charge.snap_token,
    }))
  }, [charges])


  // Group payments by year and category
  const groupedPembayaran: GroupedPembayaran = useMemo(() => {
    return pembayaran.reduce((acc: GroupedPembayaran, payment) => {
      const date = new Date(payment.month)
      const year = date.getFullYear()
      const month = date.getMonth()

      // Determine academic year (July - June)
      const academicYear = month >= 6 ? `${year}/${year + 1}` : `${year - 1}/${year}`

      if (!acc[academicYear]) acc[academicYear] = {}
      if (!acc[academicYear][payment.category]) acc[academicYear][payment.category] = []
      acc[academicYear][payment.category].push(payment)

      return acc
    }, {})
  }, [pembayaran])


  // Auto expand current year
  useEffect(() => {
    if (Object.keys(groupedPembayaran).length > 0) {
      const currentYear = Object.keys(groupedPembayaran).sort().reverse()[0]
      setExpandedYears([currentYear])

      // Auto expand first category
      if (groupedPembayaran[currentYear]) {
        const firstCategory = Object.keys(groupedPembayaran[currentYear])[0]
        setExpandedCategories([`${currentYear}-${firstCategory}`])
      }
    }
  }, [groupedPembayaran])

  const toggleYear = (year: string) => {
    setExpandedYears(prev =>
      prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
    )
  }

  const toggleCategory = (year: string, category: string) => {
    const key = `${year}-${category}`
    setExpandedCategories(prev =>
      prev.includes(key) ? prev.filter(c => c !== key) : [...prev, key]
    )
  }

  const handleSearch = () => {
    if (nisnInput.length === 10) {
      setSelectedNisn(nisnInput)
    }
  }

  const handleReset = () => {
    setNisnInput("")
    setSelectedNisn(null)
    setExpandedYears([])
    setExpandedCategories([])
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#33b962]/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-[#ffd166]/5 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-emerald-400/5 rounded-full blur-[150px] animate-blob animation-delay-4000 pointer-events-none" />

      {/* Hero */}
      <section className="relative bg-linear-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] dark:from-[#33b962] dark:via-[#2a9d52] dark:to-[#238b45] py-24 sm:py-32 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
        <div className="container relative z-10 px-4 mx-auto">
          <Breadcrumb items={[{ label: "Pembayaran" }]} />
          <div className="max-w-4xl mx-auto mt-12 text-center text-fade-in-up">
            <Badge className="px-6 py-2 mb-8 text-white bg-white/20 border-white/30 backdrop-blur-md font-black uppercase tracking-widest text-[10px]">Payment Portal</Badge>
            <h1 className="mb-8 text-fluid-h1 font-black leading-tight drop-shadow-md">Portal Pembayaran</h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-white/95 font-medium leading-relaxed">
              Sistem administrasi digital untuk kemudahan cek riwayat dan pembayaran biaya pendidikan putra-putri Anda.
            </p>
          </div>
        </div>
      </section>

      {/* NISN Input or Pembayaran List */}
      {!selectedNisn ? (
        // NISN Input Form
        <section className="py-24 bg-gray-50 dark:bg-gray-950">
          <div className="container px-4 mx-auto">
            <Card className="max-w-2xl p-12 mx-auto bg-white border-0 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] rounded-[3rem] dark:bg-gray-900 dark:shadow-none dark:border dark:border-gray-800 animate-fade-in-up">
              <div className="mb-10 text-center">
                <div className="w-24 h-24 bg-[#33b962]/10 dark:bg-[#33b962]/20 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-6 shadow-xl">
                  <CreditCard className="w-12 h-12 text-[#33b962]" />
                </div>
                <h2 className="mb-3 text-3xl font-black text-gray-900 dark:text-white leading-tight">Cek Tagihan</h2>
                <p className="text-lg text-gray-500 dark:text-gray-400 font-medium tracking-tight">Cukup masukkan NISN untuk mengakses riwayat pembayaran</p>
              </div>
              <div className="space-y-6">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                    {isTyping ? (
                      <Loader2 className="w-6 h-6 text-[#33b962] animate-spin" />
                    ) : (
                      <Search className="w-6 h-6 text-gray-400 group-focus-within:text-[#33b962] transition-colors" />
                    )}
                  </div>
                  <Input
                    type="text"
                    placeholder="Contoh: 1234567890"
                    className="pl-14 pr-6 text-xl bg-gray-50 border-2 border-gray-100 rounded-full h-16 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500 focus:border-[#33b962] dark:focus:border-[#33b962] transition-all font-bold tracking-widest"
                    value={nisnInput}
                    onChange={(e) => setNisnInput(e.target.value)}
                    maxLength={10}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-black text-gray-400 dark:text-gray-500 tracking-widest uppercase">
                    10 DIGIT
                  </div>
                </div>
                <Button
                  className="w-full h-16 bg-[#33b962] hover:bg-[#2a9d52] dark:bg-[#2a7a4a] dark:hover:bg-[#33b962] text-white rounded-full text-lg font-black shadow-xl hover:scale-[1.02] transition-all duration-300"
                  onClick={handleSearch}
                  disabled={nisnInput.length !== 10}
                >
                  AKSES DATA PEMBAYARAN
                </Button>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ffd166]" />
                  <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Aman & Terjamin via Digital Portal</p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      ) : (
        // Pembayaran Data
        <>
          {pembayaranLoading ? (
            // Loading State
            <section className="py-12 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
              <div className="container px-4 mx-auto">
                <Card className="max-w-6xl mx-auto p-6 rounded-3xl border-2 border-[#33b962]/20 bg-white dark:bg-gray-800 ">
                  <div className="flex flex-col items-center gap-6 md:flex-row">
                    <Skeleton className="w-24 h-24 rounded-full" />
                    <div className="flex-1 w-full space-y-3">
                      <Skeleton className="w-48 h-8" />
                      <Skeleton className="w-32 h-6" />
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                        <Skeleton className="h-6" />
                        <Skeleton className="h-6" />
                        <Skeleton className="h-6" />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </section>
          ) : hasError ? (
            // Error State
            <section className="py-12 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
              <div className="container px-4 mx-auto">
                <Alert variant="destructive" className="max-w-6xl mx-auto">
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription className="flex items-center justify-between">
                    <span>{pembayaranError || 'NISN tidak ditemukan'}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => refetchPembayaran?.()}
                      className="ml-4"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Coba Lagi
                    </Button>
                  </AlertDescription>
                </Alert>
                <div className="mt-12 text-center">
                  <div className="max-w-2xl mx-auto">
                    <div className="w-20 h-20 bg-[#33b962]/10 dark:bg-[#33b962]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-10 h-10 text-[#33b962]" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Silahkan Cari Data Lainnya</h3>
                    <p className="mb-6 text-gray-600 dark:text-gray-400">Masukkan NISN yang berbeda untuk melihat data pembayaran</p>

                    <div className="space-y-4">
                      <div className="relative">
                        {isTyping ? (
                          <Loader2 className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2 animate-spin" />
                        ) : (
                          <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2" />
                        )}
                        <Input
                          type="text"
                          placeholder="Masukkan NISN (10 digit)"
                          className="pl-12 text-lg bg-gray-100 border-0 rounded-full h-14 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                          value={nisnInput}
                          onChange={(e) => setNisnInput(e.target.value)}
                          maxLength={10}
                          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                      </div>
                      <Button
                        className="w-full h-14 bg-[#33b962] hover:bg-[#2a9d52] dark:bg-[#2a7a4a] dark:hover:bg-[#33b962] text-white rounded-full text-lg font-semibold transition-all"
                        onClick={handleSearch}
                        disabled={nisnInput.length !== 10}
                      >
                        Cek Pembayaran
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : siswa ? (
            // Student Info & Payments
            <>
              {/* Student Info Card */}
              <section className="py-12 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-900 transition-colors">
                <div className="container px-4 mx-auto font-sans antialiased">
                  <Card className="max-w-6xl mx-auto overflow-hidden border-0 shadow-2xl rounded-[3rem] bg-white dark:bg-gray-900 transition-all">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/3 relative h-80 md:h-auto overflow-hidden group">
                        {siswa.foto ? (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/img/siswa/${siswa.foto}`}
                            alt={siswa.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center w-full h-full bg-gray-50 dark:bg-gray-800">
                            <Users className="w-20 h-20 text-gray-200 dark:text-gray-700 mb-4" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pas Foto Siswa</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex-1 p-10 sm:p-14 flex flex-col justify-center">
                        <div className="mb-8">
                          <Badge className="mb-4 bg-[#33b962] text-white border-0 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Data Terverifikasi</Badge>
                          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tighter leading-none mb-3">{siswa.name}</h2>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#ffd166]/20 flex items-center justify-center">
                              <GraduationCap className="w-5 h-5 text-[#ffd166]" />
                            </div>
                            <p className="text-xl font-bold text-[#33b962] dark:text-[#4ade80] tracking-tight">{siswa.kelas_tahun || '-'}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10 pb-8 border-b border-gray-100 dark:border-gray-800">
                          <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">NISN SISWA</p>
                            <p className="text-xl font-black text-gray-900 dark:text-white tracking-widest">{siswa.nisn}</p>
                          </div>
                          {siswa.no_hp && (
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">KONTAK TERDAFTAR</p>
                              <div className="flex items-center gap-2">
                                <Wallet className="w-4 h-4 text-[#33b962]" />
                                <p className="text-xl font-bold text-gray-900 dark:text-white">{siswa.no_hp}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-4">
                          <Button
                            variant="outline"
                            className="rounded-full border-2 border-gray-100 dark:border-gray-800 dark:text-white dark:hover:bg-gray-800 h-12 px-8 font-black uppercase tracking-widest text-xs transition-all hover:border-[#33b962] hover:text-[#33b962]"
                            onClick={handleReset}
                          >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Ganti NISN
                          </Button>
                          <Button
                            className="bg-gray-950 hover:bg-black dark:bg-white dark:text-gray-950 dark:hover:bg-gray-100 text-white rounded-full h-12 px-8 font-black uppercase tracking-widest text-xs shadow-xl transition-all"
                          >
                            <Printer className="w-4 h-4 mr-2" />
                            Cetak Kartu
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </section>


              {/* Payment List */}
              <section className="py-12 bg-white/50 dark:bg-gray-950/50 backdrop-blur-md transition-colors duration-500">
                <div className="container px-4 mx-auto">
                  <div className="max-w-6xl mx-auto space-y-8">
                    {Object.keys(groupedPembayaran).sort().reverse().map((year) => (
                      <Card key={year} className="overflow-hidden bg-white/40 dark:bg-gray-900/40 border-0 shadow-2xl rounded-[2.5rem] glass">
                        {/* Year Header */}
                        <button
                          onClick={() => toggleYear(year)}
                          className="w-full p-6 bg-gradient-to-r from-[#33b962] to-[#2a9d52] dark:from-[#1a4d2e] dark:to-[#2a7a4a] text-white flex items-center justify-between hover:from-[#2a9d52] hover:to-[#238b45] dark:hover:from-[#2a7a4a] dark:hover:to-[#33b962] transition-all rounded-3xl"
                        >
                          <div className="flex items-center gap-4">
                            {expandedYears.includes(year) ? (
                              <ChevronDown className="w-6 h-6" />
                            ) : (
                              <ChevronRight className="w-6 h-6" />
                            )}
                            <h2 className="text-2xl font-bold">Tahun Ajaran {year}</h2>
                          </div>
                          <Badge className="px-4 py-2 text-white bg-white/20 border-white/30">
                            {Object.values(groupedPembayaran[year]).flat().length} transaksi
                          </Badge>
                        </button>

                        {/* Categories */}
                        {expandedYears.includes(year) && (
                          <div className="divide-y dark:divide-gray-600">
                            {Object.keys(groupedPembayaran[year]).map((category) => {
                              const categoryKey = `${year}-${category}`
                              const categoryPayments = groupedPembayaran[year][category]
                              const paidCount = categoryPayments.filter(p => p.status === 'paid').length

                              return (
                                <div key={category}>
                                  {/* Category Header */}
                                  <button
                                    onClick={() => toggleCategory(year, category)}
                                    className="flex items-center justify-between w-full p-6 transition-all bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                  >
                                    <div className="flex items-center flex-1 gap-4">
                                      {expandedCategories.includes(categoryKey) ? (
                                        <ChevronDown className="w-5 h-5 text-[#33b962]" />
                                      ) : (
                                        <ChevronRight className="w-5 h-5 text-[#33b962]" />
                                      )}
                                      <div className="text-left">
                                        <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">{category}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                          {paidCount}/{categoryPayments.length} terbayar
                                        </p>
                                      </div>
                                    </div>
                                    <Badge className={`border-0 ${paidCount === categoryPayments.length
                                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                      : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                                      }`}>
                                      {paidCount === categoryPayments.length ? "Lunas" : `${paidCount}/${categoryPayments.length}`}
                                    </Badge>
                                  </button>

                                  {/* Payment Items */}
                                  {expandedCategories.includes(categoryKey) && (
                                    <div className="p-6 space-y-3 bg-gray-50 dark:bg-gray-800">
                                      {categoryPayments.map((payment, idx) => (
                                        <Card key={payment.id} className="p-4 transition-shadow bg-white border-0 hover:shadow-md dark:bg-gray-700">
                                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                            <div className="flex items-center flex-1 min-w-0 gap-4">
                                              <div className="w-12 h-12 rounded-full bg-[#33b962]/10 dark:bg-[#33b962]/20 flex items-center justify-center shrink-0 font-bold text-[#33b962]">
                                                {idx + 1}
                                              </div>
                                              <div className="flex flex-col flex-1 min-w-0 sm:flex-row">
                                                <div className="flex-1 min-w-0">
                                                  <h4 className="font-semibold text-gray-900 break-words truncate dark:text-white whitespace-nowrap sm:whitespace-normal">
                                                    {payment.description}
                                                  </h4>
                                                  <p className="text-sm text-gray-600 dark:text-gray-400">{payment.month}</p>
                                                </div>
                                              </div>

                                            </div>
                                            <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 sm:justify-end">
                                              <div className="text-right">
                                                <p className="font-bold text-gray-900 dark:text-white whitespace-nowrap">
                                                  Rp {payment.amount.toLocaleString('id-ID')}
                                                </p>
                                                {payment.status === 'paid' && (
                                                  <p className="text-xs text-gray-600 dark:text-gray-400">{payment.date}</p>
                                                )}
                                              </div>
                                              {payment.status === 'paid' ? (
                                                <>
                                                  <Badge className="text-green-700 bg-green-100 border-0 dark:bg-green-900/30 dark:text-green-400 whitespace-nowrap">
                                                    <CheckCircle className="w-3 h-3 mr-1" />
                                                    Lunas
                                                  </Badge>
                                                  <Button variant="outline" size="sm" className="rounded-full dark:border-gray-600 dark:text-white dark:hover:bg-gray-600 whitespace-nowrap">
                                                    <Printer className="w-3 h-3 mr-1" />
                                                    Cetak
                                                  </Button>
                                                </>
                                              ) : (
                                                <>
                                                  <Badge className="text-red-700 bg-red-100 border-0 dark:bg-red-900/30 dark:text-red-400 whitespace-nowrap">
                                                    <XCircle className="w-3 h-3 mr-1" />
                                                    Belum
                                                  </Badge>
                                                  <Button size="sm" className="bg-[#33b962] hover:bg-[#2a9d52] dark:bg-[#2a7a4a] dark:hover:bg-[#33b962] text-white rounded-full whitespace-nowrap">
                                                    <Wallet className="w-3 h-3 mr-1" />
                                                    Bayar
                                                  </Button>
                                                </>
                                              )}
                                            </div>
                                          </div>
                                        </Card>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              </section>
            </>
          ) : null}
        </>
      )}
    </div>
  )
}