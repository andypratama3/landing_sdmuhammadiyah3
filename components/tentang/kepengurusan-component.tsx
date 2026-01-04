interface OrgStructureItem {
  id: string
  name: string
  position: string
  division: "leadership" | "curriculum" | "student" | "admin"
  icon?: string
}

interface StrukturKepengurusanProps {
  data?: OrgStructureItem[]
  title?: string
  subtitle?: string
}

const defaultOrgStructure: OrgStructureItem[] = [
  {
    id: "kepala-sekolah",
    name: "ANSOR HS, S.Pd., M.M., Gr.",
    position: "Kepala Sekolah",
    division: "leadership",
    icon: "👔",
  },
  {
    id: "komite-sekolah",
    name: "-",
    position: "Komite Sekolah",
    division: "leadership",
    icon: "🤝",
  },

  // STUDENT - Bidang Kesiswaan
  {
    id: "wakil-kesiswaan",
    name: "MISBAHUL JUM'AH, S.Pd.I",
    position: "Wakil Kepala Bidang Kesiswaan",
    division: "student",
    icon: "👥",
  },
  {
    id: "bendahara-sekolah",
    name: "PRANANDA PRIYANDAN MAHMUD, S.E.",
    position: "Bendahara Sekolah",
    division: "student",
    icon: "💰",
  },
  {
    id: "lifeguard",
    name: "FARHAN ALARBY",
    position: "Lifeguard",
    division: "student",
    icon: "🏊",
  },
  {
    id: "security",
    name: "RASYA PUTRA I",
    position: "Security",
    division: "student",
    icon: "👮",
  },
  {
    id: "resepsionist",
    name: "LISA AGUS TINA, S.E., M.M.",
    position: "Resepsionist",
    division: "student",
    icon: "📞",
  },

  // CURRICULUM - Bidang Kurikulum
  {
    id: "wakil-kurikulum",
    name: "WIWIK KURNIASIH, S.Pd",
    position: "Wakil Kepala Bidang Kurikulum",
    division: "curriculum",
    icon: "📚",
  },
  {
    id: "kebersihanfatimah",
    name: "FATIMAH ABDUL SAHID",
    position: "Kebersihan",
    division: "curriculum",
    icon: "🧹",
  },
  {
    id: "perpustakaan",
    name: "NURHAYATI",
    position: "Perpustakaan Digital",
    division: "curriculum",
    icon: "📖",
  },

  // DEWAN GURU - Teaching Staff
  {
    id: "kelas1-mekkah",
    name: "ANISA SETYA DEWI, S.Pd",
    position: "Kelas I Mekkah",
    division: "curriculum",
    icon: "👨‍🏫",
  },
  {
    id: "kelas1-mekkah-2",
    name: "CUTI FITRIYANI AMIN, S.Pd",
    position: "Kelas I Mekkah",
    division: "curriculum",
    icon: "👨‍🏫",
  },
  {
    id: "kelas1-madinah",
    name: "MISBAHUL JUM'AH, S.Pd.I",
    position: "Kelas I Madinah",
    division: "curriculum",
    icon: "👨‍🏫",
  },
  {
    id: "kelas1-madinah-2",
    name: "IMAYAH JULIANA, S.Pd",
    position: "Kelas I Madinah",
    division: "curriculum",
    icon: "👨‍🏫",
  },
  {
    id: "kelas1-istanbul",
    name: "TENDRI RIDWAN, S.Pd, Gr.",
    position: "Kelas I Istanbul",
    division: "curriculum",
    icon: "👨‍🏫",
  },
  {
    id: "kelas1-istanbul-2",
    name: "APRIZAL SAPUTRA",
    position: "Kelas I Istanbul",
    division: "curriculum",
    icon: "👨‍🏫",
  },
  {
    id: "kelas1-baghdad",
    name: "MEIRNA ROSMAYANI, M.Pd",
    position: "Kelas I Baghdad",
    division: "curriculum",
    icon: "👨‍🏫",
  },
  {
    id: "kelas1-baghdad-2",
    name: "MIRATULI AULIA, S.Sos",
    position: "Kelas I Baghdad",
    division: "curriculum",
    icon: "👨‍🏫",
  },
  {
    id: "kelas1-jeddah",
    name: "MASHITHO NURHIDAYAH, S.Pd",
    position: "Kelas I Jeddah",
    division: "curriculum",
    icon: "👨‍🏫",
  },
  {
    id: "kelas1-jeddah-2",
    name: "RANTI CHANDRA, S.Pd",
    position: "Kelas I Jeddah",
    division: "curriculum",
    icon: "👨‍🏫",
  },
  {
    id: "kelas2-alexandria",
    name: "BELLA DIYAS MEIRA K, S.Pd",
    position: "Kelas II Alexandria",
    division: "curriculum",
    icon: "👨‍🏫",
  },
  {
    id: "kelas2-alexandria-2",
    name: "DITA ANGGRAENI, S.Pd",
    position: "Kelas II Alexandria",
    division: "curriculum",
    icon: "👨‍🏫",
  },
  {
    id: "kelas2-kairo",
    name: "HELDA SAPARINAS, S.Pd",
    position: "Kelas II Kairo",
    division: "curriculum",
    icon: "👨‍🏫",
  },
  {
    id: "kelas2-kairo-2",
    name: "BAGUS ABDURRAHIM, S.Ag",
    position: "Kelas II Kairo",
    division: "curriculum",
    icon: "👨‍🏫",
  },
  {
    id: "kelas2-ankara",
    name: "DHEA CAHYANTARI W, S.Pd",
    position: "Kelas II Ankara",
    division: "curriculum",
    icon: "👨‍🏫",
  },
  {
    id: "kelas2-ankara-2",
    name: "ALPINA NUR PADILA, S.Sos",
    position: "Kelas II Ankara",
    division: "curriculum",
    icon: "👨‍🏫",
  },
  {
    id: "kelas3-granada",
    name: "ERSA DIAN CHOIROTUNISAK, S.Pd",
    position: "Kelas III Granada",
    division: "curriculum",
    icon: "👨‍🏫",
  },
  {
    id: "kelas3-damaskus",
    name: "UMMU KHAIRINI NISA, S.Pd",
    position: "Kelas III Damaskus",
    division: "curriculum",
    icon: "👨‍🏫",
  },
  {
    id: "kelas3-cordova",
    name: "NURUL AIZAH, S.Pd",
    position: "Kelas III Cordova",
    division: "curriculum",
    icon: "👨‍🏫",
  },
  {
    id: "kelas4-bukhara",
    name: "KELAS IV BUKHARA",
    position: "Kelas IV Bukhara",
    division: "curriculum",
    icon: "👨‍🏫",
  },
  {
    id: "kelas4-ammam",
    name: "INDRI MARYANTI, M.Pd",
    position: "Kelas IV Amman",
    division: "curriculum",
    icon: "👨‍🏫",
  },
  {
    id: "kelas4-tarim",
    name: "KELAS IV TARIM",
    position: "Kelas IV Tarim",
    division: "curriculum",
    icon: "👨‍🏫",
  },
  {
    id: "kelas5-quds",
    name: "MUHAMMAD RIZAL, S.Pd, Gr.",
    position: "Kelas V Al-Quds",
    division: "curriculum",
    icon: "👨‍🏫",
  },
  {
    id: "kelas5-andalusia",
    name: "ANDRIYANI MUHAMAD, S.Pd, Gr.",
    position: "Kelas V Andalusia",
    division: "curriculum",
    icon: "👨‍🏫",
  },
  {
    id: "kelas6-abudhabi",
    name: "WIWIK KURNIASIH, S.Pd",
    position: "Kelas VI Abu Dhabi",
    division: "curriculum",
    icon: "👨‍🏫",
  },
  {
    id: "kelas6-gaza",
    name: "MARLINA DEWI, S.Pd",
    position: "Kelas VI Gaza",
    division: "curriculum",
    icon: "👨‍🏫",
  },

  // ADMIN - Bidang Humas & Media Sosial
  {
    id: "wakil-humas",
    name: "SYEKH BUDI SYAM, M.Kom",
    position: "Wakil Kepala Bidang Humas & Media Sosial",
    division: "admin",
    icon: "📱",
  },
  {
    id: "kepala-tatausaha",
    name: "RUSMINI, S.Pd",
    position: "Kepala Tata Usaha",
    division: "admin",
    icon: "📋",
  },
  {
    id: "operator-sekolah",
    name: "FADHILATURRAHMAN, S.Pd",
    position: "Operator Sekolah",
    division: "admin",
    icon: "💻",
  },
  {
    id: "administrasi-sekolah",
    name: "RIMA MELATI",
    position: "Administrasi Sekolah",
    division: "admin",
    icon: "📄",
  },
  {
    id: "media-sosial",
    name: "RENALDI",
    position: "Media Sosial Sekolah",
    division: "admin",
    icon: "📸",
  },

  // STUDI - Subject Teachers
  {
    id: "studi-islam",
    name: "B. Studi Al-Islam (PAI)",
    position: "B. Studi Al-Islam (PAI)",
    division: "curriculum",
    icon: "📖",
  },
  {
    id: "studi-hadits",
    name: "B. Studi Hadits",
    position: "B. Studi Hadits",
    division: "curriculum",
    icon: "📖",
  },
  {
    id: "studi-inggris",
    name: "B. Studi Bahasa Inggris",
    position: "B. Studi Bahasa Inggris",
    division: "curriculum",
    icon: "📖",
  },
  {
    id: "studi-arab",
    name: "B. Studi Bahasa Arab",
    position: "B. Studi Bahasa Arab",
    division: "curriculum",
    icon: "📖",
  },
  {
    id: "studi-tahfidz",
    name: "B. Studi Tahfidz",
    position: "B. Studi Tahfidz",
    division: "curriculum",
    icon: "📖",
  },
  {
    id: "studi-kemuhammadiyahan",
    name: "B. Studi Kemuhammadiyahan",
    position: "B. Studi Kemuhammadiyahan",
    division: "curriculum",
    icon: "📖",
  },
  {
    id: "studi-tik",
    name: "B. Studi TIK",
    position: "B. Studi TIK",
    division: "curriculum",
    icon: "💻",
  },
  {
    id: "studi-pjok",
    name: "B. Studi PJOK",
    position: "B. Studi PJOK",
    division: "curriculum",
    icon: "🏃",
  },
]

