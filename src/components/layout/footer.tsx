import Link from "next/link"
import { Zap } from "lucide-react"

const courseLinks = [
  { label: "Auto Sales", href: "/courses" },
  { label: "F&I Training", href: "/courses" },
  { label: "Auto Broker", href: "/courses" },
  { label: "Leadership", href: "/courses" },
  { label: "Compliance", href: "/courses" },
]

const companyLinks = [
  { label: "About Us", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact", href: "#" },
]

const supportLinks = [
  { label: "Help Center", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "FAQ", href: "#" },
]

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo & Description */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-amber" />
              <span className="text-xl font-bold">Fast Sales</span>
            </Link>
            <p className="mt-4 text-sm text-white/70">
              Fast Sales Training Center provides industry-leading automotive
              sales and finance training to help professionals accelerate their
              careers and maximize dealership performance.
            </p>
          </div>

          {/* Column 2: Courses */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Courses
            </h3>
            <ul className="space-y-2">
              {courseLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-white/50">
            &copy; 2026 Fast Sales Training Center. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
