"use client"

import { DollarSign, Users, UserCheck, BarChart3, TrendingUp } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  adminStats,
  monthlyData,
  courses,
  recentEnrollments,
} from "@/lib/mock-data"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const statCards = [
  {
    label: "Total Revenue",
    value: `$${adminStats.totalRevenue.toLocaleString()}`,
    change: adminStats.revenueChange,
    icon: DollarSign,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    label: "Total Enrollments",
    value: adminStats.totalEnrollments.toLocaleString(),
    change: adminStats.enrollmentChange,
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Active Learners",
    value: adminStats.activeLearners.toLocaleString(),
    change: adminStats.learnersChange,
    icon: UserCheck,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    label: "Completion Rate",
    value: `${adminStats.completionRate}%`,
    change: adminStats.completionChange,
    icon: BarChart3,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
]

const topCourses = [...courses]
  .sort((a, b) => b.studentsEnrolled - a.studentsEnrolled)
  .slice(0, 5)

function formatCurrency(value: number) {
  return `$${value.toLocaleString()}`
}

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <DashboardLayout variant="admin">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy">Admin Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Overview of platform performance and key metrics.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={`rounded-lg p-3 ${stat.bg}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      +{stat.change}%
                    </div>
                  </div>
                  <div className="mt-4">
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

        {/* Charts Row */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient
                        id="revenueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#1e293b"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#1e293b"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                      dataKey="month"
                      className="text-xs"
                      tick={{ fill: "#64748b", fontSize: 12 }}
                    />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: "#64748b", fontSize: 12 }}
                      tickFormatter={(value) => `$${(Number(value) / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      formatter={(value) => [
                        formatCurrency(Number(value)),
                        "Revenue",
                      ]}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#1e293b"
                      strokeWidth={2}
                      fill="url(#revenueGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Enrollment Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                      dataKey="month"
                      className="text-xs"
                      tick={{ fill: "#64748b", fontSize: 12 }}
                    />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: "#64748b", fontSize: 12 }}
                    />
                    <Tooltip
                      formatter={(value) => [String(value), "Enrollments"]}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                      }}
                    />
                    <Bar
                      dataKey="enrollments"
                      fill="#d97706"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Popular Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Students</TableHead>
                    <TableHead className="text-right">Rating</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="max-w-[180px] truncate font-medium">
                        {course.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">
                          {course.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {course.studentsEnrolled.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {course.rating}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(course.price * course.studentsEnrolled)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Recent Enrollments */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Learner</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentEnrollments.map((enrollment) => (
                    <TableRow key={enrollment.id}>
                      <TableCell className="font-medium">
                        {enrollment.learnerName}
                      </TableCell>
                      <TableCell className="max-w-[150px] truncate">
                        {enrollment.courseName}
                      </TableCell>
                      <TableCell>
                        {new Date(enrollment.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(enrollment.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
      <Footer />
    </>
  )
}
