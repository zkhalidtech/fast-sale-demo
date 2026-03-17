"use client"

import { Navbar } from "@/components/layout/navbar"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Users, UserCheck, TrendingUp, Award, Route } from "lucide-react"
import { teamMembers, teamAssignments, learningPaths } from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function OrganizationPage() {
  const completionData = teamMembers
    .sort((a, b) => b.completionRate - a.completionRate)
    .slice(0, 8)
    .map((m) => ({ name: m.name.split(" ")[0], rate: m.completionRate }))

  return (
    <>
      <Navbar />
      <DashboardLayout variant="organization">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-navy">Pacific Coast Auto Group</h1>
            <p className="text-muted-foreground">Team training overview and management</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-blue-100 p-3"><Users className="h-5 w-5 text-blue-700" /></div>
                <div><p className="text-sm text-muted-foreground">Team Members</p><p className="text-2xl font-bold">24</p></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-green-100 p-3"><UserCheck className="h-5 w-5 text-green-700" /></div>
                <div><p className="text-sm text-muted-foreground">Active Learners</p><p className="text-2xl font-bold">18</p></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-amber-100 p-3"><TrendingUp className="h-5 w-5 text-amber-700" /></div>
                <div><p className="text-sm text-muted-foreground">Avg Completion</p><p className="text-2xl font-bold">68%</p></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-violet-100 p-3"><Award className="h-5 w-5 text-violet-700" /></div>
                <div><p className="text-sm text-muted-foreground">Certificates</p><p className="text-2xl font-bold">47</p></div>
              </CardContent>
            </Card>
          </div>

          {/* Completion Rate Chart */}
          <Card>
            <CardHeader><CardTitle>Team Completion Rates</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={completionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                    <Tooltip formatter={(value) => [`${value}%`, "Completion"]} />
                    <Bar dataKey="rate" fill="#1e3a5f" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Two Column Tables */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Team Members</CardTitle></CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamMembers.map((m) => (
                      <TableRow key={m.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7"><AvatarFallback className="text-xs">{m.avatar}</AvatarFallback></Avatar>
                            <span className="font-medium text-sm">{m.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">{m.role}</TableCell>
                        <TableCell><span className="text-sm font-medium">{m.completionRate}%</span></TableCell>
                        <TableCell>
                          <Badge variant={m.status === "Active" ? "default" : "secondary"} className="text-xs">{m.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Assigned Courses</CardTitle></CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Assigned</TableHead>
                      <TableHead>Avg Progress</TableHead>
                      <TableHead>Due</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamAssignments.map((a) => (
                      <TableRow key={a.courseId}>
                        <TableCell className="font-medium text-sm max-w-[180px] truncate">{a.courseTitle}</TableCell>
                        <TableCell>{a.membersAssigned}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={a.avgProgress} className="h-2 w-16" />
                            <span className="text-xs">{a.avgProgress}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">{a.dueDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Learning Paths */}
          <div>
            <h2 className="text-lg font-semibold text-navy mb-4">Learning Paths</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {learningPaths.map((path) => (
                <Card key={path.id} className="overflow-hidden">
                  <div className={`bg-gradient-to-br ${path.color} p-5 text-white`}>
                    <Route className="h-6 w-6 mb-2 opacity-80" />
                    <h3 className="font-semibold">{path.title}</h3>
                    <p className="text-sm opacity-80 mt-1">{path.description}</p>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">{path.courses.length} courses</span>
                      <span className="font-medium">{path.teamCompletion}% team completion</span>
                    </div>
                    <Progress value={path.teamCompletion} className="h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}
