import Link from "next/link";
import {
  Car,
  DollarSign,
  Briefcase,
  Crown,
  Shield,
  Star,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Course, CourseCategory } from "@/types";

function getCategoryIcon(category: CourseCategory) {
  switch (category) {
    case "Auto Sales":
      return Car;
    case "F&I Training":
      return DollarSign;
    case "Auto Broker":
      return Briefcase;
    case "Leadership":
      return Crown;
    case "Compliance":
      return Shield;
    default:
      return Car;
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

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const Icon = getCategoryIcon(course.category);

  return (
    <Link href={`/courses/${course.id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg group-hover:-translate-y-0.5">
        <div
          className={`relative flex h-[200px] items-center justify-center ${course.thumbnail}`}
        >
          <Icon className="h-16 w-16 text-white/30" />
          <Badge className="absolute right-3 top-3 bg-amber text-navy-dark">
            {course.category}
          </Badge>
        </div>
        <CardHeader className="pb-2">
          <div className="mb-2">
            <Badge
              variant="secondary"
              className={getLevelColor(course.level)}
            >
              {course.level}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold leading-tight text-foreground group-hover:text-navy">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground">{course.instructor}</p>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {course.description}
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <span className="text-xl font-bold text-foreground">
            ${course.price}
          </span>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber text-amber" />
              {course.rating}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {course.duration}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
