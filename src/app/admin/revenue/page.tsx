"use client"

import { Navbar } from "@/components/layout/navbar"
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
import { DollarSign, TrendingUp, ShoppingCart, RotateCcw } from "lucide-react"
import { courses, monthlyData, transactions } from "@/lib/mock-data"
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

export default function AdminRevenuePage() {
  const categoryRevenue = courses.reduce<Record<string, number>>((acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + c.price * c.studentsEnrolled
    return acc
  }, {})

  const categoryData = Object.entries(categoryRevenue)
    .map(([name, revenue]) => ({ name, revenue }))
    .sort((a, b) => b.revenue - a.revenue)

  const topCourses = [...courses]
    .sort((a, b) => b.price * b.studentsEnrolled - a.price * a.studentsEnrolled)
    .slice(0, 5)

  return (
    <>
      <Navbar />
      <DashboardLayout variant="admin">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-navy">Revenue</h1>
            <p className="text-muted-foreground">Track revenue performance and transactions</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-emerald-100 p-3"><DollarSign className="h-5 w-5 text-emerald-700" /></div>
                <div><p className="text-sm text-muted-foreground">Total Revenue</p><p className="text-2xl font-bold">$284,750</p></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-blue-100 p-3"><TrendingUp className="h-5 w-5 text-blue-700" /></div>
                <div><p className="text-sm text-muted-foreground">This Month</p><p className="text-2xl font-bold">$31,400</p></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-amber-100 p-3"><ShoppingCart className="h-5 w-5 text-amber-700" /></div>
                <div><p className="text-sm text-muted-foreground">Avg Order</p><p className="text-2xl font-bold">$367</p></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-red-100 p-3"><RotateCcw className="h-5 w-5 text-red-700" /></div>
                <div><p className="text-sm text-muted-foreground">Refund Rate</p><p className="text-2xl font-bold">2.1%</p></div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Trend */}
          <Card>
            <CardHeader><CardTitle>Revenue Trend</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(v) => `$${v / 1000}K`} />
                    <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]} />
                    <Area type="monotone" dataKey="revenue" stroke="#1e3a5f" fill="#1e3a5f" fillOpacity={0.1} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Revenue by Category */}
          <Card>
            <CardHeader><CardTitle>Revenue by Category</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} layout="vertical" margin={{ left: 100 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(v) => `$${v / 1000}K`} />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]} />
                    <Bar dataKey="revenue" fill="#1e3a5f" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Top Revenue Courses */}
            <Card>
              <CardHeader><CardTitle>Top Revenue Courses</CardTitle></CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topCourses.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium max-w-[200px] truncate">{c.title}</TableCell>
                        <TableCell>${c.price}</TableCell>
                        <TableCell className="font-semibold">${(c.price * c.studentsEnrolled).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader><CardTitle>Recent Transactions</CardTitle></CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Learner</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell className="font-medium">{t.learnerName}</TableCell>
                        <TableCell>${t.amount}</TableCell>
                        <TableCell>
                          <Badge variant={t.status === "Completed" ? "default" : t.status === "Pending" ? "secondary" : "destructive"}>
                            {t.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}
