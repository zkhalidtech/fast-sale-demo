"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BookOpen,
  Award,
  Settings,
  Users,
  BarChart3,
  DollarSign,
  FileText,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

const learnerLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/courses", label: "Browse Courses", icon: BookOpen },
  { href: "/dashboard", label: "My Certificates", icon: Award },
  { href: "/dashboard", label: "Settings", icon: Settings },
]

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin", label: "Courses", icon: BookOpen },
  { href: "/admin", label: "Learners", icon: Users },
  { href: "/admin", label: "Revenue", icon: DollarSign },
  { href: "/admin", label: "Analytics", icon: BarChart3 },
  { href: "/admin", label: "Reports", icon: FileText },
  { href: "/admin", label: "Settings", icon: Settings },
]

interface DashboardLayoutProps {
  children: React.ReactNode
  variant: "learner" | "admin"
}

export function DashboardLayout({ children, variant }: DashboardLayoutProps) {
  const pathname = usePathname()
  const links = variant === "admin" ? adminLinks : learnerLinks

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r bg-muted/30 lg:block">
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-2 border-b px-6 py-4">
            <Zap className="h-5 w-5 text-amber" />
            <span className="text-sm font-semibold text-navy">
              {variant === "admin" ? "Admin Panel" : "Learning Portal"}
            </span>
          </div>
          <nav className="flex-1 space-y-1 px-3 py-4">
            {links.map((link, index) => {
              const Icon = link.icon
              const isActive =
                index === 0 && pathname === link.href
              return (
                <Link
                  key={`${link.label}-${index}`}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}
