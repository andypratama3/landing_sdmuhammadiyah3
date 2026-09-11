import Image from "next/image"
import { Staff } from "@/types/tenagaPendidikan.types"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase } from "lucide-react"

interface StaffCardProps {
  staff: Staff
  isMultiple?: boolean
}

export function StaffCard({ staff, isMultiple = false }: StaffCardProps) {
  return (
    <Card
      className={`group overflow-hidden transition-all duration-500 border-0 shadow-lg rounded-2xl hover:shadow-2xl dark:bg-gray-900/40 glass ${isMultiple ? "w-52 sm:w-56 md:w-60" : "w-48 sm:w-52 md:w-56"}`}
    >
      {/* Photo container */}
      <div className="relative w-full overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-[3/4]">
        <div className="absolute inset-0 bg-gradient-to-br from-(--color-forest-450)/10 to-(--color-sun-500)/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Image
          src={staff.image || "/placeholder.svg"}
          alt={staff.name}
          fill
          className="object-contain transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 208px, (max-width: 768px) 224px, 240px"
        />
      </div>

      {/* Info section */}
      <div className="p-4 text-center">
        <h3 className="text-sm sm:text-base font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight line-clamp-2 group-hover:text-(--color-forest-450) transition-colors">
          {staff.name}
        </h3>
        <div className="flex items-center justify-center gap-1.5 mt-2">
          <Briefcase className="w-3 h-3 text-(--color-forest-450)" />
          <p className="text-[10px] sm:text-xs font-semibold text-(--color-forest-600) dark:text-(--color-forest-400)">
            {staff.position}
          </p>
        </div>
        {staff.description && (
          <p className="mt-2 text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
            {staff.description}
          </p>
        )}
      </div>
    </Card>
  )
}