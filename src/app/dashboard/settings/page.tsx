"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CreditCard, Check } from "lucide-react"
import { userProfile, billingHistory } from "@/lib/mock-data"

function ToggleRow({ label, description, defaultOn = true }: { label: string; description: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => setOn(!on)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${on ? "bg-primary" : "bg-muted"}`}
      >
        <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform ${on ? "translate-x-5" : "translate-x-0"}`} />
      </button>
    </div>
  )
}

export default function SettingsPage() {
  const [profile, setProfile] = useState(userProfile)

  return (
    <>
      <Navbar />
      <DashboardLayout variant="learner">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-navy">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences</p>
          </div>

          <Tabs defaultValue="profile">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="text-lg">AJ</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">Change Photo</Button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="org">Organization</Label>
                      <Input id="org" value={profile.organization} onChange={(e) => setProfile({ ...profile, organization: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input id="jobTitle" value={profile.jobTitle} onChange={(e) => setProfile({ ...profile, jobTitle: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      rows={3}
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>Choose what emails you receive</CardDescription>
                </CardHeader>
                <CardContent className="divide-y">
                  <ToggleRow label="Course Updates" description="Get notified about updates to courses you're enrolled in" />
                  <ToggleRow label="New Course Announcements" description="Be the first to know about new courses" />
                  <ToggleRow label="Completion Reminders" description="Receive reminders to complete in-progress courses" />
                  <ToggleRow label="Certificate Notifications" description="Get notified when you earn a new certificate" />
                  <ToggleRow label="Marketing Emails" description="Receive promotional offers and newsletters" defaultOn={false} />
                  <ToggleRow label="Weekly Progress Reports" description="Get a weekly summary of your learning progress" />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="mt-6 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold">Pro Plan</p>
                        <p className="text-sm text-muted-foreground">$49.99/month</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm">
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" />Unlimited course access</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" />Certificate generation</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" />Priority support</li>
                    </ul>
                    <Button variant="outline" className="mt-4 w-full">Change Plan</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-muted p-3"><CreditCard className="h-5 w-5" /></div>
                      <div>
                        <p className="text-sm font-medium">Visa ending in 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 09/2027</p>
                      </div>
                    </div>
                    <Button variant="outline" className="mt-4 w-full">Update Payment Method</Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {billingHistory.map((b) => (
                        <TableRow key={b.id}>
                          <TableCell className="text-muted-foreground">{b.date}</TableCell>
                          <TableCell className="font-medium">{b.description}</TableCell>
                          <TableCell>${b.amount.toFixed(2)}</TableCell>
                          <TableCell><Badge variant="default">{b.status}</Badge></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  )
}
