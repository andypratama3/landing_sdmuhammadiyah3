"use client"

import Image from "next/image"
import { Staff } from "@/types/tenagaPendidikan.types"

interface GridStaffCardProps {
  person: Staff
}

export function GridStaffCard({ person }: GridStaffCardProps) {
  return (
    <div className="overflow-hidden transition-shadow duration-300 bg-card shadow-md rounded-xl hover:shadow-xl border border-border/50">
      <div className="relative w-full overflow-hidden bg-muted h-90">
        <Image
          src={person.image || "/placeholder.svg"}
          alt={person.name}
          width={480}
          height={600}
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="p-5 space-y-2">
        <h3 className="text-lg font-bold text-card-foreground">{person.name}</h3>
        <p className="text-sm font-medium text-green-600 dark:text-green-500">{person.position}</p>
        {person.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{person.description}</p>
        )}
        <div className="flex gap-2 pt-2">
          <span className="inline-block px-3 py-1 text-xs font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 rounded-full">
            {person.category}
          </span>
        </div>
      </div>
    </div>
  )
}