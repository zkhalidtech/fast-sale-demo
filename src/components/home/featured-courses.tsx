import Link from "next/link";
import { Star, Car, DollarSign, Briefcase } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/mock-data";
import type { CourseCategory } from "@/types";

function getCategoryIcon(category: CourseCategory) {
  switch (category) {
    case "Auto Sales":
      return Car;
    case "F&I Training":
      return DollarSign;
    case "Auto Broker":
      return Briefcase;
    default:
      return Car;
  }
}

export function FeaturedCourses() {
  const featured = courses.slice(0, 3);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Featured Courses
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Industry-leading training designed by top automotive professionals
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((course) => {
            const Icon = getCategoryIcon(course.category);
            return (
              <Card key={course.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                <div
                  className={`relative flex h-[200px] items-center justify-center ${course.thumbnail}`}
                >
                  <Icon className="h-16 w-16 text-white/30" />
                  <Badge className="absolute right-3 top-3 bg-amber text-navy-dark">
                    {course.category}
                  </Badge>
                </div>
                <CardHeader>
                  <h3 className="text-lg font-semibold leading-tight text-foreground">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {course.instructor}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber text-amber" />
                    <span className="text-sm font-medium">{course.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({course.studentsEnrolled.toLocaleString()} students)
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-foreground">
                    ${course.price}
                  </span>
                  <Button asChild>
                    <Link href={`/courses/${course.id}`}>View Course</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/courses">View All Courses</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
