"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Breadcrumb from "@/components/breadcrumb"
import { Calendar, Clock, Download, Printer } from "lucide-react"
import { useState } from "react"

export default function JadwalPage() {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null)
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState("2025/2026")

  const grades = [1, 2, 3, 4, 5, 6]
  const classes = ["A", "B", "C", "D", "E"]
  const years = ["2025/2026", "2024/2025", "2023/2024"]

  const schedule = {
    Senin: [
      { time: "07:00-07:30", subject: "Upacara", teacher: "-", color: "bg-gray-100" },
      { time: "07:30-08:30", subject: "Matematika", teacher: "Siti Nurhaliza", color: "bg-blue-100" },
      { time: "08:30-09:30", subject: "Bahasa Indonesia", teacher: "Budi Santoso", color: "bg-green-100" },
      { time: "09:30-10:00", subject: "Istirahat", teacher: "-", color: "bg-gray-100" },
      { time: "10:00-11:00", subject: "IPA", teacher: "Rina Kusuma", color: "bg-orange-100" },
      { time: "11:00-12:00", subject: "Pendidikan Agama", teacher: "Ahmad Fauzi", color: "bg-purple-100" },
      { time: "12:00-13:00", subject: "ISHOMA", teacher: "-", color: "bg-gray-100" },
      { time: "13:00-14:00", subject: "Tahfidz", teacher: "Ahmad Fauzi", color: "bg-purple-100" },
    ],
    Selasa: [
      { time: "07:00-08:00", subject: "Bahasa Inggris", teacher: "Dewi Lestari", color: "bg-red-100" },
      { time: "08:00-09:00", subject: "Matematika", teacher: "Siti Nurhaliza", color: "bg-blue-100" },
      { time: "09:00-10:00", subject: "IPS", teacher: "Rudi Hartono", color: "bg-orange-100" },
      { time: "10:00-10:30", subject: "Istirahat", teacher: "-", color: "bg-gray-100" },
      { time: "10:30-11:30", subject: "Seni Budaya", teacher: "Sari Indah", color: "bg-pink-100" },
      { time: "11:30-12:30", subject: "PJOK", teacher: "Hendra Wijaya", color: "bg-yellow-100" },
      { time: "12:30-13:30", subject: "ISHOMA", teacher: "-", color: "bg-gray-100" },
      { time: "13:30-14:30", subject: "Ekstrakurikuler", teacher: "Pembina", color: "bg-indigo-100" },
    ],
    Rabu: [
      { time: "07:00-08:00", subject: "Matematika", teacher: "Siti Nurhaliza", color: "bg-blue-100" },
      { time: "08:00-09:00", subject: "Bahasa Indonesia", teacher: "Budi Santoso", color: "bg-green-100" },
      { time: "09:00-10:00", subject: "IPA", teacher: "Rina Kusuma", color: "bg-orange-100" },
      { time: "10:00-10:30", subject: "Istirahat", teacher: "-", color: "bg-gray-100" },
      { time: "10:30-11:30", subject: "Pendidikan Agama", teacher: "Ahmad Fauzi", color: "bg-purple-100" },
      { time: "11:30-12:30", subject: "Bahasa Inggris", teacher: "Dewi Lestari", color: "bg-red-100" },
      { time: "12:30-13:30", subject: "ISHOMA", teacher: "-", color: "bg-gray-100" },
      { time: "13:30-14:30", subject: "Tahfidz", teacher: "Ahmad Fauzi", color: "bg-purple-100" },
    ],
    Kamis: [
      { time: "07:00-08:00", subject: "IPS", teacher: "Rudi Hartono", color: "bg-orange-100" },
      { time: "08:00-09:00", subject: "Matematika", teacher: "Siti Nurhaliza", color: "bg-blue-100" },
      { time: "09:00-10:00", subject: "Bahasa Indonesia", teacher: "Budi Santoso", color: "bg-green-100" },
      { time: "10:00-10:30", subject: "Istirahat", teacher: "-", color: "bg-gray-100" },
      { time: "10:30-11:30", subject: "PJOK", teacher: "Hendra Wijaya", color: "bg-yellow-100" },
      { time: "11:30-12:30", subject: "Seni Budaya", teacher: "Sari Indah", color: "bg-pink-100" },
      { time: "12:30-13:30", subject: "ISHOMA", teacher: "-", color: "bg-gray-100" },
      { time: "13:30-14:30", subject: "Ekstrakurikuler", teacher: "Pembina", color: "bg-indigo-100" },
    ],
    Jumat: [
      { time: "07:00-07:30", subject: "Senam Pagi", teacher: "-", color: "bg-gray-100" },
      { time: "07:30-08:30", subject: "Pendidikan Agama", teacher: "Ahmad Fauzi", color: "bg-purple-100" },
      { time: "08:30-09:30", subject: "Matematika", teacher: "Siti Nurhaliza", color: "bg-blue-100" },
      { time: "09:30-10:00", subject: "Istirahat", teacher: "-", color: "bg-gray-100" },
      { time: "10:00-11:00", subject: "Bahasa Indonesia", teacher: "Budi Santoso", color: "bg-green-100" },
      { time: "11:00-11:30", subject: "Jumat Bersih", teacher: "-", color: "bg-gray-100" },
    ],
  }

  const days = Object.keys(schedule)

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#33b962] via-[#2a9d52] to-[#238b45] py-20 text-white">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: "Jadwal Pelajaran" }]} />
          <div className="max-w-4xl mx-auto text-center mt-8">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 px-4 py-2">Schedule</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Jadwal Pelajaran</h1>
            <p className="text-xl text-white/90 text-balance leading-relaxed">
              Jadwal pembelajaran yang terstruktur untuk mendukung proses belajar optimal
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Year Selection */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Tahun Ajaran</label>
              <div className="flex gap-2 flex-wrap">
                {years.map((year) => (
                  <Button
                    key={year}
                    variant={selectedYear === year ? "default" : "outline"}
                    className={`rounded-full ${selectedYear === year ? "bg-[#33b962] hover:bg-[#2a9d52]" : "bg-transparent"}`}
                    onClick={() => setSelectedYear(year)}
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </div>

            {/* Grade Selection */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Pilih Kelas <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2 flex-wrap">
                {grades.map((grade) => (
                  <Button
                    key={grade}
                    variant={selectedGrade === grade ? "default" : "outline"}
                    className={`rounded-full ${selectedGrade === grade ? "bg-[#33b962] hover:bg-[#2a9d52]" : "bg-transparent"}`}
                    onClick={() => {
                      setSelectedGrade(grade)
                      setSelectedClass(null)
                    }}
                  >
                    Kelas {grade}
                  </Button>
                ))}
              </div>
            </div>

            {/* Class Selection */}
            {selectedGrade && (
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Pilih Rombel <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2 flex-wrap">
                  {classes.map((cls) => (
                    <Button
                      key={cls}
                      variant={selectedClass === cls ? "default" : "outline"}
                      className={`rounded-full ${selectedClass === cls ? "bg-[#33b962] hover:bg-[#2a9d52]" : "bg-transparent"}`}
                      onClick={() => setSelectedClass(cls)}
                    >
                      {cls}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Schedule Display */}
      {selectedGrade && selectedClass ? (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Jadwal Kelas {selectedGrade}
                    {selectedClass}
                  </h2>
                  <p className="text-gray-600">Tahun Ajaran {selectedYear}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="rounded-full bg-transparent">
                    <Printer className="w-4 h-4 mr-2" />
                    Cetak
                  </Button>
                  <Button variant="outline" className="rounded-full bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>

              {/* Desktop Schedule Table */}
              <div className="hidden lg:block">
                <Card className="overflow-hidden rounded-3xl border-0 shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-[#33b962] to-[#2a9d52] text-white">
                        <tr>
                          <th className="p-4 text-left font-semibold">Waktu</th>
                          {days.map((day) => (
                            <th key={day} className="p-4 text-center font-semibold">
                              {day}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({
                          length: Math.max(...Object.values(schedule).map((day) => day.length)),
                        }).map((_, timeIndex) => (
                          <tr key={timeIndex} className="border-b hover:bg-gray-50">
                            <td className="p-4 font-medium text-gray-700 whitespace-nowrap">
                              {schedule.Senin[timeIndex] && (
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-[#33b962]" />
                                  {schedule.Senin[timeIndex].time}
                                </div>
                              )}
                            </td>
                            {days.map((day) => {
                              const lesson = schedule[day as keyof typeof schedule][timeIndex]
                              if (!lesson) return <td key={day} className="p-2"></td>
                              return (
                                <td key={day} className="p-2">
                                  <div className={`${lesson.color} rounded-xl p-3 text-center`}>
                                    <p className="font-semibold text-gray-900 text-sm">{lesson.subject}</p>
                                    {lesson.teacher !== "-" && (
                                      <p className="text-xs text-gray-600 mt-1">{lesson.teacher}</p>
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

              {/* Mobile Schedule Accordion */}
              <div className="lg:hidden space-y-4">
                {days.map((day) => (
                  <Card key={day} className="overflow-hidden rounded-3xl border-0 shadow-lg">
                    <div className="bg-gradient-to-r from-[#33b962] to-[#2a9d52] text-white p-4">
                      <h3 className="font-bold text-lg">{day}</h3>
                    </div>
                    <div className="p-4 space-y-3">
                      {schedule[day as keyof typeof schedule].map((lesson, index) => (
                        <div key={index} className={`${lesson.color} rounded-xl p-4`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-600">{lesson.time}</span>
                          </div>
                          <p className="font-bold text-gray-900">{lesson.subject}</p>
                          {lesson.teacher !== "-" && <p className="text-sm text-gray-600 mt-1">{lesson.teacher}</p>}
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 mb-4">Keterangan Warna:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded" />
                    <span className="text-sm text-gray-600">Matematika</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-100 rounded" />
                    <span className="text-sm text-gray-600">Bahasa Indonesia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-orange-100 rounded" />
                    <span className="text-sm text-gray-600">IPA/IPS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-purple-100 rounded" />
                    <span className="text-sm text-gray-600">Pendidikan Agama</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-red-100 rounded" />
                    <span className="text-sm text-gray-600">Bahasa Inggris</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-yellow-100 rounded" />
                    <span className="text-sm text-gray-600">PJOK</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-pink-100 rounded" />
                    <span className="text-sm text-gray-600">Seni Budaya</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-100 rounded" />
                    <span className="text-sm text-gray-600">Istirahat</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Silakan pilih kelas dan rombel untuk melihat jadwal</p>
          </div>
        </section>
      )}
    </div>
  )
}
