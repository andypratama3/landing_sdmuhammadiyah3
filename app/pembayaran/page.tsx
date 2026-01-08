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
  ChevronDown, ChevronRight, Loader2, AlertCircle, RefreshCw 
} from "lucide-react"
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
    <div className="min-h-screen pt-16 pb-16 bg-white dark:bg-gray-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] dark:from-[#1a4d2e] dark:via-[#2a7a4a] dark:to-[#1f5c3a] py-20 text-white">
        <div className="container px-4 mx-auto">
          <Breadcrumb items={[{ label: "Pembayaran" }]} />
          <div className="max-w-4xl mx-auto mt-8 text-center">
            <Badge className="px-4 py-2 mb-6 text-white bg-white/20 border-white/30">Payment Portal</Badge>
            <h1 className="mb-6 text-5xl font-bold md:text-6xl text-balance">Portal Pembayaran</h1>
            <p className="text-xl leading-relaxed text-white/90 text-balance">
              Cek riwayat dan lakukan pembayaran dengan mudah
            </p>
          </div>
        </div>
      </section>

      {/* NISN Input or Pembayaran List */}
      {!selectedNisn ? (
        // NISN Input Form
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 mx-auto">
            <Card className="max-w-2xl p-10 mx-auto bg-white border-0 shadow-2xl rounded-3xl dark:bg-gray-700">
              <div className="mb-8 text-center">
                <div className="w-20 h-20 bg-[#33b962]/10 dark:bg-[#33b962]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-10 h-10 text-[#33b962]" />
                </div>
                <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Cek Pembayaran</h2>
                <p className="text-gray-600 dark:text-gray-400">Masukkan NISN untuk melihat riwayat pembayaran</p>
              </div>
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
                <p className="text-sm text-center text-gray-500 dark:text-gray-400">Contoh NISN: 1234567890</p>
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
              <section className="py-12 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                <div className="container px-4 mx-auto">
                  <Card className="max-w-6xl mx-auto p-6 rounded-3xl border-2 border-[#33b962]/20 bg-white dark:bg-gray-800">
                    <div className="flex flex-col items-center gap-6 md:flex-row">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#33b962] shrink-0 bg-gray-100 dark:bg-gray-700">
                        {siswa.foto ? (
                          <img src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/img/siswa/${siswa.foto}`} alt={siswa.foto} className="object-cover w-full h-full" />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full">
                            <span className="text-gray-400">No Photo</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h2 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">{siswa.name}</h2>
                        <p className="text-[#33b962] dark:text-[#4ade80] font-semibold mb-2">{siswa.kelas_tahun || '-'}</p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 md:justify-start">
                          <span>NISN: {siswa.nisn}</span>
                          {siswa.no_hp && <span>HP: {siswa.no_hp}</span>}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="rounded-full dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                        onClick={handleReset}
                      >
                        Cari NISN Lain
                      </Button>
                    </div>
                  </Card>
                </div>
              </section>

          
              {/* Payment List */}
              <section className="py-12 bg-white dark:bg-gray-900">
                <div className="container px-4 mx-auto">
                  <div className="max-w-6xl mx-auto space-y-6">
                    {Object.keys(groupedPembayaran).sort().reverse().map((year) => (
                      <Card key={year} className="overflow-hidden bg-white border-0 shadow-xl rounded-3xl dark:bg-gray-700">
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
                                    <Badge className={`border-0 ${
                                      paidCount === categoryPayments.length 
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