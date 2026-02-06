"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Download, Printer, Loader, BookOpen, Users } from "lucide-react"
import { useState } from "react"
import { useApi } from "@/hooks/useApi"
import { JadwalItem } from "@/types"

// ========== COLOR MAPPING ==========
const colorMap: Record<string, string> = {
  'bg-blue-100': '#e0edff', // biru pastel lebih hidup
  'bg-green-100': '#e3f8ea', // hijau fresh
  'bg-orange-100': '#ffecd6', // oranye lembut tapi hangat
  'bg-purple-100': '#f0e4ff', // ungu pastel
  'bg-red-100': '#fde8e8', // merah soft
  'bg-yellow-100': '#fff3cc', // kuning cerah lembut
  'bg-pink-100': '#fde2ef', // pink pastel hidup
  'bg-indigo-100': '#e4e9ff', // indigo soft
  'bg-gray-100': '#f1f3f7', // abu kebiruan (biar gak flat)

}

const DAY_ORDER = [
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
  'Minggu',
]


function getTailwindToHex(color: string): string {
  return colorMap[color] || '#f3f4f6'
}

export default function JadwalPage() {
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [selectedGradeId, setSelectedGradeId] = useState<string | null>(null)
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [isPrinting, setIsPrinting] = useState(false)

  // ========== FETCH TAHUN AJARAN ==========
  const { data: yearsData, loading: yearsLoading } = useApi<string[]>(
    '/jadwal/tahun-ajaran',
    { cache: true, cacheTTL: 3600000, immediate: true }
  )
  const years = yearsData || []


  // ========== FETCH KELAS (Grade) ==========
  const { data: gradesData, loading: gradesLoading } = useApi<Kelas[]>(
    '/jadwal/kelas',
    { cache: true, cacheTTL: 3600000, immediate: true }
  )
  const grades = gradesData || []

  // ========== FETCH CATEGORY KELAS (Class) ==========
  const categoryEndpoint = selectedGradeId
    ? `/jadwal/category-kelas?kelas_id=${selectedGradeId}`
    : null

  const { data: categoriesData, loading: categoriesLoading } = useApi<string[]>(
    categoryEndpoint || '',
    {
      cache: true,
      cacheTTL: 3600000,
      immediate: !!selectedGradeId,
    }
  )

  const categories = (categoriesData || []).filter((c) => c && c.trim() !== '')

  // ========== FETCH JADWAL DETAILS ==========
  const scheduleEndpoint = selectedGradeId && selectedClass && selectedYear
    ? `/jadwal/list-jadwal?tahun_ajaran=${selectedYear}&kelas_id=${selectedGradeId}&category_kelas=${selectedClass}`
    : null

  const { data: scheduleData, loading: scheduleLoading } = useApi<JadwalItem[]>(
    scheduleEndpoint || '',
    {
      cache: true,
      cacheTTL: 600000,
      immediate: !!scheduleEndpoint,
    }
  )

  // ========== TRANSFORM DATA KE FORMAT DISPLAY ==========
  const schedule = scheduleData && scheduleData.length > 0
    ? transformScheduleData(scheduleData)
    : {}

  const colorLegend = Object.values(schedule)
    .flat()
    .reduce<Record<string, string>>((acc, item) => {
      if (!acc[item.color]) {
        acc[item.color] = item.subject
      }
      return acc
    }, {})


  const hasSchedule = Object.keys(schedule).length > 0


  function transformScheduleData(data: JadwalItem[]): Record<string, any[]> {
    const result: Record<string, any[]> = {}

    data.forEach((jadwal) => {
      jadwal.jadwal_details.forEach((detail) => {
        const hari = detail.hari || 'Senin'

        if (!result[hari]) result[hari] = []

        result[hari].push({
          time_start: detail.time_start,
          time_end: detail.time_end,
          time: `${detail.time_start}-${detail.time_end}`,
          subject: detail.pelajaran_id,
          teacher: detail.guru_id,
          color: detail.color || 'bg-gray-100',
        })
      })
    })

    // SORT JAM DI DALAM HARI
    Object.keys(result).forEach((day) => {
      result[day].sort((a, b) =>
        a.time_start.localeCompare(b.time_start)
      )
    })

    // SORT HARI SENIN → MINGGU
    const orderedResult: Record<string, any[]> = {}
    DAY_ORDER.forEach((day) => {
      if (result[day]) orderedResult[day] = result[day]
    })

    return orderedResult
  }

  // ========== GENERATE PRINT TABLE HTML ==========
  const generatePrintHTML = (): string => {
    const days = DAY_ORDER.filter((day) => schedule[day])
    const maxSlots = Math.max(...Object.values(schedule).map((day) => day.length))

    let tableHTML = `
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <thead>
          <tr>
            <th style="border: 1px solid #333; padding: 12px; background-color: #33b962; color: white; text-align: left; font-weight: bold;">Waktu</th>
            ${days.map(day => `<th style="border: 1px solid #333; padding: 12px; background-color: #33b962; color: white; text-align: center; font-weight: bold;">${day}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
    `

    for (let i = 0; i < maxSlots; i++) {
      const timeSlot = schedule[days[0]]?.[i]?.time || '-'
      tableHTML += `
        <tr>
          <td style="border: 1px solid #ddd; padding: 12px; font-weight: bold; width: 100px;">
            ${timeSlot}
          </td>
      `


      days.forEach(day => {
        const lesson = schedule[day as keyof typeof schedule][i]
        if (lesson) {
          const bgColor = getTailwindToHex(lesson.color)
          tableHTML += `
            <td style="border: 1px solid #ddd; padding: 12px; background-color: ${bgColor}; text-align: center;">
              <div style="font-weight: bold; margin-bottom: 4px;">${lesson.subject}</div>
              ${lesson.teacher !== '-' ? `<div style="font-size: 12px; color: #666;">${lesson.teacher}</div>` : ''}
            </td>
          `
        } else {
          tableHTML += `<td style="border: 1px solid #ddd; padding: 12px;"></td>`
        }
      })

      tableHTML += `</tr>`
    }

    tableHTML += `</tbody></table>`
    return tableHTML
  }

  // ========== PRINT FUNCTION ==========
  const handlePrint = () => {
    setIsPrinting(true)

    setTimeout(() => {
      const printWindow = window.open('', '', 'height=600,width=900')

      if (printWindow) {
        const printHTML = generatePrintHTML()

        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <title>Jadwal ${selectedGrade?.name} ${selectedClass}</title>
              <style>
                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }
                body {
                  font-family: 'Arial', sans-serif;
                  padding: 30px;
                  color: #333;
                }
                .header {
                  text-align: center;
                  margin-bottom: 30px;
                }
                h1 {
                  color: #33b962;
                  font-size: 24px;
                  margin-bottom: 10px;
                }
                .info {
                  font-size: 14px;
                  color: #666;
                  margin-bottom: 10px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                }
                th, td {
                  border: 1px solid #333;
                  padding: 10px;
                  text-align: center;
                  font-size: 12px;
                }
                th {
                  background-color: #33b962;
                  color: white;
                  font-weight: bold;
                }
                td:first-child, th:first-child {
                  text-align: left;
                  width: 120px;
                }
                tr:nth-child(even) {
                  background-color: #f9f9f9;
                }
                @media print {
                  body {
                    padding: 10px;
                  }
                  table {
                    page-break-inside: avoid;
                  }
                }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>Jadwal Pelajaran</h1>
                <div class="info"><strong>${selectedGrade?.name} ${selectedClass}</strong></div>
                <div class="info">Tahun Ajaran: ${selectedYear}</div>
              </div>
              ${printHTML}
            </body>
          </html>
        `)
        printWindow.document.close()

        setTimeout(() => {
          printWindow.print()
          printWindow.close()
          setIsPrinting(false)
        }, 500)
      }
    }, 100)
  }

  // ========== PDF DOWNLOAD FUNCTION ==========
  const handleDownloadPDF = async () => {
    if (typeof window === 'undefined') return
    setIsPrinting(true)

    try {
      // ✅ Import hanya di browser
      const html2pdf = (await import('html2pdf.js')).default

      const element = document.createElement('div')
      element.innerHTML = `
        <div style="padding: 30px; font-family: Arial, sans-serif;">
          <h1>Jadwal Pelajaran</h1>
          ${generatePrintHTML()}
        </div>
      `

      html2pdf()
        .from(element)
        .save()
        .then(() => setIsPrinting(false))
    } catch (err) {
      setIsPrinting(false)
    }
  }


  const days = DAY_ORDER.filter((day) => schedule[day])
  const selectedGrade = grades.find((g) => g.id === selectedGradeId)
  const isInitialLoading = yearsLoading || gradesLoading

  // post counting viwers 

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden relative font-outfit">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#33b962]/5 rounded-full blur-[100px] animate-blob pointer-events-none" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-[#ffd166]/5 rounded-full blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-40 left-1/3 w-96 h-96 bg-emerald-400/5 rounded-full blur-[150px] animate-blob animation-delay-4000 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-linear-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] dark:from-[#33b962] dark:via-[#2a9d52] dark:to-[#238b45] text-white">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
        <div className="container relative z-10 px-4 mx-auto mt-8">
          <div className="max-w-4xl mx-auto text-center text-fade-in-up">
            <Badge className="px-6 py-2 mb-8 text-white bg-white/20 border-white/30 backdrop-blur-md font-black uppercase tracking-widest text-[10px]">
              Eksplorasi Jadwal Pelajaran
            </Badge>
            <h1 className="mb-6 text-fluid-h1 font-black leading-tight drop-shadow-md text-balance">
              Jadwal Belajar SDMuh3
            </h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-white/95 font-medium leading-relaxed">
              Pantau jadwal harianmu dengan mudah untuk pengalaman belajar yang lebih teratur dan menyenangkan.
            </p>
          </div>
        </div>
      </section>

      {/* Loading Initial Data */}
      {isInitialLoading && (
        <section className="relative z-30 -mt-8">
          <div className="container px-4 mx-auto">
            <div className="max-w-md mx-auto glass dark:bg-emerald-950/40 border-emerald-500/20 px-8 py-4 rounded-full shadow-2xl flex items-center justify-center gap-4 animate-bounce-slow">
              <Loader className="w-6 h-6 animate-spin text-[#33b962]" />
              <p className="text-sm font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-widest">Sinkronisasi Data...</p>
            </div>
          </div>
        </section>
      )}

      {/* Filters Section */}
      <section className="relative -mt-12 pb-24 z-20 transition-colors duration-500">
        <div className="container px-4 mx-auto font-plus-jakarta">
          <div className="max-w-6xl mx-auto">
            <div className="p-8 sm:p-12 glass dark:bg-gray-900/40 rounded-[3rem] shadow-2xl border border-white/20 dark:border-white/10">
              <div className="grid gap-12 lg:grid-cols-3">
                {/* Year Selection */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 px-1">
                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-950/30 rounded-xl flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#33b962]" />
                    </div>
                    <label className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">Tahun Ajaran</label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {years.map((year) => (
                      <Button
                        key={year}
                        variant={selectedYear === year ? "default" : "outline"}
                        className={`rounded-2xl px-5 h-12 font-bold transition-all ${selectedYear === year
                          ? "bg-[#33b962] text-white shadow-lg shadow-emerald-500/30 scale-105"
                          : "bg-white/50 dark:bg-black/20 border-white/20 dark:border-white/5 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                          }`}
                        onClick={() => setSelectedYear(year)}
                      >
                        {year}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Grade Selection */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 px-1">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950/30 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                    </div>
                    <label className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">Pilih Kelas</label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {grades.map((grade) => (
                      <Button
                        key={grade.id}
                        variant={selectedGradeId === grade.id ? "default" : "outline"}
                        className={`rounded-2xl px-5 h-12 font-bold transition-all ${selectedGradeId === grade.id
                          ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-105"
                          : "bg-white/50 dark:bg-black/20 border-white/20 dark:border-white/5 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                          }`}
                        onClick={() => {
                          setSelectedGradeId(grade.id)
                          setSelectedClass(null)
                        }}
                      >
                        {grade.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Class Selection */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 px-1">
                    <div className="w-10 h-10 bg-amber-100 dark:bg-amber-950/30 rounded-xl flex items-center justify-center">
                      <Users className="w-5 h-5 text-amber-500" />
                    </div>
                    <label className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">Pilih Rombel</label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {!selectedGradeId ? (
                      <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-black/20 rounded-2xl border border-dashed border-gray-200 dark:border-white/5 w-full">
                        <Loader className="w-4 h-4 text-gray-400" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Pilih kelas terlebih dahulu</span>
                      </div>
                    ) : categories.map((cls) => (
                      <Button
                        key={cls}
                        variant={selectedClass === cls ? "default" : "outline"}
                        className={`rounded-2xl px-5 h-12 font-bold transition-all ${selectedClass === cls
                          ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30 scale-105"
                          : "bg-white/50 dark:bg-black/20 border-white/20 dark:border-white/5 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-950/30"
                          }`}
                        onClick={() => setSelectedClass(cls)}
                      >
                        {cls}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Display */}
      {selectedGradeId && selectedClass ? (
        <section className="relative py-24 sm:py-32 bg-gray-50/50 dark:bg-gray-950/50 transition-colors duration-500">
          <div className="container relative z-10 px-4 mx-auto">
            <div className="mx-auto max-w-7xl">
              {/* Header with Print & Download Buttons */}
              <div className="flex flex-col items-start justify-between gap-6 mb-12 md:flex-row md:items-center">
                <div className="space-y-2">
                  <h2 className="text-fluid-h2 font-black text-gray-900 dark:text-white leading-tight">
                    Jadwal {selectedGrade?.name} {selectedClass}
                  </h2>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-[#33b962] rounded-full text-sm font-bold">
                    <Calendar className="w-4 h-4" />
                    Tahun Ajaran {selectedYear}
                  </div>
                </div>

                {/* Print & Download Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant="outline"
                    className="rounded-[1.25rem] px-8 h-14 font-black bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-[#33b962] transition-all shadow-sm"
                    onClick={handlePrint}
                    disabled={isPrinting || !hasSchedule}
                  >
                    <Printer className="w-5 h-5 mr-3" />
                    {isPrinting ? "Menyiapkan..." : "Cetak"}
                  </Button>

                  <Button
                    className="rounded-[1.25rem] px-8 h-14 font-black bg-linear-to-r from-[#33b962] to-[#2a9d52] text-white transition-all shadow-xl hover:shadow-emerald-500/30 hover:scale-105 active:scale-95"
                    onClick={handleDownloadPDF}
                    disabled={isPrinting || !hasSchedule}
                  >
                    <Download className="w-5 h-5 mr-3" />
                    {isPrinting ? "Memproses..." : "Download PDF"}
                  </Button>
                </div>
              </div>

              {/* Loading State with Premium Spinner */}
              {scheduleLoading ? (
                <Card className="card-premium p-32 glass dark:bg-gray-900/40 border-0">
                  <div className="flex flex-col items-center justify-center gap-8">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full border-4 border-emerald-500/20 animate-spin border-t-emerald-500" />
                      <Clock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-[#33b962]" />
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">Memuat Jadwal</p>
                      <p className="text-gray-500 dark:text-gray-400 font-bold">Menyiapkan tampilan terbaik untukmu...</p>
                    </div>
                  </div>
                </Card>
              ) : !hasSchedule ? (
                /* Enhanced Empty State */
                <Card className="card-premium p-24 glass dark:bg-gray-900/40 border-0 transition-all">
                  <div className="flex flex-col items-center justify-center gap-8 text-center max-w-2xl mx-auto">
                    <div className="relative group">
                      <div className="absolute -inset-4 bg-orange-500/10 rounded-full blur-2xl group-hover:scale-110 transition-transform" />
                      <div className="relative flex items-center justify-center w-24 h-24 bg-linear-to-br from-orange-400 to-red-500 rounded-[2rem] shadow-xl text-white">
                        <Calendar className="w-12 h-12" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight">Jadwal Belum Dipublikasikan</h3>
                      <p className="text-lg font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                        Maaf, jadwal pelajaran untuk <span className="text-[#33b962] font-black">{selectedGrade?.name} {selectedClass}</span> di periode <span className="font-bold">{selectedYear}</span> sedang dalam tahap finalisasi oleh tim kurikulum.
                      </p>
                    </div>
                    <div className="p-6 bg-white/50 dark:bg-black/20 border-2 border-dashed border-orange-500/20 rounded-3xl flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center shrink-0 shadow-inner brightness-110">
                        <Loader className="w-6 h-6 text-orange-600 brightness-125" />
                      </div>
                      <p className="text-sm font-bold text-orange-800 dark:text-orange-400 text-left uppercase tracking-wider">Silakan hubungi operator sekolah atau kunjungi kembali nanti.</p>
                    </div>
                  </div>
                </Card>
              ) : (
                /* Premium Schedule Table */
                <>
                  <div className="hidden lg:block">
                    <Card
                      className="card-premium glass dark:bg-gray-900/40 border-0 overflow-hidden shadow-2xl animate-fade-in-up"
                      id="jadwal-table-print"
                    >
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-linear-to-r from-[#33b962] via-[#2a9d52] to-[#238b45] text-white">
                              <th className="py-8 px-10 text-xs font-black uppercase tracking-[0.2em] text-left">Waktu</th>
                              {days.map((day) => (
                                <th key={day} className="py-8 px-6 text-xs font-black uppercase tracking-[0.2em] text-center border-l border-white/10">
                                  {day}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                            {Array.from({
                              length: Math.max(...Object.values(schedule).map((day) => day.length)),
                            }).map((_, timeIndex) => (
                              <tr key={timeIndex} className="group hover:bg-[#33b962]/5 dark:hover:bg-emerald-950/10 transition-colors">
                                <td className="py-8 px-10">
                                  {schedule[days[0]]?.[timeIndex] && (
                                    <div className="flex items-center gap-4 group-hover:scale-105 transition-transform duration-300">
                                      <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-[1.25rem] flex items-center justify-center shrink-0 shadow-xl border border-emerald-100/50 dark:border-emerald-800/20 brightness-110 filter drop-shadow-[0_4px_6px_rgba(51,185,98,0.15)]">
                                        <Clock className="w-6 h-6 text-[#33b962] brightness-125" />
                                      </div>
                                      <span className="text-lg font-black text-gray-900 dark:text-white tracking-tighter whitespace-nowrap">
                                        {schedule[days[0]][timeIndex].time}
                                      </span>
                                    </div>
                                  )}
                                </td>
                                {days.map((day) => {
                                  const lesson = schedule[day as keyof typeof schedule][timeIndex]
                                  if (!lesson) return <td key={day} className="p-3 border-l border-gray-100/50 dark:border-white/5"></td>
                                  return (
                                    <td key={day} className="p-3 border-l border-gray-100/50 dark:border-white/5">
                                      <div className={`${lesson.color} dark:bg-opacity-20 dark:border dark:border-white/10 rounded-[2rem] p-6 text-center transition-all duration-300 hover:scale-[1.05] hover:shadow-xl h-full flex flex-col justify-center min-h-[120px] shadow-sm relative overflow-hidden group/item`}>
                                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                        <p className="text-base font-black text-gray-900 dark:text-white leading-tight mb-2 tracking-tight uppercase">{lesson.subject}</p>
                                        {lesson.teacher !== "-" && (
                                          <p className="text-[10px] font-bold text-gray-600 dark:text-gray-400 leading-snug uppercase tracking-widest line-clamp-2 mt-1">{lesson.teacher}</p>
                                        )}
                                      </div>
                                    </td>
                                  )
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </div>

                  {/* Redesigned Mobile Experience */}
                  <div className="grid grid-cols-1 gap-12 lg:hidden font-plus-jakarta" id="jadwal-table-print">
                    {days.map((day) => (
                      <Card
                        key={day}
                        className="card-premium glass dark:bg-gray-900/40 border-0 shadow-xl overflow-hidden animate-fade-in-up"
                      >
                        <div className="bg-linear-to-r from-[#33b962] via-[#2a9d52] to-[#238b45] text-white p-8 relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Calendar className="w-24 h-24 rotate-12" />
                          </div>
                          <h3 className="text-3xl font-black uppercase tracking-[0.2em] relative z-10">{day}</h3>
                        </div>
                        <div className="p-8 space-y-6">
                          {schedule[day as keyof typeof schedule].map((lesson, index) => (
                            <div
                              key={index}
                              className={`${lesson.color} dark:bg-opacity-20 dark:border dark:border-white/10 rounded-[2.5rem] p-8 transition-all hover:scale-[1.02] shadow-sm border-l-[10px] border-[#33b962] relative group`}
                            >
                              <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 bg-white/50 dark:bg-black/20 rounded-xl backdrop-blur-md">
                                  <Clock className="w-5 h-5 text-[#33b962]" />
                                </div>
                                <span className="text-sm font-black text-gray-700 dark:text-gray-300 tracking-[0.1em] uppercase">{lesson.time}</span>
                              </div>
                              <h4 className="text-2xl font-black text-gray-900 dark:text-white leading-tight mb-3 uppercase tracking-tight">{lesson.subject}</h4>
                              {lesson.teacher !== "-" && (
                                <div className="flex items-center gap-3 text-sm font-bold text-gray-600 dark:text-gray-400">
                                  <div className="w-2.5 h-2.5 rounded-full bg-[#33b962]" />
                                  <span className="italic leading-relaxed">{lesson.teacher}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Refined Color Legend */}
                  <div className="mt-16 p-10 card-premium glass dark:bg-gray-900/40 border-0">
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-1.5 h-8 bg-[#33b962] rounded-full" />
                      <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-[0.3em]">Legenda Warna Mata Pelajaran</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                      {Object.entries(colorLegend).map(([colorClass, subject]) => (
                        <div key={colorClass} className="flex items-center gap-4 group transition-all hover:scale-105">
                          <div className={`w-10 h-10 rounded-2xl shadow-lg border border-white/20 dark:border-white/5 transition-transform group-hover:rotate-6 ${colorClass} dark:bg-opacity-60`} />
                          <span className="text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-tight line-clamp-2 leading-tight">{subject}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      ) : (
        /* Enhanced Initial State Experience */
        <section className="relative py-32 bg-gray-50/50 dark:bg-gray-950/50 transition-colors duration-500 overflow-hidden">
          <div className="container relative z-10 px-4 mx-auto text-center">
            <div className="max-w-2xl mx-auto card-premium glass dark:bg-gray-900/40 p-16 border-0 shadow-2xl relative group">
              <div className="absolute inset-0 bg-linear-to-br from-[#33b962]/5 to-transparent opacity-50 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-center w-32 h-32 mx-auto mb-10 bg-linear-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-950/20 rounded-[2.5rem] shadow-inner transition-all duration-700 group-hover:scale-110 group-hover:rotate-6">
                  <Calendar className="w-16 h-16 text-[#33b962] animate-float" />
                </div>
                <h3 className="mb-6 text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Kesiapan Belajar</h3>
                <p className="text-xl font-medium text-gray-600 dark:text-gray-400 leading-relaxed mb-10">
                  Ayo mulai harimu dengan terencana! Pilih <span className="text-[#33b962] font-black">Kelas</span> dan <span className="text-[#33b962] font-black">Rombel</span> di atas untuk melihat agenda belajarmu.
                </p>
                <div className="flex justify-center items-center gap-6">
                  {[1, 2, 3].map((v) => (
                    <div key={v} className={`h-2 rounded-full bg-[#33b962] transition-all duration-700 ${v === 1 ? 'w-12 mx-1' : 'w-2 opacity-20'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
