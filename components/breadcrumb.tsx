import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex flex-wrap items-center gap-2 mb-6 text-xs sm:text-sm font-medium tracking-wide">
      <Link
        href="/"
        className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-(--color-forest-700) dark:hover:text-(--color-teal-400) transition-colors duration-200"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="uppercase tracking-widest font-bold">Home</span>
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 dark:text-gray-600" />
          {item.href && index < items.length - 1 ? (
            <Link
              href={item.href}
              className="text-gray-600 dark:text-gray-400 hover:text-(--color-forest-700) dark:hover:text-(--color-teal-400) transition-colors duration-200 uppercase tracking-widest font-bold"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 dark:text-white font-black uppercase tracking-widest">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}
