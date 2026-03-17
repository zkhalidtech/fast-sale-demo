"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Star,
  Clock,
  Users,
  BarChart3,
  CheckCircle2,
  PlayCircle,
  FileQuestion,
  BookOpen,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { courses } from "@/lib/mock-data";
import type { LessonType } from "@/types";

function getLessonIcon(type: LessonType) {
  switch (type) {
    case "video":
      return PlayCircle;
    case "quiz":
      return FileQuestion;
    case "reading":
      return BookOpen;
    default:
      return PlayCircle;
  }
}

function getLevelColor(level: string) {
  switch (level) {
    case "Beginner":
      return "bg-emerald-100 text-emerald-800";
    case "Intermediate":
      return "bg-blue-100 text-blue-800";
    case "Advanced":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Course Not Found</h1>
            <p className="mt-2 text-muted-foreground">
              The course you are looking for does not exist.
            </p>
            <Button asChild className="mt-4">
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const totalLessons = course.curriculum.reduce(
    (acc, module) => acc + module.lessons.length,
    0
  );

  const instructorInitials = course.instructor
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Banner */}
        <div className={`${course.thumbnail} py-16 text-white`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Badge className="mb-4 bg-amber text-navy-dark">
              {course.category}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {course.title}
            </h1>
            <p className="mt-2 text-lg text-white/80">{course.instructor}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/80">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber text-amber" />
                <span className="font-semibold text-white">{course.rating}</span>
                ({course.studentsEnrolled.toLocaleString()} students)
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {course.duration}
              </span>
              <Badge
                variant="secondary"
                className={getLevelColor(course.level)}
              >
                {course.level}
              </Badge>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Left Column */}
            <div className="lg:col-span-2">
              {/* Description */}
              <section>
                <h2 className="text-2xl font-bold text-foreground">
                  About This Course
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {course.description}
                </p>
              </section>

              <Separator className="my-8" />

              {/* Learning Outcomes */}
              <section>
                <h2 className="text-2xl font-bold text-foreground">
                  What You&apos;ll Learn
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {course.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                      <span className="text-sm text-muted-foreground">
                        {outcome}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <Separator className="my-8" />

              {/* Curriculum */}
              <section>
                <h2 className="text-2xl font-bold text-foreground">
                  Curriculum
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {course.curriculum.length} modules &middot; {totalLessons}{" "}
                  lessons &middot; {course.duration} total
                </p>
                <Accordion type="multiple" className="mt-4">
                  {course.curriculum.map((module, moduleIndex) => (
                    <AccordionItem key={module.id} value={module.id}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-3">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                            {moduleIndex + 1}
                          </span>
                          <span className="font-semibold">{module.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {module.lessons.length} lessons
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 pl-10">
                          {module.lessons.map((lesson) => {
                            const LessonIcon = getLessonIcon(lesson.type);
                            return (
                              <li
                                key={lesson.id}
                                className="flex items-center justify-between rounded-md p-2 text-sm hover:bg-muted/50"
                              >
                                <div className="flex items-center gap-3">
                                  <LessonIcon className="h-4 w-4 text-muted-foreground" />
                                  <span>{lesson.title}</span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {lesson.duration}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

              <Separator className="my-8" />

              {/* Instructor */}
              <section>
                <h2 className="text-2xl font-bold text-foreground">
                  Your Instructor
                </h2>
                <div className="mt-4 flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-navy text-lg font-semibold text-white">
                      {instructorInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {course.instructor}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {course.instructorRole}
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column - Pricing Card */}
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <div className="text-center">
                    <span className="text-4xl font-bold text-foreground">
                      ${course.price}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    className="w-full bg-amber text-navy-dark font-semibold hover:bg-amber-dark"
                    size="lg"
                    asChild
                  >
                    <Link href={`/learn/${course.id}`}>Enroll Now</Link>
                  </Button>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        Students Enrolled
                      </span>
                      <span className="font-medium">
                        {course.studentsEnrolled.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Star className="h-4 w-4" />
                        Rating
                      </span>
                      <span className="font-medium">{course.rating} / 5.0</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Duration
                      </span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <BarChart3 className="h-4 w-4" />
                        Level
                      </span>
                      <span className="font-medium">{course.level}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
