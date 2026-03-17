"use client"

import { useState, useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  Circle,
  Video,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { courses, enrolledCourses } from "@/lib/mock-data"
import type { Lesson, LessonType } from "@/types"

function getLessonIcon(type: LessonType) {
  switch (type) {
    case "video":
      return Video
    case "quiz":
      return HelpCircle
    case "reading":
      return FileText
  }
}

function getLessonTypeBadge(type: LessonType) {
  switch (type) {
    case "video":
      return "Video"
    case "quiz":
      return "Quiz"
    case "reading":
      return "Reading"
  }
}

export default function CoursePlayerPage() {
  const params = useParams()
  const courseId = params.id as string

  const course = courses.find((c) => c.id === courseId)
  const enrolled = enrolledCourses.find((ec) => ec.courseId === courseId)
  const progress = enrolled?.progress ?? 0

  const [currentModuleIndex, setCurrentModuleIndex] = useState(
    enrolled?.currentModuleIndex ?? 0
  )
  const [currentLessonIndex, setCurrentLessonIndex] = useState(
    enrolled?.currentLessonIndex ?? 0
  )
  const [expandedModules, setExpandedModules] = useState<Set<number>>(
    () => new Set(course?.curriculum.map((_, i) => i) ?? [])
  )

  // Calculate which lessons are "completed" based on progress percentage
  const completedLessons = useMemo(() => {
    if (!course) return new Set<string>()
    const allLessons: { moduleIndex: number; lessonIndex: number; id: string }[] = []
    course.curriculum.forEach((mod, mi) => {
      mod.lessons.forEach((lesson, li) => {
        allLessons.push({ moduleIndex: mi, lessonIndex: li, id: lesson.id })
      })
    })
    const totalLessons = allLessons.length
    const completedCount = Math.floor((progress / 100) * totalLessons)
    const completed = new Set<string>()
    for (let i = 0; i < completedCount; i++) {
      completed.add(allLessons[i].id)
    }
    return completed
  }, [course, progress])

  if (!course) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Course not found</h1>
          <Button asChild className="mt-4">
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  const currentModule = course.curriculum[currentModuleIndex]
  const currentLesson = currentModule?.lessons[currentLessonIndex]

  const toggleModule = (index: number) => {
    setExpandedModules((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const navigateToLesson = (moduleIndex: number, lessonIndex: number) => {
    setCurrentModuleIndex(moduleIndex)
    setCurrentLessonIndex(lessonIndex)
  }

  const goToPrevious = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1)
    } else if (currentModuleIndex > 0) {
      const prevModule = course.curriculum[currentModuleIndex - 1]
      setCurrentModuleIndex(currentModuleIndex - 1)
      setCurrentLessonIndex(prevModule.lessons.length - 1)
    }
  }

  const goToNext = () => {
    if (currentLesson && currentLessonIndex < currentModule.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1)
    } else if (currentModuleIndex < course.curriculum.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1)
      setCurrentLessonIndex(0)
    }
  }

  const isFirst =
    currentModuleIndex === 0 && currentLessonIndex === 0
  const isLast =
    currentModuleIndex === course.curriculum.length - 1 &&
    currentLessonIndex === currentModule.lessons.length - 1

  const LessonIcon = currentLesson ? getLessonIcon(currentLesson.type) : Video

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top Bar */}
      <header className="flex h-14 shrink-0 items-center gap-4 border-b bg-white px-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to Dashboard</span>
          </Link>
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <h1 className="truncate text-sm font-semibold text-navy">
          {course.title}
        </h1>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            {progress}%
          </span>
          <Progress value={progress} className="w-32" />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Video & Lesson Content */}
        <div className="flex flex-1 flex-col overflow-auto">
          {/* Video Placeholder */}
          <div className="flex aspect-video w-full items-center justify-center bg-gray-900">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                <Play className="h-8 w-8 text-white" />
              </div>
              <p className="text-lg font-medium text-white">Video Player</p>
              <p className="text-sm text-white/60">
                {currentLesson?.title}
              </p>
            </div>
          </div>

          {/* Lesson Info */}
          <div className="flex-1 p-6">
            <div className="mb-4 flex items-center gap-3">
              <h2 className="text-xl font-bold text-navy">
                {currentLesson?.title}
              </h2>
              <Badge variant="secondary">
                {currentLesson ? getLessonTypeBadge(currentLesson.type) : ""}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {currentLesson?.duration}
              </span>
            </div>

            <Separator className="mb-6" />

            <div className="prose max-w-none text-muted-foreground">
              <p>
                This lesson covers the key concepts and techniques related to{" "}
                <strong>{currentLesson?.title}</strong>. Follow along with the
                video above and take notes on the important takeaways. You will
                be able to apply these skills directly in your day-to-day work
                at the dealership.
              </p>
              <p className="mt-4">
                After completing this lesson, proceed to the next one to
                continue building your knowledge. Remember, consistent practice
                is the key to mastering these skills.
              </p>
            </div>

            {/* Bottom Controls */}
            <div className="mt-8 flex items-center justify-between border-t pt-6">
              <Button
                variant="outline"
                onClick={goToPrevious}
                disabled={isFirst}
              >
                Previous Lesson
              </Button>
              <Button variant="secondary">
                <CheckCircle2 className="mr-1 h-4 w-4" />
                Mark as Complete
              </Button>
              <Button onClick={goToNext} disabled={isLast}>
                Next Lesson
              </Button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Module/Lesson List */}
        <aside className="hidden w-80 shrink-0 overflow-auto border-l bg-muted/30 lg:block">
          <div className="p-4">
            <h3 className="mb-4 text-sm font-semibold text-navy">
              Course Content
            </h3>
            <div className="space-y-2">
              {course.curriculum.map((module, mi) => {
                const isExpanded = expandedModules.has(mi)
                return (
                  <div key={module.id}>
                    {/* Module Header */}
                    <button
                      onClick={() => toggleModule(mi)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-muted"
                    >
                      <span className="truncate">{module.title}</span>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                      )}
                    </button>

                    {/* Lessons */}
                    {isExpanded && (
                      <div className="ml-2 mt-1 space-y-0.5">
                        {module.lessons.map((lesson, li) => {
                          const isActive =
                            mi === currentModuleIndex &&
                            li === currentLessonIndex
                          const isCompleted = completedLessons.has(lesson.id)
                          const TypeIcon = getLessonIcon(lesson.type)

                          return (
                            <button
                              key={lesson.id}
                              onClick={() => navigateToLesson(mi, li)}
                              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                                isActive
                                  ? "bg-primary/10 font-medium text-primary"
                                  : "text-muted-foreground hover:bg-muted"
                              }`}
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
                              ) : (
                                <Circle className="h-4 w-4 shrink-0 text-gray-400" />
                              )}
                              <span className="flex-1 truncate">
                                {lesson.title}
                              </span>
                              <TypeIcon className="h-3 w-3 shrink-0 text-muted-foreground" />
                              <span className="shrink-0 text-xs text-muted-foreground">
                                {lesson.duration}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
