"use client"

import Image from "next/image"
import { Staff } from "@/types/tenagaPendidikan.types"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Briefcase, ChevronRight } from "lucide-react"

interface GridStaffCardProps {
  person: Staff
}

export function GridStaffCard({ person }: GridStaffCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-500 border-0 shadow-xl rounded-[2rem] hover:shadow-2xl dark:bg-gray-900/40 glass">
      <div className="relative overflow-hidden h-72 sm:h-80">
        <div className="absolute inset-0 bg-gradient-to-br from-(--color-forest-450)/10 to-(--color-sun-500)/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-800">
          <Image
            src={person.image || "/placeholder.svg"}
            alt={person.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight group-hover:text-(--color-forest-450) transition-colors line-clamp-2">
              {person.name}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <Briefcase className="w-4 h-4 text-(--color-forest-450)" />
              <p className="text-sm font-semibold text-(--color-forest-600) dark:text-(--color-forest-400)">{person.position}</p>
            </div>
          </div>
        </div>
        {person.description && (
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-2">
            {person.description}
          </p>
        )}
        <div className="flex items-center gap-2 pt-2">
          <Badge className="bg-(--color-forest-450)/10 text-(--color-forest-450) border-(--color-forest-450)/10 dark:bg-(--color-forest-450)/30 font-black uppercase tracking-widest text-[9px] px-3 py-1.5 rounded-lg shadow-sm">
            {person.category}
          </Badge>
        </div>
      </div>
    </Card>
  )
}