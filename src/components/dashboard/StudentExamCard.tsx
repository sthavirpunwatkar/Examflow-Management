"use client";

import type { Exam } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarClock, Home, Info, CheckCircle2, PlayCircle, Clock } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface StudentExamCardProps {
  exam: Exam;
}

const StatusIcon = ({ status }: { status: Exam['status'] }) => {
  switch (status) {
    case 'scheduled':
      return <Clock className="h-5 w-5 text-blue-500" />;
    case 'in-progress':
      return <PlayCircle className="h-5 w-5 text-orange-500" />;
    case 'completed':
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    default:
      return <Info className="h-5 w-5 text-gray-500" />;
  }
};

export default function StudentExamCard({ exam }: StudentExamCardProps) {
  const formattedDateTime = exam.dateTime ? format(parseISO(exam.dateTime), "PPPp") : "Not scheduled";
  
  const getStatusVariant = (status: Exam['status']): "default" | "secondary" | "destructive" | "outline" => {
    if (status === 'completed') return 'default'; // Using accent color via CSS for completed
    if (status === 'in-progress') return 'secondary';
    return 'outline';
  };
  
  const getStatusClass = (status: Exam['status']): string => {
    if (status === 'completed') return 'bg-accent text-accent-foreground';
    return '';
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">{exam.subject} - Examination Details</CardTitle>
        <CardDescription>Here are the current details for your upcoming exam.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
          <StatusIcon status={exam.status} />
          <div>
            <p className="text-sm font-medium text-muted-foreground">Status</p>
            <Badge variant={getStatusVariant(exam.status)} className={`capitalize text-base px-3 py-1 ${getStatusClass(exam.status)}`}>
              {exam.status.replace('-', ' ')}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
            <Home className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Assigned Room</p>
              <p className="text-lg font-semibold">{exam.room || "To be announced"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
            <CalendarClock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
              <p className="text-lg font-semibold">{formattedDateTime}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Please check regularly for any updates. If you have any questions, contact the administration.
          Notifications will be sent for any changes.
        </p>
      </CardFooter>
    </Card>
  );
}
