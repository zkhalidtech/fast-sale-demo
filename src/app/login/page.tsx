"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex">
      {/* Left side - branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-navy-dark to-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-amber" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <Link href="/" className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-amber rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-navy-dark" />
            </div>
            <span className="text-2xl font-bold">Fast Sales</span>
          </Link>
          <h1 className="text-4xl font-bold mb-4">
            Accelerate Your Automotive Career
          </h1>
          <p className="text-lg text-white/80 mb-8">
            Join thousands of automotive professionals who have transformed
            their careers with our industry-leading training programs.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber/20 flex items-center justify-center text-amber text-sm font-bold">
                1
              </div>
              <span>Access 50+ expert-led courses</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber/20 flex items-center justify-center text-amber text-sm font-bold">
                2
              </div>
              <span>Earn industry-recognized certificates</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber/20 flex items-center justify-center text-amber text-sm font-bold">
                3
              </div>
              <span>Learn at your own pace, anywhere</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="p-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="w-full max-w-md">
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-amber rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-navy-dark" />
              </div>
              <span className="text-xl font-bold text-navy">Fast Sales</span>
            </div>

            <h2 className="text-2xl font-bold mb-2">
              {isLogin ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-muted-foreground mb-8">
              {isLogin
                ? "Sign in to continue your learning journey"
                : "Start your automotive sales training today"}
            </p>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = "/dashboard";
              }}
            >
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="Alex"
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-navy"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Johnson"
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-navy"
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="alex@dealership.com"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-navy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-navy"
                />
              </div>
              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded border-border"
                    />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="text-navy hover:underline">
                    Forgot password?
                  </a>
                </div>
              )}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Organization (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Dealership or company name"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-navy"
                  />
                </div>
              )}
              <button
                type="submit"
                className="w-full py-2.5 bg-navy text-white rounded-lg font-medium hover:bg-navy-light transition-colors"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {isLogin ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-navy font-medium hover:underline"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-navy font-medium hover:underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
