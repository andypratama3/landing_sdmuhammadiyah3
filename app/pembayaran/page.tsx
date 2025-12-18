"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Breadcrumb from "@/components/breadcrumb"
import { Search, User, Phone, CreditCard, CheckCircle, XCircle, Printer, Wallet, ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"

type Payment = {
  category: string
  description: string
  month: string
  amount: number
  status: "paid" | "unpaid"
  date: string
}

type GroupedPayments = {
  [year: string]: {
    [category: string]: Payment[]
  }
}

export default function PembayaranPage() {
  const [nisn, setNisn] = useState("")
  const [studentData, setStudentData] = useState<any>(null)
  const [expandedYears, setExpandedYears] = useState<string[]>(["2024/2025"])
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["2024/2025-SPP"])

  const handleSearch = () => {
    if (nisn === "1234567890") {
      setStudentData({
        name: "Ahmad Farhan",
        nisn: "1234567890",
        grade: "Kelas 6A",
        parent: "Bapak Joko Widodo",
        phone: "0812-3456-7890",
        photo: "/student-profile.jpg",
      })
    }
  }

  const payments: Payment[] = [
    { category: "SPP", description: "SPP Bulan Juli", month: "Juli 2024", amount: 500000, status: "paid", date: "05 Juli 2024" },
    { category: "SPP", description: "SPP Bulan Agustus", month: "Agustus 2024", amount: 500000, status: "paid", date: "05 Agustus 2024" },
    { category: "SPP", description: "SPP Bulan September", month: "September 2024", amount: 500000, status: "paid", date: "05 September 2024" },
    { category: "SPP", description: "SPP Bulan Oktober", month: "Oktober 2024", amount: 500000, status: "paid", date: "05 Oktober 2024" },
    { category: "SPP", description: "SPP Bulan November", month: "November 2024", amount: 500000, status: "paid", date: "05 November 2024" },
    { category: "SPP", description: "SPP Bulan Desember", month: "Desember 2024", amount: 500000, status: "paid", date: "05 Desember 2024" },
    { category: "SPP", description: "SPP Bulan Januari", month: "Januari 2025", amount: 500000, status: "paid", date: "05 Januari 2025" },
    { category: "SPP", description: "SPP Bulan Februari", month: "Februari 2025", amount: 500000, status: "unpaid", date: "-" },
    { category: "SPP", description: "SPP Bulan Maret", month: "Maret 2025", amount: 500000, status: "unpaid", date: "-" },
    { category: "Seragam", description: "Seragam Batik", month: "Juli 2024", amount: 350000, status: "paid", date: "10 Juli 2024" },
    { category: "Buku", description: "Buku Paket Semester 1", month: "Juli 2024", amount: 450000, status: "paid", date: "15 Juli 2024" },
    { category: "Buku", description: "Buku Paket Semester 2", month: "Januari 2025", amount: 450000, status: "paid", date: "15 Januari 2025" },
    { category: "Kegiatan", description: "Study Tour", month: "Maret 2025", amount: 800000, status: "unpaid", date: "-" },
    { category: "SPP", description: "SPP Bulan Juli", month: "Juli 2023", amount: 450000, status: "paid", date: "05 Juli 2023" },
    { category: "SPP", description: "SPP Bulan Agustus", month: "Agustus 2023", amount: 450000, status: "paid", date: "05 Agustus 2023" },
    { category: "SPP", description: "SPP Bulan September", month: "September 2023", amount: 450000, status: "paid", date: "05 September 2023" },
    { category: "Pendaftaran", description: "Biaya Pendaftaran", month: "Juli 2023", amount: 1500000, status: "paid", date: "01 Juli 2023" },
    { category: "Seragam", description: "Seragam Lengkap", month: "Juli 2023", amount: 800000, status: "paid", date: "10 Juli 2023" },
  ]

  const groupedPayments = payments.reduce((acc: GroupedPayments, payment) => {
    const year = payment.month.includes("2023") ? "2023/2024" : 
                 payment.month.includes("2024") && (payment.month.includes("Juli") || payment.month.includes("Agustus") || 
                 payment.month.includes("September") || payment.month.includes("Oktober") || 
                 payment.month.includes("November") || payment.month.includes("Desember")) ? "2024/2025" :
                 payment.month.includes("2025") ? "2024/2025" : "2024/2025"
    
    if (!acc[year]) acc[year] = {}
    if (!acc[year][payment.category]) acc[year][payment.category] = []
    acc[year][payment.category].push(payment)
    
    return acc
  }, {})

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

  const calculateStats = () => {
    const totalBills = payments.reduce((sum, p) => sum + p.amount, 0)
    const totalPaid = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0)
    const totalUnpaid = totalBills - totalPaid
    return { totalBills, totalPaid, totalUnpaid }
  }

  const { totalBills, totalPaid, totalUnpaid } = calculateStats()

  return (
    <div className="pt-24 pb-16 bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] dark:from-[#1a4d2e] dark:via-[#2a7a4a] dark:to-[#1f5c3a] py-20 text-white">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: "Pembayaran" }]} />
          <div className="max-w-4xl mx-auto text-center mt-8">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2">Payment Portal</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Portal Pembayaran</h1>
            <p className="text-xl text-white/90 text-balance leading-relaxed">
              Cek riwayat dan lakukan pembayaran dengan mudah
            </p>
          </div>
        </div>
      </section>

      {/* NISN Input */}
      {!studentData && (
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto p-10 rounded-3xl border-0 shadow-2xl bg-white dark:bg-gray-700">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-[#33b962]/10 dark:bg-[#33b962]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-10 h-10 text-[#33b962]" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Cek Pembayaran</h2>
                <p className="text-gray-600 dark:text-gray-400">Masukkan NISN untuk melihat riwayat pembayaran</p>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Masukkan NISN (10 digit)"
                    className="pl-12 h-14 rounded-full text-lg bg-gray-100 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 border-0"
                    value={nisn}
                    onChange={(e) => setNisn(e.target.value)}
                    maxLength={10}
                  />
                </div>
                <Button
                  className="w-full h-14 bg-[#33b962] hover:bg-[#2a9d52] dark:bg-[#2a7a4a] dark:hover:bg-[#33b962] text-white rounded-full text-lg font-semibold transition-all"
                  onClick={handleSearch}
                  disabled={nisn.length !== 10}
                >
                  Cek Pembayaran
                </Button>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">Contoh NISN: 1234567890</p>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Payment History */}
      {studentData && (
        <>
          {/* Student Info Card */}
          <section className="py-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4">
              <Card className="max-w-6xl mx-auto p-6 rounded-3xl border-2 border-[#33b962]/20 bg-white dark:bg-gray-800">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#33b962] shrink-0">
                    <img
                      src={studentData.photo || "/placeholder.svg"}
                      alt={studentData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{studentData.name}</h2>
                    <p className="text-[#33b962] dark:text-[#4ade80] font-semibold mb-2">{studentData.grade}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 justify-center md:justify-start">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>NISN: {studentData.nisn}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{studentData.parent}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{studentData.phone}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-full bg-transparent dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                    onClick={() => setStudentData(null)}
                  >
                    Cari NISN Lain
                  </Button>
                </div>
              </Card>
            </div>
          </section>

          {/* Payment List by Year */}
          <section className="py-12 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto space-y-6">
                {Object.keys(groupedPayments).sort().reverse().map((year) => (
                  <Card key={year} className="overflow-hidden rounded-3xl border-0 shadow-xl bg-white dark:bg-gray-700">
                    {/* Year Header */}
                    <button
                      onClick={() => toggleYear(year)}
                      className="w-full p-6 bg-gradient-to-r from-[#33b962] to-[#2a9d52] dark:from-[#1a4d2e] dark:to-[#2a7a4a] text-white flex items-center justify-between hover:from-[#2a9d52] hover:to-[#238b45] dark:hover:from-[#2a7a4a] dark:hover:to-[#33b962] transition-all rounded-2xl"
                    >
                      <div className="flex items-center gap-4">
                        {expandedYears.includes(year) ? (
                          <ChevronDown className="w-6 h-6" />
                        ) : (
                          <ChevronRight className="w-6 h-6" />
                        )}
                        <h2 className="text-2xl font-bold">Tahun Ajaran {year}</h2>
                      </div>
                      <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                        {groupedPayments[year] && Object.values(groupedPayments[year]).flat().length} transaksi
                      </Badge>
                    </button>

                    {/* Categories */}
                    {expandedYears.includes(year) && (
                      <div className="divide-y dark:divide-gray-600">
                        {Object.keys(groupedPayments[year]).map((category) => {
                          const categoryKey = `${year}-${category}`
                          const categoryPayments = groupedPayments[year][category]
                          const isSPP = category === "SPP"
                          const paidCount = categoryPayments.filter(p => p.status === "paid").length
                          const totalAmount = categoryPayments.reduce((sum, p) => sum + p.amount, 0)

                          return (
                            <div key={category}>
                              {/* Category Header */}
                              <button
                                onClick={() => toggleCategory(year, category)}
                                className="w-full p-6 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center justify-between transition-all"
                              >
                                <div className="flex items-center gap-4 flex-1">
                                  {isSPP && (
                                    <>
                                      {expandedCategories.includes(categoryKey) ? (
                                        <ChevronDown className="w-5 h-5 text-[#33b962]" />
                                      ) : (
                                        <ChevronRight className="w-5 h-5 text-[#33b962]" />
                                      )}
                                    </>
                                  )}
                                  <div className="text-left">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{category}</h3>
                                    {isSPP && (
                                      <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {paidCount}/{categoryPayments.length} bulan terbayar
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="text-right ml-4">
                                  <Badge className={`mt-1 border-0 ${
                                    paidCount === categoryPayments.length 
                                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" 
                                      : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                                  }`}>
                                    {paidCount === categoryPayments.length ? "Lunas" : `${paidCount} dari ${categoryPayments.length}`}
                                  </Badge>
                                </div>
                              </button>

                              {/* SPP Monthly List */}
                              {isSPP && expandedCategories.includes(categoryKey) && (
                                <div className="bg-gray-50 dark:bg-gray-800 p-6 space-y-3">
                                  {categoryPayments.map((payment, idx) => (
                                    <Card key={idx} className="p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-700 border-0">
                                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                        <div className="flex items-center gap-4 flex-1 min-w-0">
                                          <div className="w-12 h-12 rounded-full bg-[#33b962]/10 dark:bg-[#33b962]/20 flex items-center justify-center shrink-0">
                                            <span className="font-bold text-[#33b962]">{idx + 1}</span>
                                          </div>
                                          <div className="min-w-0 flex-1">
                                            <h4 className="font-semibold text-gray-900 dark:text-white truncate">{payment.description}</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{payment.month}</p>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2 sm:gap-3 justify-between sm:justify-end flex-wrap">
                                          <div className="text-right">
                                            <p className="font-bold text-gray-900 dark:text-white whitespace-nowrap">
                                              Rp {payment.amount.toLocaleString("id-ID")}
                                            </p>
                                            {payment.status === "paid" && (
                                              <p className="text-xs text-gray-600 dark:text-gray-400">{payment.date}</p>
                                            )}
                                          </div>
                                          {payment.status === "paid" ? (
                                            <>
                                              <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-0 whitespace-nowrap">
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
                                              <Badge className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-0 whitespace-nowrap">
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

                              {/* Non-SPP Payment Items */}
                              {!isSPP && expandedCategories.includes(categoryKey) && (
                                <div className="bg-gray-50 dark:bg-gray-800 p-6 space-y-3">
                                  {categoryPayments.map((payment, idx) => (
                                    <Card key={idx} className="p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-700 border-0">
                                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                        <div className="flex items-center gap-4 flex-1 min-w-0">
                                          <div className="w-12 h-12 rounded-full bg-[#33b962]/10 dark:bg-[#33b962]/20 flex items-center justify-center shrink-0">
                                            <span className="font-bold text-[#33b962]">{idx + 1}</span>
                                          </div>
                                          <div className="min-w-0 flex-1">
                                            <h4 className="font-semibold text-gray-900 dark:text-white truncate">{payment.description}</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{payment.month}</p>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2 sm:gap-3 justify-between sm:justify-end flex-wrap">
                                          <div className="text-right">
                                            <p className="font-bold text-gray-900 dark:text-white whitespace-nowrap">
                                              Rp {payment.amount.toLocaleString("id-ID")}
                                            </p>
                                            {payment.status === "paid" && (
                                              <p className="text-xs text-gray-600 dark:text-gray-400">{payment.date}</p>
                                            )}
                                          </div>
                                          {payment.status === "paid" ? (
                                            <>
                                              <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-0 whitespace-nowrap">
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
                                              <Badge className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-0 whitespace-nowrap">
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
      )}
    </div>
  )
}