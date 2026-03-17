"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Award, Calendar, Download, Eye, Zap } from "lucide-react"
import { certificates } from "@/lib/mock-data"
import { Certificate } from "@/types"

const gradients = [
  "from-blue-600 to-indigo-700",
  "from-emerald-600 to-teal-700",
  "from-violet-600 to-purple-700",
]

function CertificatePreview({ cert }: { cert: Certificate }) {
  return (
    <div className="mx-auto max-w-lg rounded-lg border-4 border-amber-400/50 bg-white p-8 text-center shadow-lg">
      <div className="flex justify-center gap-2 mb-4">
        <Zap className="h-8 w-8 text-amber" />
      </div>
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Fast Sales Training Center</p>
      <h2 className="text-2xl font-bold text-navy mb-1">Certificate of Completion</h2>
      <div className="my-6 h-px bg-amber-400/50" />
      <p className="text-sm text-muted-foreground mb-1">This certifies that</p>
      <p className="text-xl font-semibold text-navy mb-4">Alex Johnson</p>
      <p className="text-sm text-muted-foreground mb-1">has successfully completed</p>
      <p className="text-lg font-semibold text-navy mb-4">{cert.courseTitle}</p>
      <div className="my-6 h-px bg-amber-400/50" />
      <div className="flex justify-between text-xs text-muted-foreground">
        <div>
          <p className="font-medium">Date</p>
          <p>{new Date(cert.completedDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
        <div>
          <p className="font-medium">Credential ID</p>
          <p>{cert.credentialId}</p>
        </div>
      </div>
    </div>
  )
}

export default function CertificatesPage() {
  const thisYear = certificates.filter((c) => c.completedDate.startsWith("2026")).length
  const expiringSoon = 0

  return (
    <>
      <Navbar />
      <DashboardLayout variant="learner">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-navy">My Certificates</h1>
            <p className="text-muted-foreground">View and download your earned certificates</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-amber-100 p-3"><Award className="h-5 w-5 text-amber-700" /></div>
                <div><p className="text-sm text-muted-foreground">Total Certificates</p><p className="text-2xl font-bold">{certificates.length}</p></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-green-100 p-3"><Calendar className="h-5 w-5 text-green-700" /></div>
                <div><p className="text-sm text-muted-foreground">This Year</p><p className="text-2xl font-bold">{thisYear}</p></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-blue-100 p-3"><Award className="h-5 w-5 text-blue-700" /></div>
                <div><p className="text-sm text-muted-foreground">Expiring Soon</p><p className="text-2xl font-bold">{expiringSoon}</p></div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert, i) => (
              <Card key={cert.id} className="overflow-hidden">
                <div className={`bg-gradient-to-br ${gradients[i % gradients.length]} p-6 text-white`}>
                  <Award className="h-10 w-10 mb-3 opacity-80" />
                  <h3 className="font-semibold text-lg leading-tight">{cert.courseTitle}</h3>
                </div>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Completed {new Date(cert.completedDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Credential: {cert.credentialId}</p>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Certificate Preview</DialogTitle>
                        </DialogHeader>
                        <CertificatePreview cert={cert} />
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-1" /> Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}
