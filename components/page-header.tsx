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
    <div className="container px-4 py-8 mx-auto mt-20 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      {/* Breadcrumb Navigation */}
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1
            return (
              <div key={index} className="flex items-center">
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-sm font-medium transition-colors text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          {item.label}
                        </span>
                      )}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </div>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Title & Description */}
      <div className="space-y-2 sm:space-y-3">
        <h1 className="text-3xl font-bold text-balance sm:text-4xl text-slate-900 dark:text-slate-50">
          {title}
        </h1>

        {description && (
          <p className="max-w-3xl text-base sm:text-lg text-pretty text-slate-600 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
