import Image from "next/image"
import { Staff } from "@/types/tenagaPendidikan.types"

interface StaffCardProps {
  staff: Staff
  isMultiple?: boolean
}

export function StaffCard({ staff, isMultiple = false }: StaffCardProps) {
  return (
    <div
      className={`bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-border/50 ${isMultiple ? "w-52 sm:w-56 md:w-60" : "w-48 sm:w-52 md:w-56"}`}
    >
      {/* Photo container */}
      <div className="relative w-full overflow-hidden bg-muted aspect-[3/4]">
        <Image
          src={staff.image || "/placeholder.svg"}
          alt={staff.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 208px, (max-width: 768px) 224px, 240px"
        />
      </div>

      {/* Info section */}
      <div className="p-3 sm:p-4 text-center">
        <h3 className="text-xs sm:text-sm font-bold text-card-foreground">{staff.name}</h3>
        <p className="mt-1 text-[10px] sm:text-xs font-medium text-green-600 dark:text-green-500">{staff.position}</p>
        {staff.description && (
          <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-muted-foreground line-clamp-2">{staff.description}</p>
        )}
      </div>
    </div>
  )
}