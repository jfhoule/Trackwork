"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutGrid,
  Clock,
  Folder,
  Users,
  FileText,
  BarChart,
  Settings,
} from "lucide-react"

import { cn } from "@/lib/utils"

const routes = [
  { label: "Dashboard", href: "/", icon: LayoutGrid },
  { label: "Time", href: "/time", icon: Clock },
  { label: "Projects", href: "/projects", icon: Folder },
  { label: "Clients", href: "/clients", icon: Users },
  { label: "Invoices", href: "/invoices", icon: FileText },
  { label: "Reports", href: "/reports", icon: BarChart },
  { label: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  return (
    <div className={cn("w-64 border-r bg-muted/20 p-4", className)}>
      <div className="space-y-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === route.href && "bg-accent"
            )}
          >
            <route.icon className="h-4 w-4" />
            <span>{route.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
