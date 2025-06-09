import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, BookOpen, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-12">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary/20 via-background to-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4 text-left">
              <div className="space-y-2">
                <h1 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground">
                  Welcome to ExamFlow
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Streamline your practical and project exam management. Assign rooms, update statuses, and keep students informed, all in one place.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="font-semibold">
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="font-semibold">
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </div>
            <Image
              src="https://placehold.co/600x400.png"
              alt="Exam Management Illustration"
              data-ai-hint="education schedule"
              width={600}
              height={400}
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
              <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl text-foreground">
                Everything You Need for Smooth Exams
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                ExamFlow provides a comprehensive suite of tools to manage exam logistics effectively.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16 mt-12">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <CheckCircle className="w-8 h-8 text-accent" />
                <CardTitle className="font-headline">Status Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Easily update and track exam statuses: scheduled, in-progress, or completed. Keep everyone on the same page.</CardDescription>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <BookOpen className="w-8 h-8 text-accent" />
                <CardTitle className="font-headline">Room & Time Assignment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Clearly display room assignments and exam timings. Real-time updates ensure students have the latest info.</CardDescription>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Users className="w-8 h-8 text-accent" />
                <CardTitle className="font-headline">Role-Based Access</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Secure Firebase authentication for students and staff, ensuring data privacy and appropriate access levels.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-muted/50">
         <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
           <div className="space-y-3">
             <h2 className="text-3xl font-headline font-bold tracking-tighter md:text-4xl/tight text-foreground">
               Ready to Simplify Your Exam Process?
             </h2>
             <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
               Join ExamFlow today and experience a more organized and efficient way to manage academic examinations.
             </p>
           </div>
           <div className="mx-auto w-full max-w-sm space-y-2">
            <Button asChild size="lg" className="w-full font-semibold">
                <Link href="/signup">Sign Up Now</Link>
            </Button>
           </div>
         </div>
       </section>
    </div>
  );
}
