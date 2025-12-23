import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen mt-20">
      {/* Header Skeleton */}
      <section className="relative py-20 text-white bg-linear-to-br from-primary via-primary/90 to-primary/80">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto space-y-4 text-center">
            <Skeleton className="w-32 h-6 mx-auto bg-white/20" />
            <Skeleton className="h-12 mx-auto w-96 bg-white/20" />
            <Skeleton className="w-full h-6 max-w-2xl mx-auto bg-white/20" />
            
            {/* Search Bar Skeleton */}
            <div className="max-w-2xl pt-4 mx-auto">
              <Skeleton className="w-full rounded-lg h-14 bg-white/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured News Skeleton */}
      <section className="py-16 bg-background">
        <div className="container px-4 mx-auto">
          <Card className="overflow-hidden">
            <div className="grid gap-0 md:grid-cols-2">
              <Skeleton className="h-64 md:h-96" />
              <div className="p-8 space-y-4">
                <Skeleton className="w-24 h-6" />
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-3/4 h-4" />
                <div className="flex gap-4 pt-2">
                  <Skeleton className="w-32 h-4" />
                  <Skeleton className="w-24 h-4" />
                </div>
                <Skeleton className="w-40 h-10 mt-4" />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* News List Skeleton */}
            <div className="space-y-6 lg:col-span-2">
              {/* Tabs Skeleton */}
              <div className="flex gap-2 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="flex-1 h-10" />
                ))}
              </div>

              {/* News Cards Skeleton */}
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="grid gap-0 md:grid-cols-3">
                    <Skeleton className="h-48 md:h-full" />
                    <div className="p-6 space-y-4 md:col-span-2">
                      <Skeleton className="w-20 h-6" />
                      <Skeleton className="w-full h-6" />
                      <Skeleton className="w-full h-4" />
                      <Skeleton className="w-2/3 h-4" />
                      <div className="flex gap-4">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="w-20 h-4" />
                      </div>
                      <Skeleton className="w-32 h-8 mt-2" />
                    </div>
                  </div>
                </Card>
              ))}

              {/* Pagination Skeleton */}
              <div className="flex justify-center gap-2 mt-8">
                <Skeleton className="w-24 h-10" />
                <Skeleton className="w-10 h-10" />
                <Skeleton className="w-10 h-10" />
                <Skeleton className="w-10 h-10" />
                <Skeleton className="w-24 h-10" />
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="space-y-6">
              {/* Categories Card Skeleton */}
              <Card className="p-6">
                <Skeleton className="w-32 h-6 mb-4" />
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-2">
                      <Skeleton className="w-24 h-4" />
                      <Skeleton className="w-8 h-6 rounded-full" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}