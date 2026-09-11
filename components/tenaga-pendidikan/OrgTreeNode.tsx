"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Users } from "lucide-react"
import { StrukturNode } from "@/types/tenagaPendidikan.types"
import { StaffCard } from "./StaffCard"
import { Badge } from "@/components/ui/badge"

interface OrgTreeNodeProps {
  node: StrukturNode
  level?: number
  isRoot?: boolean
}

export function OrgTreeNode({ node, level = 0, isRoot = false }: OrgTreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const hasChildren = node.children && node.children.length > 0

  const levelStyles = {
    0: {
      badge: "bg-(--color-forest-450) hover:bg-(--color-forest-500)",
      line: "bg-(--color-forest-450)",
      icon: "text-(--color-forest-450)",
      textColor: "text-white"
    },
    1: {
      badge: "bg-(--color-sun-500) hover:bg-(--color-sun-400)",
      line: "bg-(--color-sun-500)",
      icon: "text-(--color-sun-500)",
      textColor: "text-gray-900"
    },
    2: {
      badge: "bg-(--color-teal-400) hover:bg-(--color-teal-300)",
      line: "bg-(--color-teal-400)",
      icon: "text-(--color-teal-400)",
      textColor: "text-white"
    },
  }

  const styles = levelStyles[Math.min(level, 2) as keyof typeof levelStyles]

  return (
    <div className="flex flex-col items-center w-full">
      {/* Vertical connector line from parent */}
      {!isRoot && (
        <div className={`w-1 h-6 ${styles.line} rounded-full`} />
      )}

      <div className="flex flex-col items-center">
        <Badge
          className={`${styles.badge} ${styles.textColor} px-6 py-3 rounded-full font-black uppercase tracking-widest text-xs sm:text-sm mb-6 shadow-xl shadow-lg/20 whitespace-nowrap transition-all duration-300 hover:scale-105`}
        >
          {node.name}
        </Badge>

        {node.staff && node.staff.length > 0 && (
          <div className={`mb-6 flex flex-wrap justify-center gap-4 sm:gap-6 ${node.staff.length === 1 ? 'w-full' : 'max-w-full'}`}>
            {node.staff.map((staff) => (
              <StaffCard
                key={staff.slug}
                staff={staff}
                isMultiple={level !== 0 && node.staff.length > 1}
              />
            ))}
          </div>
        )}

        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`mt-4 p-3 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full transition-all duration-300 ${styles.icon} bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl hover:scale-110`}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Tutup cabang organisasi" : "Buka cabang organisasi"}
          >
            {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="flex flex-col items-center w-full">
          <div className={`w-1 mx-auto shrink-0 h-8 ${styles.line} rounded-full`} />

          <div className="flex flex-row flex-wrap justify-center items-start gap-8 md:gap-12 w-full pt-0">
            {node.children?.map((child, index) => (
              <div key={child.slug || child.id || index} className="flex flex-col items-center relative">
                {node.children && node.children.length > 1 && (
                  <div
                    className={`absolute h-1 ${styles.line} rounded-full`}
                    style={{
                      top: "0px",
                      left: index === 0 ? "50%" : "0px",
                      right: index === (node.children?.length ?? 1) - 1 ? "50%" : "0px",
                    }}
                  />
                )}
                <OrgTreeNode node={child} level={level + 1} isRoot={false} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}