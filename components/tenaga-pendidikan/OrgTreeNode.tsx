"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { StrukturNode } from "@/types/tenagaPendidikan.types"
import { StaffCard } from "./StaffCard"

interface OrgTreeNodeProps {
  node: StrukturNode
  level?: number
  isRoot?: boolean
}

export function OrgTreeNode({ node, level = 0, isRoot = false }: OrgTreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const hasChildren = node.children && node.children.length > 0

  const levelColors = {
    0: { badge: "bg-green-500", line: "#22c55e", icon: "text-green-500" },
    1: { badge: "bg-green-600", line: "#16a34a", icon: "text-green-600" },
    2: { badge: "bg-emerald-600", line: "#059669", icon: "text-emerald-600" },
  }

  const colors = levelColors[Math.min(level, 2) as keyof typeof levelColors]

  return (
    <div className="flex flex-col items-center w-full">
      {/* Vertical connector line from parent */}
      {!isRoot && (
        <div
          className="w-1"
          style={{
            height: "24px",
            backgroundColor: colors.line,
          }}
        />
      )}

      <div className="flex flex-col items-center">
        <div
          className={`${colors.badge} text-white px-6 py-2 rounded-full font-semibold text-sm mb-4 shadow-md whitespace-nowrap`}
        >
          {node.name}
        </div>

        {node.staff && node.staff.length > 0 && (
          <div className={`mb-4 flex flex-wrap justify-center gap-4 ${node.staff.length === 1 ? 'w-full' : 'max-w-full'
            }`}>
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
            className={`mt-2 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-colors ${colors.icon} hover:bg-accent hover:text-accent-foreground`}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Tutup cabang organisasi" : "Buka cabang organisasi"}
          >
            {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="flex flex-col items-center w-full">
          <div
            className="w-1 mx-auto shrink-0"
            style={{
              height: "24px",
              backgroundColor: colors.line,
            }}
          />

          <div className="flex flex-row flex-wrap justify-center items-start gap-6 md:gap-10 w-full pt-0">
            {node.children?.map((child, index) => (
              <div key={child.slug || child.id || index} className="flex flex-col items-center relative">
                {node.children && node.children.length > 1 && (
                  <div
                    className="absolute h-1"
                    style={{
                      backgroundColor: colors.line,
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