export function GalleryCardSkeleton() {
  return (
    <div className="relative overflow-hidden bg-gray-200 rounded-2xl aspect-square dark:bg-gray-700">
      {/* Shimmer */}
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 dark:from-gray-600 dark:via-gray-700 dark:to-gray-600" />

      {/* Text placeholder */}
      <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
        <div className="w-3/4 h-4 bg-gray-400 rounded dark:bg-gray-600" />
        <div className="w-1/2 h-3 bg-gray-400 rounded dark:bg-gray-600" />
      </div>
    </div>
  )
}
