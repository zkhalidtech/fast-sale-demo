"use client"

import { Navbar } from "@/components/layout/navbar"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Clock, TrendingUp, Brain, Star } from "lucide-react"
import { courses, monthlyData } from "@/lib/mock-data"
import {
  ComposedChart,
  Bar,
  Line,
  BarChart,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const COLORS = ["#1e3a5f", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444"]

const categoryCount = courses.reduce<Record<string, number>>((acc, c) => {
  acc[c.category] = (acc[c.category] || 0) + 1
  return acc
}, {})

const pieData = Object.entries(categoryCount).map(([name, value]) => ({ name, value }))

const funnelData = [
  { stage: "Enrolled", value: 1247 },
  { stage: "Started", value: 1060 },
  { stage: "50% Complete", value: 748 },
  { stage: "Completed", value: 898 },
]

const heatmapDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const heatmapHours = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"]
const heatmapData = heatmapDays.map((day) =>
  heatmapHours.map((hour) => ({
    day,
    hour,
    value: Math.floor(Math.random() * 100),
  }))
)

export default function AdminAnalyticsPage() {
  const topCourses = [...courses]
    .sort((a, b) => b.rating * b.studentsEnrolled - a.rating * a.studentsEnrolled)
    .slice(0, 5)

  return (
    <>
      <Navbar />
      <DashboardLayout variant="admin">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-navy">Analytics</h1>
            <p className="text-muted-foreground">Detailed insights into platform performance</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-blue-100 p-3"><Clock className="h-5 w-5 text-blue-700" /></div>
                <div><p className="text-sm text-muted-foreground">Avg Session</p><p className="text-2xl font-bold">42 min</p></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-green-100 p-3"><TrendingUp className="h-5 w-5 text-green-700" /></div>
                <div><p className="text-sm text-muted-foreground">Completion Rate</p><p className="text-2xl font-bold">72%</p></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-violet-100 p-3"><Brain className="h-5 w-5 text-violet-700" /></div>
                <div><p className="text-sm text-muted-foreground">Avg Quiz Score</p><p className="text-2xl font-bold">84%</p></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-amber-100 p-3"><Star className="h-5 w-5 text-amber-700" /></div>
                <div><p className="text-sm text-muted-foreground">Satisfaction</p><p className="text-2xl font-bold">4.7/5</p></div>
              </CardContent>
            </Card>
          </div>

          {/* 2x2 Chart Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Revenue & Enrollments */}
            <Card>
              <CardHeader><CardTitle>Revenue & Enrollments</CardTitle></CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" tickFormatter={(v) => `$${v / 1000}K`} />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="revenue" fill="#1e3a5f" name="Revenue" radius={[4, 4, 0, 0]} />
                      <Line yAxisId="right" dataKey="enrollments" stroke="#10b981" name="Enrollments" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Courses by Category */}
            <Card>
              <CardHeader><CardTitle>Courses by Category</CardTitle></CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name} (${value})`}>
                        {pieData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Completion Funnel */}
            <Card>
              <CardHeader><CardTitle>Completion Funnel</CardTitle></CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={funnelData} layout="vertical" margin={{ left: 80 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="stage" width={80} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#1e3a5f" radius={[0, 4, 4, 0]}>
                        {funnelData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Activity Heatmap */}
            <Card>
              <CardHeader><CardTitle>Activity Heatmap</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="flex gap-1 pl-10">
                    {heatmapHours.map((h) => (
                      <div key={h} className="flex-1 text-center text-[10px] text-muted-foreground">{h}</div>
                    ))}
                  </div>
                  {heatmapData.map((row, i) => (
                    <div key={heatmapDays[i]} className="flex items-center gap-1">
                      <div className="w-10 text-right text-xs text-muted-foreground">{heatmapDays[i]}</div>
                      {row.map((cell, j) => (
                        <div
                          key={j}
                          className="flex-1 aspect-square rounded-sm"
                          style={{
                            backgroundColor: `rgba(30, 58, 95, ${Math.max(0.08, cell.value / 100)})`,
                          }}
                          title={`${cell.day} ${cell.hour}: ${cell.value} sessions`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Courses */}
          <Card>
            <CardHeader><CardTitle>Top Performing Courses</CardTitle></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCourses.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.title}</TableCell>
                      <TableCell className="text-muted-foreground">{c.category}</TableCell>
                      <TableCell>{c.studentsEnrolled.toLocaleString()}</TableCell>
                      <TableCell><span className="flex items-center gap-1"><Star className="h-3 w-3 fill-amber-400 text-amber-400" />{c.rating}</span></TableCell>
                      <TableCell className="font-semibold">${(c.price * c.studentsEnrolled).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </>
  )
}
