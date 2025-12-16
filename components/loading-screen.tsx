export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-[#ffd166] rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
          <span className="text-3xl">🎈</span>
        </div>
        <p className="text-gray-600 font-medium">Memuat...</p>
        <div className="w-48 h-1 bg-gray-200 rounded-full mt-4 overflow-hidden">
          <div className="h-full bg-[#33b962] rounded-full animate-pulse" style={{ width: "60%" }} />
        </div>
      </div>
    </div>
  )
}
