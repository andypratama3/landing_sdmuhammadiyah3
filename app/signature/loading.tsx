
export default function VerifyLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero strip skeleton */}
      <div className="bg-primary py-10 px-4 text-center">
        <div className="animate-shimmer bg-gradient-to-r from-white/10 via-white/20 to-white/10 h-3 w-40 rounded-full mx-auto mb-3" />
        <div className="animate-shimmer bg-gradient-to-r from-white/10 via-white/20 to-white/10 h-7 w-72 rounded-full mx-auto mb-2" />
        <div className="animate-shimmer bg-gradient-to-r from-white/10 via-white/20 to-white/10 h-4 w-52 rounded-full mx-auto" />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10 space-y-4">
        {/* Status card skeleton */}
        <div className="rounded-2xl bg-muted animate-pulse h-28" />

        {/* Detail card skeleton */}
        <div className="rounded-2xl bg-card border border-border shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex justify-between">
            <div className="h-4 w-28 bg-muted rounded animate-pulse" />
            <div className="h-5 w-24 bg-muted rounded-full animate-pulse" />
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="px-5 py-3 border-b border-border flex gap-3 last:border-0">
              <div className="h-3.5 w-36 bg-muted rounded animate-pulse shrink-0" />
              <div className="h-3.5 bg-muted rounded animate-pulse" style={{ width: `${45 + i * 8}%` }} />
            </div>
          ))}
        </div>

        {/* Signature skeleton */}
        <div className="rounded-xl border border-dashed border-border bg-muted/40 p-4 space-y-2">
          <div className="h-2.5 w-28 bg-muted rounded animate-pulse" />
          <div className="h-3 bg-muted rounded animate-pulse w-full" />
          <div className="h-3 bg-muted rounded animate-pulse w-4/5" />
        </div>
      </div>
    </div>
  )
}