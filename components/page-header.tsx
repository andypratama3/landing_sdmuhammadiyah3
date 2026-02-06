import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs: { label?: string; href?: string }[]
}
export function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="relative pt-24 pb-12 sm:pt-32 sm:pb-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 -z-10" />
      <div className="absolute top-0 right-0 w-[50%] h-full bg-[#33b962]/5 blur-[100px] -z-10" />

      <div className="container px-4 mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList className="flex-wrap justify-center gap-y-3">
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1
                return (
                  <div key={index} className="flex items-center">
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-[#33b962] dark:text-[#4ade80] bg-[#33b962]/5 dark:bg-[#33b962]/10 px-4 py-1.5 rounded-full">
                          {item.label}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          {item.href ? (
                            <Link
                              href={item.href}
                              className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] transition-all text-gray-400 hover:text-[#33b962] dark:hover:text-[#4ade80]"
                            >
                              {item.label}
                            </Link>
                          ) : (
                            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
                              {item.label}
                            </span>
                          )}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator className="mx-3 opacity-20" />}
                  </div>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>

          {/* Title & Description */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.1] uppercase">
              {title}
            </h1>

            {description && (
              <p className="max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed text-balance">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
