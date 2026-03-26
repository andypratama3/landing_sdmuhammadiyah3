import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingGuru() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <section className="w-full py-12 lg:py-20 mt-4">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
               <Skeleton className="w-full h-[380px] rounded-[2.5rem]" />
            </div>
            <div className="lg:col-span-4 flex flex-col gap-6">
               <Skeleton className="w-full h-full rounded-[2.5rem] min-h-[178px]" />
               <Skeleton className="w-full h-full rounded-[2.5rem] min-h-[178px]" />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="w-full h-72 rounded-[2.5rem]" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
