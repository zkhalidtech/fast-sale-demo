"use client"

import Link from "next/link"
import { BookOpen, Award, Clock, Trophy, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { enrolledCourses, certificates } from "@/lib/mock-data"

const inProgressCourses = enrolledCourses.filter((ec) => ec.progress < 100)
const completedCourses = enrolledCourses.filter((ec) => ec.progress === 100)

const stats = [
  {
    label: "Courses In Progress",
    value: inProgressCourses.length,
    icon: BookOpen,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Completed Courses",
    value: completedCourses.length,
    icon: Trophy,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    label: "Certificates",
    value: certificates.length,
    icon: Award,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    label: "Study Hours",
    value: 24,
    icon: Clock,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
]

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <DashboardLayout variant="learner">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy">Welcome back, Alex!</h1>
          <p className="mt-1 text-muted-foreground">
            Track your progress and continue learning where you left off.
          </p>
        </div>

        {/* Stats Row */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label}>
                <CardContent className="flex items-center gap-4 p-6">
                  <div className={`rounded-lg p-3 ${stat.bg}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Continue Learning Section */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-navy">
            Continue Learning
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {inProgressCourses.map((enrolled) => (
              <Card key={enrolled.courseId} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base leading-snug">
                      {enrolled.course.title}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {enrolled.course.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {enrolled.course.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-end gap-4">
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{enrolled.progress}%</span>
                    </div>
                    <Progress value={enrolled.progress} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      Last accessed:{" "}
                      {new Date(enrolled.lastAccessed).toLocaleDateString()}
                    </span>
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/learn/${enrolled.courseId}`}>
                      Continue
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* My Certificates Section */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-navy">
            My Certificates
          </h2>
          {certificates.length > 0 ? (
            <div className="space-y-3">
              {certificates.map((cert) => (
                <Card key={cert.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-amber-50 p-3">
                        <Award className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-semibold">{cert.courseTitle}</p>
                        <p className="text-sm text-muted-foreground">
                          Completed{" "}
                          {new Date(cert.completedDate).toLocaleDateString()} |
                          Credential ID: {cert.credentialId}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Certificate
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                <Award className="mx-auto mb-2 h-10 w-10 text-muted-foreground/50" />
                <p>No certificates yet. Complete a course to earn one!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
      <Footer />
    </>
  )
}
