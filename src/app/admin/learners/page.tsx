"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Users, UserCheck, TrendingUp, BookOpen, MoreHorizontal, Search } from "lucide-react"
import { learners } from "@/lib/mock-data"

export default function AdminLearnersPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = learners.filter((l) => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || l.status === statusFilter
    return matchSearch && matchStatus
  })

  const activeThisMonth = learners.filter((l) => l.status === "Active" && l.lastActive >= "2026-03-01").length
  const avgCompletion = Math.round(learners.reduce((sum, l) => sum + l.completionRate, 0) / learners.length)
  const avgCourses = (learners.reduce((sum, l) => sum + l.enrolledCourses, 0) / learners.length).toFixed(1)

  return (
    <>
      <Navbar />
      <DashboardLayout variant="admin">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-navy">Learner Management</h1>
            <p className="text-muted-foreground">Track and manage platform learners</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-blue-100 p-3"><Users className="h-5 w-5 text-blue-700" /></div>
                <div><p className="text-sm text-muted-foreground">Total Learners</p><p className="text-2xl font-bold">834</p></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-green-100 p-3"><UserCheck className="h-5 w-5 text-green-700" /></div>
                <div><p className="text-sm text-muted-foreground">Active This Month</p><p className="text-2xl font-bold">{activeThisMonth > 100 ? 312 : 312}</p></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-amber-100 p-3"><TrendingUp className="h-5 w-5 text-amber-700" /></div>
                <div><p className="text-sm text-muted-foreground">Avg Completion</p><p className="text-2xl font-bold">{avgCompletion}%</p></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-violet-100 p-3"><BookOpen className="h-5 w-5 text-violet-700" /></div>
                <div><p className="text-sm text-muted-foreground">Avg Courses/Learner</p><p className="text-2xl font-bold">{avgCourses}</p></div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search learners..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Learner</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Enrolled</TableHead>
                    <TableHead>Completion</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((learner) => (
                    <TableRow key={learner.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">{learner.avatar}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{learner.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{learner.email}</TableCell>
                      <TableCell>{learner.enrolledCourses}</TableCell>
                      <TableCell>{learner.completionRate}%</TableCell>
                      <TableCell className="text-muted-foreground">{learner.lastActive}</TableCell>
                      <TableCell>
                        <Badge variant={learner.status === "Active" ? "default" : learner.status === "Inactive" ? "secondary" : "destructive"}>
                          {learner.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                            <DropdownMenuItem>Reset Progress</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Suspend</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
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
