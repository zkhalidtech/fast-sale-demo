export type CourseCategory =
  | "Auto Sales"
  | "F&I Training"
  | "Auto Broker"
  | "Leadership"
  | "Compliance";

export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export type LessonType = "video" | "quiz" | "reading";

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  duration: string;
  completed?: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorRole: string;
  price: number;
  category: CourseCategory;
  level: CourseLevel;
  duration: string;
  studentsEnrolled: number;
  rating: number;
  curriculum: Module[];
  learningOutcomes: string[];
  thumbnail: string;
}

export interface EnrolledCourse {
  courseId: string;
  course: Course;
  progress: number;
  currentModuleIndex: number;
  currentLessonIndex: number;
  enrolledDate: string;
  lastAccessed: string;
}

export interface Certificate {
  id: string;
  courseTitle: string;
  completedDate: string;
  credentialId: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  initials: string;
}

export interface AdminStats {
  totalRevenue: number;
  totalEnrollments: number;
  activeLearners: number;
  completionRate: number;
  revenueChange: number;
  enrollmentChange: number;
  learnersChange: number;
  completionChange: number;
}

export interface MonthlyData {
  month: string;
  revenue: number;
  enrollments: number;
}

export interface RecentEnrollment {
  id: string;
  learnerName: string;
  email: string;
  courseName: string;
  date: string;
  amount: number;
}
