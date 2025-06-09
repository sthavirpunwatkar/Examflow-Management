"use client";

import type { Exam } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Clock, PlayCircle, CheckCircle2, Info } from 'lucide-react';
import UpdateExamModal from './UpdateExamModal';
import { format, parseISO } from 'date-fns';

interface ExamManagementTableProps {
  exams: Exam[];
  onUpdateExam: (examId: string, data: Partial<Exam>) => Promise<void>;
  isLoading?: boolean;
}

const StatusDisplay = ({ status }: { status: Exam['status'] }) => {
  let icon;
  let textClass;
  let badgeVariant: "default" | "secondary" | "outline" | "destructive" = "outline";
  let badgeClass = "";

  switch (status) {
    case 'scheduled':
      icon = <Clock className="h-4 w-4 mr-2 text-blue-500" />;
      textClass = "text-blue-700";
      badgeVariant = "outline";
      badgeClass = "border-blue-500 text-blue-700";
      break;
    case 'in-progress':
      icon = <PlayCircle className="h-4 w-4 mr-2 text-orange-500" />;
      textClass = "text-orange-700";
      badgeVariant = "secondary";
      badgeClass = "bg-orange-100 text-orange-700 border-orange-300";
      break;
    case 'completed':
      icon = <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />;
      textClass = "text-green-700";
      badgeVariant = "default"; // This will use primary theme color, we want accent green
      badgeClass = "bg-accent text-accent-foreground";
      break;
    default:
      icon = <Info className="h-4 w-4 mr-2 text-gray-500" />;
      textClass = "text-gray-700";
      badgeVariant = "outline";
  }

  return (
    <Badge variant={badgeVariant} className={cn("capitalize flex items-center w-fit", badgeClass)}>
      {icon}
      {status.replace('-', ' ')}
    </Badge>
  );
};


export default function ExamManagementTable({ exams, onUpdateExam, isLoading }: ExamManagementTableProps) {
  if (isLoading) {
     return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-muted rounded animate-pulse" />
        ))}
      </div>
    );
  }
  
  if (!exams.length && !isLoading) {
    return <p className="text-center text-muted-foreground py-8">No exams found.</p>;
  }

  return (
    <Card className="shadow-lg">
     <CardHeader>
        <CardTitle className="font-headline text-2xl">Manage Student Exams</CardTitle>
        <CardDescription>View and update exam details for all students.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Student Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell className="font-medium">{exam.studentName}</TableCell>
                <TableCell>{exam.subject}</TableCell>
                <TableCell>
                  <StatusDisplay status={exam.status} />
                </TableCell>
                <TableCell>{exam.room}</TableCell>
                <TableCell>{exam.dateTime ? format(parseISO(exam.dateTime), "PPp") : "N/A"}</TableCell>
                <TableCell className="text-right">
                  <UpdateExamModal exam={exam} onUpdate={onUpdateExam}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </UpdateExamModal>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {exams.length === 0 && <TableCaption>No exams scheduled at the moment.</TableCaption>}
      </CardContent>
    </Card>
  );
}

// Need to import Card related components if not done globally
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
