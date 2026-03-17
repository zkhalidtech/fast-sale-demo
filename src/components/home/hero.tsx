import Link from "next/link";
import {
  GraduationCap,
  Building2,
  Trophy,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Graduates", value: "10,000+", icon: GraduationCap },
  { label: "Dealerships", value: "500+", icon: Building2 },
  { label: "Pass Rate", value: "95%", icon: Trophy },
  { label: "Courses", value: "50+", icon: BookOpen },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-dark to-navy text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-navy-light/20 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Accelerate Your Automotive Sales Career
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/80">
            The premier training platform for automotive sales professionals.
            Master the skills that top performers use to close more deals, increase
            F&I revenue, and advance into leadership roles.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-amber text-navy-dark font-semibold hover:bg-amber-dark"
              asChild
            >
              <Link href="/courses">Browse Courses</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="/courses">Start Free Trial</Link>
            </Button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2 rounded-xl bg-white/10 px-4 py-6 backdrop-blur-sm"
              >
                <Icon className="h-6 w-6 text-amber" />
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="text-sm text-white/70">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