const getDivisionColor = (division: OrgStructureItem["division"]) => {
  const colors: Record<string, { bg: string; border: string }> = {
    leadership: { bg: "bg-[#33b962]", border: "border-[#33b962]" },
    curriculum: { bg: "bg-[#3b82f6]", border: "border-[#3b82f6]" },
    student: { bg: "bg-[#a855f7]", border: "border-[#a855f7]" },
    admin: { bg: "bg-[#f97316]", border: "border-[#f97316]" },
  }
  return colors[division] || colors.leadership
}

export default function StrukturKepengurusan({
  data = defaultOrgStructure,
  title = "Struktur Organisasi",
  subtitle = "Tim manajemen sekolah kami",
}: StrukturKepengurusanProps) {
  const groupedByDivision = data.reduce(
    (acc, item) => {
      if (!acc[item.division]) {
        acc[item.division] = []
      }
      acc[item.division].push(item)
      return acc
    },
    {} as Record<OrgStructureItem["division"], OrgStructureItem[]>
  )

  const leadershipItems = groupedByDivision["leadership"] || []
  const curriculumItems = groupedByDivision["curriculum"] || []
  const studentItems = groupedByDivision["student"] || []
  const adminItems = groupedByDivision["admin"] || []

  const headSchool = leadershipItems[0]
  const wakil = leadershipItems[1]

  return (
    <div className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block px-4 py-2 bg-[#33b962]/10 text-[#33b962] border border-[#33b962]/20 rounded-full text-sm font-medium">
            Organisasi
          </div>
          <h2 className="mb-3 text-4xl font-bold text-gray-900 md:text-5xl">
            {title}
          </h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>

        {/* Organizational Chart */}
        <div className="flex justify-center">
          <div className="w-full max-w-6xl">
            {/* Level 1: Kepala Sekolah */}
            <div className="flex justify-center mb-12">
              {headSchool && (
                <div className="bg-gradient-to-br from-[#33b962] to-[#2a9d52] text-white rounded-2xl px-12 py-6 shadow-lg w-full max-w-sm text-center">
                  <div className="flex justify-center mb-3">
                    <div className="flex items-center justify-center text-3xl rounded-full w-14 h-14 bg-white/30">
                      {headSchool.icon}
                    </div>
                  </div>
                  <h3 className="mb-1 text-lg font-bold">{headSchool.position}</h3>
                  <p className="text-sm text-white/90">{headSchool.name}</p>
                </div>
              )}
            </div>

            {/* Vertical line from Kepala to horizontal line */}
            <div className="flex justify-center mb-4">
              <div className="w-1 h-8 bg-gray-300"></div>
            </div>

            {/* Horizontal line connecting to wakil */}
            <div className="relative flex justify-between px-8 mb-8">
              <div className="absolute top-0 h-1 bg-gray-300 left-1/4 right-1/4"></div>
              {/* Vertical connectors */}
              <div className="absolute top-0 w-1 h-8 -translate-x-1/2 bg-gray-300 left-1/4"></div>
              <div className="absolute top-0 w-1 h-8 translate-x-1/2 bg-gray-300 right-1/4"></div>
            </div>

            {/* Level 2: Wakil & Divisi */}
            <div className="grid grid-cols-1 gap-4 mb-12 md:grid-cols-3">
              {/* Kurikulum */}
              <div className="flex flex-col items-center">
                {curriculumItems[0] && (
                  <>
                    <div className={`${getDivisionColor(curriculumItems[0].division).border} border-2 rounded-lg px-4 py-4 text-center w-full bg-white mb-3`}>
                      <div className="flex justify-center mb-2">
                        <div className={`${getDivisionColor(curriculumItems[0].division).bg} text-white w-10 h-10 rounded-full flex items-center justify-center text-xl`}>
                          {curriculumItems[0].icon}
                        </div>
                      </div>
                      <h3 className="mb-1 text-xs font-bold text-gray-900">Wakil Kepala</h3>
                      <p className="mb-1 text-xs text-gray-600">Bidang Kurikulum</p>
                      <p className="text-xs font-semibold text-gray-900">{curriculumItems[0].name}</p>
                    </div>
                    {/* Vertical line down */}
                    <div className="w-1 h-4 mb-2 bg-gray-300"></div>
                  </>
                )}
                {/* Staff cards */}
                <div className="flex flex-col w-full gap-2">
                  {curriculumItems.slice(1).map((item) => (
                    <div key={item.id} className={`${getDivisionColor(item.division).border} border-2 rounded-lg px-2 py-3 text-center bg-white`}>
                      <div className="flex justify-center mb-1">
                        <div className={`${getDivisionColor(item.division).bg} text-white w-8 h-8 rounded-full flex items-center justify-center text-sm`}>
                          {item.icon}
                        </div>
                      </div>
                      <h4 className="text-xs font-semibold text-gray-900 line-clamp-2">{item.position}</h4>
                      <p className="text-xs text-gray-600 line-clamp-1">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kesiswaan */}
              <div className="flex flex-col items-center">
                {studentItems[0] && (
                  <>
                    <div className={`${getDivisionColor(studentItems[0].division).border} border-2 rounded-lg px-4 py-4 text-center w-full bg-white mb-3`}>
                      <div className="flex justify-center mb-2">
                        <div className={`${getDivisionColor(studentItems[0].division).bg} text-white w-10 h-10 rounded-full flex items-center justify-center text-xl`}>
                          {studentItems[0].icon}
                        </div>
                      </div>
                      <h3 className="mb-1 text-xs font-bold text-gray-900">Wakil Kepala</h3>
                      <p className="mb-1 text-xs text-gray-600">Bidang Kesiswaan</p>
                      <p className="text-xs font-semibold text-gray-900">{studentItems[0].name}</p>
                    </div>
                    {/* Vertical line down */}
                    <div className="w-1 h-4 mb-2 bg-gray-300"></div>
                  </>
                )}
                {/* Staff cards */}
                <div className="flex flex-col w-full gap-2">
                  {studentItems.slice(1).map((item) => (
                    <div key={item.id} className={`${getDivisionColor(item.division).border} border-2 rounded-lg px-2 py-3 text-center bg-white`}>
                      <div className="flex justify-center mb-1">
                        <div className={`${getDivisionColor(item.division).bg} text-white w-8 h-8 rounded-full flex items-center justify-center text-sm`}>
                          {item.icon}
                        </div>
                      </div>
                      <h4 className="text-xs font-semibold text-gray-900 line-clamp-2">{item.position}</h4>
                      <p className="text-xs text-gray-600 line-clamp-1">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Humas */}
              <div className="flex flex-col items-center">
                {adminItems[0] && (
                  <>
                    <div className={`${getDivisionColor(adminItems[0].division).border} border-2 rounded-lg px-4 py-4 text-center w-full bg-white mb-3`}>
                      <div className="flex justify-center mb-2">
                        <div className={`${getDivisionColor(adminItems[0].division).bg} text-white w-10 h-10 rounded-full flex items-center justify-center text-xl`}>
                          {adminItems[0].icon}
                        </div>
                      </div>
                      <h3 className="mb-1 text-xs font-bold text-gray-900">Wakil Kepala</h3>
                      <p className="mb-1 text-xs text-gray-600">Bidang Humas</p>
                      <p className="text-xs font-semibold text-gray-900">{adminItems[0].name}</p>
                    </div>
                    {/* Vertical line down */}
                    <div className="w-1 h-4 mb-2 bg-gray-300"></div>
                  </>
                )}
                {/* Staff cards */}
                <div className="flex flex-col w-full gap-2">
                  {adminItems.slice(1).map((item) => (
                    <div key={item.id} className={`${getDivisionColor(item.division).border} border-2 rounded-lg px-2 py-3 text-center bg-white`}>
                      <div className="flex justify-center mb-1">
                        <div className={`${getDivisionColor(item.division).bg} text-white w-8 h-8 rounded-full flex items-center justify-center text-sm`}>
                          {item.icon}
                        </div>
                      </div>
                      <h4 className="text-xs font-semibold text-gray-900 line-clamp-2">{item.position}</h4>
                      <p className="text-xs text-gray-600 line-clamp-1">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Level 3: Komite (if exists) */}
            {wakil && (
              <div className="flex justify-center mt-12">
                <div className="flex flex-col items-center w-full">
                  {/* Vertical line from chart */}
                  <div className="w-1 h-8 mb-4 bg-gray-300"></div>
                  <div className={`${getDivisionColor(wakil.division).border} border-2 rounded-2xl px-10 py-6 text-center w-full max-w-sm bg-white`}>
                    <div className="flex justify-center mb-3">
                      <div className={`${getDivisionColor(wakil.division).bg} text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl`}>
                        {wakil.icon}
                      </div>
                    </div>
                    <h3 className="mb-1 text-sm font-bold text-gray-900">{wakil.position}</h3>
                    <p className="text-xs text-gray-600">{wakil.name}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="p-6 mt-16 border border-gray-200 rounded-xl bg-gray-50">
          <h3 className="mb-4 text-sm font-bold text-gray-900">Keterangan:</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#33b962]" />
              <span className="text-xs text-gray-700">Kepemimpinan</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#3b82f6]" />
              <span className="text-xs text-gray-700">Kurikulum</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#a855f7]" />
              <span className="text-xs text-gray-700">Kesiswaan</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#f97316]" />
              <span className="text-xs text-gray-700">Administrasi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}