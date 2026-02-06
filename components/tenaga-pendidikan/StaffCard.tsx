"use client"

import Image from "next/image"
import { Staff } from "@/types/tenagaPendidikan.types"

interface StaffCardProps {
  staff: Staff
  isMultiple?: boolean
}

export function StaffCard({ staff, isMultiple = false }: StaffCardProps) {
  return (
    <div
      className={`bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-border/50 ${isMultiple ? "w-60" : "w-56"}`}
    >
      {/* Photo container */}
      <div className="relative w-full overflow-hidden bg-muted h-75">
        <Image
          src={staff.image || "/placeholder.svg"}
          alt={staff.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Info section */}
      <div className="p-4 text-center">
        <h3 className="text-sm font-bold text-card-foreground sm:text-base">{staff.name}</h3>
        <p className="mt-1 text-xs font-medium text-green-600 dark:text-green-500 sm:text-sm">{staff.position}</p>
        {staff.description && (
          <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{staff.description}</p>
        )}
      </div>
    </div>
  )
}