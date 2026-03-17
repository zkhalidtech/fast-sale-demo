"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import { BookOpen, DollarSign, FileText, CheckCircle2, MoreHorizontal, Star, Search } from "lucide-react"
import { courses } from "@/lib/mock-data"

export default function AdminCoursesPage() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const coursesWithStatus = courses.map((c, i) => ({
    ...c,
    status: i >= 10 ? ("Draft" as const) : ("Published" as const),
  }))

  const filtered = coursesWithStatus.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.instructor.toLowerCase().includes(search.toLowerCase())
    const matchCategory = categoryFilter === "all" || c.category === categoryFilter
    const matchStatus = statusFilter === "all" || c.status === statusFilter
    return matchSearch && matchCategory && matchStatus
  })

  const totalRevenue = courses.reduce((sum, c) => sum + c.price * c.studentsEnrolled, 0)
  const publishedCount = coursesWithStatus.filter((c) => c.status === "Published").length
  const draftCount = coursesWithStatus.filter((c) => c.status === "Draft").length

  return (
    <>
      <Navbar />
      <DashboardLayout variant="admin">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-navy">Course Management</h1>
            <p className="text-muted-foreground">Manage and monitor all courses on the platform</p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-blue-100 p-3"><BookOpen className="h-5 w-5 text-blue-700" /></div>
                <div><p className="text-sm text-muted-foreground">Total Courses</p><p className="text-2xl font-bold">{courses.length}</p></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-green-100 p-3"><CheckCircle2 className="h-5 w-5 text-green-700" /></div>
                <div><p className="text-sm text-muted-foreground">Published</p><p className="text-2xl font-bold">{publishedCount}</p></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-amber-100 p-3"><FileText className="h-5 w-5 text-amber-700" /></div>
                <div><p className="text-sm text-muted-foreground">Draft</p><p className="text-2xl font-bold">{draftCount}</p></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-emerald-100 p-3"><DollarSign className="h-5 w-5 text-emerald-700" /></div>
                <div><p className="text-sm text-muted-foreground">Total Revenue</p><p className="text-2xl font-bold">${(totalRevenue / 1000).toFixed(0)}K</p></div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search courses or instructors..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Auto Sales">Auto Sales</SelectItem>
                <SelectItem value="F&I Training">F&I Training</SelectItem>
                <SelectItem value="Auto Broker">Auto Broker</SelectItem>
                <SelectItem value="Leadership">Leadership</SelectItem>
                <SelectItem value="Compliance">Compliance</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Enrolled</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium max-w-[250px] truncate">{course.title}</TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell><Badge variant="secondary">{course.category}</Badge></TableCell>
                      <TableCell>${course.price}</TableCell>
                      <TableCell>{course.studentsEnrolled.toLocaleString()}</TableCell>
                      <TableCell><span className="flex items-center gap-1"><Star className="h-3 w-3 fill-amber-400 text-amber-400" />{course.rating}</span></TableCell>
                      <TableCell>
                        <Badge variant={course.status === "Published" ? "default" : "secondary"}>
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Archive</DropdownMenuItem>
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
