"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Download, Printer, Loader } from "lucide-react"
import { useState } from "react"
import { useApi } from "@/hooks/useApi"
import { JadwalItem } from "@/types"

// ========== COLOR MAPPING ==========
const colorMap: Record<string, string> = {
  'bg-blue-100': '#dbeafe',
  'bg-green-100': '#dcfce7',
  'bg-orange-100': '#fed7aa',
  'bg-purple-100': '#e9d5ff',
  'bg-red-100': '#fee2e2',
  'bg-yellow-100': '#fef3c7',
  'bg-pink-100': '#fbcfe8',
  'bg-indigo-100': '#e0e7ff',
  'bg-gray-100': '#f3f4f6',
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
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="bg-linear-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] py-20 text-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto mt-8 text-center">
            <Badge className="px-4 py-2 mb-6 text-white bg-white/20 border-white/30">Schedule</Badge>
            <h1 className="mb-6 text-5xl font-bold md:text-6xl text-balance">Jadwal Pelajaran</h1>
            <p className="text-xl leading-relaxed text-white/90 text-balance">
              Jadwal pembelajaran yang terstruktur untuk mendukung proses belajar optimal
            </p>
          </div>
        </div>
      </section>

      {/* Loading Initial Data */}
      {isInitialLoading && (
        <section className="py-8 border-b border-blue-200 bg-blue-50">
          <div className="container px-4 mx-auto">
            <div className="flex items-center justify-center gap-3">
              <Loader className="w-5 h-5 animate-spin text-[#33b962]" />
              <p className="text-sm text-gray-600">Memuat data jadwal...</p>
            </div>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="py-12 bg-white border-b">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Year Selection */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Tahun Ajaran</label>
              <div className="flex flex-wrap gap-2">
                {yearsLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader className="w-4 h-4 animate-spin text-[#33b962]" />
                    <span className="text-sm text-gray-500">Memuat tahun ajaran...</span>
                  </div>
                ) : years.length > 0 ? (
                  years.map((year) => (
                    <Button
                      key={year}
                      variant={selectedYear === year ? "default" : "outline"}
                      className={`rounded-full transition-all ${
                        selectedYear === year 
                          ? "bg-[#33b962] hover:bg-[#2a9d52]" 
                          : "bg-transparent hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedYear(year)}
                    >
                      {year}
                    </Button>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Tidak ada tahun ajaran</p>
                )}
              </div>
            </div>

            {/* Grade Selection */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Pilih Kelas <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {gradesLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader className="w-4 h-4 animate-spin text-[#33b962]" />
                    <span className="text-sm text-gray-500">Memuat kelas...</span>
                  </div>
                ) : grades.length > 0 ? (
                  grades.map((grade) => (
                    <Button
                      key={grade.id}
                      variant={selectedGradeId === grade.id ? "default" : "outline"}
                      className={`rounded-full transition-all ${
                        selectedGradeId === grade.id 
                          ? "bg-[#33b962] hover:bg-[#2a9d52]" 
                          : "bg-transparent hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setSelectedGradeId(grade.id)
                        setSelectedClass(null)
                      }}
                    >
                      {grade.name}
                    </Button>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Tidak ada kelas</p>
                )}
              </div>
            </div>

            {/* Class Selection */}
            {selectedGradeId && (
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Pilih Rombel <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {categoriesLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader className="w-4 h-4 animate-spin text-[#33b962]" />
                      <span className="text-sm text-gray-500">Memuat rombel...</span>
                    </div>
                  ) : categories.length > 0 ? (
                    categories.map((cls) => (
                      <Button
                        key={cls}
                        variant={selectedClass === cls ? "default" : "outline"}
                        className={`rounded-full transition-all ${
                          selectedClass === cls 
                            ? "bg-[#33b962] hover:bg-[#2a9d52]" 
                            : "bg-transparent hover:bg-gray-100"
                        }`}
                        onClick={() => setSelectedClass(cls)}
                      >
                        {cls}
                      </Button>
                    ))
                  ) : (
                    <p className="text-gray-500">Tidak ada kategori kelas untuk grade ini</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Schedule Display */}
      {selectedGradeId && selectedClass ? (
        <section className="py-16 bg-gray-50">
          <div className="container px-4 mx-auto">
            <div className="mx-auto max-w-7xl">
              {/* Header dengan Print & Download Buttons */}
              <div className="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center">
                <div>
                  <h2 className="mb-2 text-3xl font-bold text-gray-900">
                    Jadwal {selectedGrade?.name} {selectedClass}
                  </h2>
                  <p className="text-gray-600">Tahun Ajaran {selectedYear}</p>
                </div>
                
                {/* BUTTON CETAK & DOWNLOAD PDF */}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="transition-all bg-transparent rounded-full hover:bg-gray-100"
                    onClick={handlePrint}
                    disabled={isPrinting || !hasSchedule}
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    {isPrinting ? "Preparing..." : "Cetak"}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="transition-all bg-transparent rounded-full hover:bg-gray-100"
                    onClick={handleDownloadPDF}
                    disabled={isPrinting || !hasSchedule}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {isPrinting ? "Preparing..." : "Download PDF"}
                  </Button>
                </div>
              </div>

              {/* Loading State dengan Effect */}
              {scheduleLoading ? (
                <Card className="overflow-hidden bg-white border-0 shadow-lg rounded-3xl">
                  <div className="p-12">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="relative w-16 h-16">
                        <div className="absolute inset-0 bg-linear-to-r rounded-2xl from-[#33b962] to-[#2a9d52] rounded-full animate-spin" 
                             style={{ animation: 'spin 3s linear infinite' }}></div>
                        <div className="absolute bg-white rounded-full inset-1"></div>
                        <Clock className="absolute inset-0 m-auto w-8 h-8 text-[#33b962]" />
                      </div>
                      <p className="font-medium text-center text-gray-600">Memuat jadwal pelajaran...</p>
                      <p className="text-sm text-center text-gray-400">Mohon tunggu beberapa saat</p>
                    </div>
                  </div>
                  <style>{`
                    @keyframes spin {
                      from { transform: rotate(0deg); }
                      to { transform: rotate(360deg); }
                    }
                  `}</style>
                </Card>
              ) : hasSchedule ? (
                <>
                  {/* No Schedule Card */}
                  {!hasSchedule && (
                    <Card className="overflow-hidden border-0 shadow-lg rounded-3xl bg-linear-to-br from-orange-50 to-red-50">
                      <div className="p-12">
                        <div className="flex flex-col items-center justify-center gap-4 text-center">
                          <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full">
                            <Calendar className="w-8 h-8 text-orange-500" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-800">Jadwal Tidak Tersedia</h3>
                          <p className="max-w-sm text-gray-600">
                            Maaf, jadwal untuk <strong>{selectedGrade?.name} {selectedClass}</strong> tahun ajaran <strong>{selectedYear}</strong> belum tersedia atau belum diatur oleh admin.
                          </p>
                          <p className="mt-4 text-sm text-gray-500">
                            Silakan hubungi admin atau coba pilih kelas/rombel lain.
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}
                  {/* Desktop Schedule Table */}
                  <div className="hidden lg:block">
                    <Card 
                      className="overflow-hidden duration-500 border-0 shadow-xl rounded-3xl animate-in fade-in"
                      id="jadwal-table-print"
                    >
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-linear-to-r from-[#33b962] to-[#2a9d52] text-white ">
                            <tr>
                              <th className="p-4 font-semibold text-left">Waktu</th>
                              {days.map((day) => (
                                <th key={day} className="p-4 font-semibold text-center">
                                  {day}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {Array.from({
                              length: Math.max(...Object.values(schedule).map((day) => day.length)),
                            }).map((_, timeIndex) => (
                              <tr key={timeIndex} className="transition-colors border-b hover:bg-gray-50">
                                <td className="p-4 font-medium text-gray-700 whitespace-nowrap">
                                  {schedule[days[0]]?.[timeIndex] && (  
                                    <div className="flex items-center gap-2">
                                      <Clock className="w-4 h-4 text-[#33b962]" />
                                        {schedule[days[0]][timeIndex].time}
                                    </div>
                                  )}
                                </td>
                                {days.map((day) => {
                                  const lesson = schedule[day as keyof typeof schedule][timeIndex]
                                  if (!lesson) return <td key={day} className="p-2"></td>
                                  return (
                                    <td key={day} className="p-2">
                                      <div className={`${lesson.color} rounded-xl p-3 text-center transition-all hover:shadow-md`}>
                                        <p className="text-sm font-semibold text-gray-900">{lesson.subject}</p>
                                        {lesson.teacher !== "-" && (
                                          <p className="mt-1 text-xs text-gray-600">{lesson.teacher}</p>
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

                  {/* Mobile Schedule */}
                  <div className="space-y-4 lg:hidden" id="jadwal-table-print">
                    {days.map((day) => (
                      <Card 
                        key={day} 
                        className="overflow-hidden duration-500 border-0 shadow-lg rounded-3xl animate-in fade-in"
                      >
                        <div className="bg-linear-to-r from-[#33b962] to-[#2a9d52] text-white rounded-2xl p-4">
                          <h3 className="text-lg font-bold">{day}</h3>
                        </div>
                        <div className="p-4 space-y-3">
                          {schedule[day as keyof typeof schedule].map((lesson, index) => (
                            <div 
                              key={index} 
                              className={`${lesson.color} rounded-xl p-4 transition-all hover:shadow-md`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-600">{lesson.time}</span>
                              </div>
                              <p className="font-bold text-gray-900">{lesson.subject}</p>
                              {lesson.teacher !== "-" && (
                                <p className="mt-1 text-sm text-gray-600">{lesson.teacher}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                  <div className="mt-8">
                    <h3 className="mb-4 font-semibold text-gray-900">Keterangan Warna:</h3>

                    {Object.keys(colorLegend).length > 0 ? (
                      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
                        {Object.entries(colorLegend).map(([colorClass, subject]) => (
                          <div key={colorClass} className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded ${colorClass}`} />
                            <span className="text-sm text-gray-600">{subject}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">Tidak ada keterangan warna</p>
                    )}
                  </div>
                  
                </>
              ) : (
                // ========== NO SCHEDULE CARD ==========
                <Card className="overflow-hidden border-0 shadow-lg rounded-3xl bg-linear-to-br from-orange-50 to-red-50">
                  <div className="p-12">
                    <div className="flex flex-col items-center justify-center gap-4 text-center">
                      <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full">
                        <Calendar className="w-8 h-8 text-orange-500" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">Jadwal Tidak Tersedia</h3>
                      <p className="max-w-sm text-gray-600">
                        Maaf, jadwal untuk <strong>{selectedGrade?.name} {selectedClass}</strong> tahun ajaran <strong>{selectedYear}</strong> belum tersedia atau belum diatur oleh admin.
                      </p>
                      <p className="mt-4 text-sm text-gray-500">
                        Silakan hubungi admin atau coba pilih kelas/rombel lain.
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-20 bg-gray-50">
          <div className="container px-4 mx-auto text-center">
            <div className="max-w-sm mx-auto">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gray-200 rounded-full">
                <Calendar className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">Pilih Jadwal Anda</h3>
              <p className="text-gray-600">Silakan pilih tahun ajaran, kelas, dan rombel untuk melihat jadwal pelajaran</p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}