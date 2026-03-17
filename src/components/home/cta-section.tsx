import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="bg-gradient-to-r from-amber-dark via-amber to-amber-light py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-navy-dark">
            Ready to Transform Your Sales Career?
          </h2>
          <p className="mt-4 text-lg text-navy-dark/80">
            Join thousands of automotive professionals who have accelerated their
            careers with Fast Sales Training Center.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-navy text-white font-semibold hover:bg-navy-dark"
              asChild
            >
              <Link href="/courses">Get Started Today</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-navy-dark text-navy-dark hover:bg-navy-dark/10"
              asChild
            >
              <Link href="/">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
