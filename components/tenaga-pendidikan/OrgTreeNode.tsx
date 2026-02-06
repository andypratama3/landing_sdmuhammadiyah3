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
            className={`mt-2 p-2 rounded-full transition-colors ${colors.icon} hover:bg-accent hover:text-accent-foreground`}
            aria-expanded={isExpanded}
          >
            {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="relative w-full">
          <div
            className="w-1 mx-auto"
            style={{
              height: "24px",
              backgroundColor: colors.line,
            }}
          />

          <div className="flex flex-col items-center gap-6 mt-4">
            {node.children && node.children.length > 1 && (
              <div className="relative" style={{ width: "100%", minHeight: "24px" }}>
                <div
                  className="absolute h-1"
                  style={{
                    backgroundColor: colors.line,
                    top: "0px",
                    left: "0",
                    right: "0",
                    width: "100%",
                  }}
                />
              </div>
            )}

            <div className="flex flex-col w-full gap-6">
              {node.children?.map((child) => (
                <div key={child.slug} className="flex flex-col items-center">
                  {node.children && node.children.length > 1 && (
                    <div
                      className="w-1"
                      style={{
                        height: "24px",
                        backgroundColor: colors.line,
                        marginBottom: "0px",
                      }}
                    />
                  )}
                  <OrgTreeNode node={child} level={level + 1} isRoot={false} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}