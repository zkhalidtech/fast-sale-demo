"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Clock, CheckCircle2, XCircle, RotateCcw, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { courses, quizQuestions } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.id as string
  const course = useMemo(() => courses.find((c) => c.id === courseId), [courseId])

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(quizQuestions.length).fill(null))
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes

  useEffect(() => {
    if (showResults) return
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setShowResults(true)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [showResults])

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`

  const question = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  const selectAnswer = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = optionIndex
    setSelectedAnswers(newAnswers)
  }

  const score = useMemo(() => {
    let correct = 0
    quizQuestions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctAnswer) correct++
    })
    return correct
  }, [selectedAnswers])

  const percentage = Math.round((score / quizQuestions.length) * 100)
  const passed = percentage >= 70

  const handleSubmit = () => {
    setShowResults(true)
  }

  const handleRetake = () => {
    setSelectedAnswers(new Array(quizQuestions.length).fill(null))
    setCurrentQuestion(0)
    setShowResults(false)
    setTimeLeft(600)
  }

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Course not found</p>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-muted/30">
        <div className="border-b bg-white">
          <div className="mx-auto flex h-14 max-w-4xl items-center gap-4 px-4">
            <Link href={`/learn/${courseId}`} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <span className="font-semibold text-navy">Quiz Results</span>
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 py-12">
          <Card className="text-center p-8">
            <div className="mx-auto mb-6 relative h-32 w-32">
              <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                <circle cx="60" cy="60" r="54" fill="none" stroke={passed ? "#10b981" : "#ef4444"} strokeWidth="8" strokeDasharray={`${percentage * 3.39} 339.3`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{percentage}%</span>
              </div>
            </div>

            <Badge variant={passed ? "default" : "destructive"} className="mb-4 text-sm px-4 py-1">
              {passed ? "PASSED" : "NOT PASSED"}
            </Badge>

            <h2 className="text-xl font-bold text-navy mb-2">
              {passed ? "Congratulations!" : "Keep Practicing!"}
            </h2>
            <p className="text-muted-foreground mb-6">
              You scored {score} out of {quizQuestions.length} questions correctly.
              {!passed && " You need 70% to pass."}
            </p>

            <div className="space-y-3 text-left mb-8">
              {quizQuestions.map((q, i) => {
                const isCorrect = selectedAnswers[i] === q.correctAnswer
                return (
                  <div key={q.id} className={cn("flex items-start gap-3 rounded-lg border p-3", isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50")}>
                    {isCorrect ? <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" /> : <XCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />}
                    <div className="text-sm">
                      <p className="font-medium">{q.question}</p>
                      {!isCorrect && (
                        <p className="text-muted-foreground mt-1">
                          Correct answer: {q.options[q.correctAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={handleRetake}>
                <RotateCcw className="h-4 w-4 mr-2" /> Retake Quiz
              </Button>
              <Button onClick={() => router.push(`/learn/${courseId}`)}>
                <ArrowRight className="h-4 w-4 mr-2" /> Continue Course
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top Bar */}
      <div className="border-b bg-white">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href={`/learn/${courseId}`} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <span className="font-semibold text-navy text-sm sm:text-base truncate max-w-[200px] sm:max-w-none">{course.title} — Quiz</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <div className="flex items-center gap-1 text-sm font-medium">
              <Clock className="h-4 w-4" />
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
        <Progress value={progress} className="h-1" />
      </div>

      {/* Question Area */}
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-2 text-sm text-muted-foreground">Question {currentQuestion + 1} of {quizQuestions.length}</div>
        <h2 className="text-xl font-semibold text-navy mb-8">{question.question}</h2>

        <div className="space-y-3 mb-8">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => selectAnswer(i)}
              className={cn(
                "w-full rounded-lg border-2 p-4 text-left text-sm font-medium transition-all hover:border-primary/50",
                selectedAnswers[currentQuestion] === i
                  ? "border-primary bg-primary/5"
                  : "border-muted"
              )}
            >
              <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs">
                {String.fromCharCode(65 + i)}
              </span>
              {option}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>

          {currentQuestion === quizQuestions.length - 1 ? (
            <Button onClick={handleSubmit}>
              Submit Quiz
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentQuestion(Math.min(quizQuestions.length - 1, currentQuestion + 1))}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
