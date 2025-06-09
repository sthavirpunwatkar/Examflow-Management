"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import type { Exam } from '@/lib/types';
import { db } from '@/lib/firebase/config';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import StudentExamCard from '@/components/dashboard/StudentExamCard';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StudentDashboardPage() {
  const { userProfile, loading: authLoading } = useAuth();
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;

    if (!userProfile || userProfile.role !== 'student') {
      setLoading(false);
      // Auth guard in layout should handle redirection, but good to be safe.
      return;
    }

    const fetchExamData = async () => {
      setLoading(true);
      setError(null);
      const studentIdentifier = userProfile.studentId || userProfile.uid;

      try {
        const examsRef = collection(db, 'exams');
        // Assuming one student has one exam for simplicity, or the most relevant one.
        // In a real app, you might want to get all exams or filter by active ones.
        const q = query(examsRef, where('studentId', '==', studentIdentifier));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Get the first exam found for the student
          const examDoc = querySnapshot.docs[0];
          const examData = examDoc.data();
          setExam({
            id: examDoc.id,
            ...examData,
            // Convert Firestore Timestamp to ISO string if it's a Timestamp object
            dateTime: examData.dateTime instanceof Timestamp ? examData.dateTime.toDate().toISOString() : examData.dateTime,
          } as Exam);
        } else {
          setError('No exam information found for you at this time.');
        }
      } catch (err: any) {
        console.error("Error fetching exam data:", err);
        setError('Failed to load your exam details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
  }, [userProfile, authLoading]);

  if (loading || authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Loading your exam details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-headline font-bold text-foreground">Your Exam Dashboard</h1>
        <p className="text-muted-foreground">View your assigned exam details below.</p>
      </header>
      
      {error && (
         <Card className="border-destructive bg-destructive/10">
          <CardHeader className="flex flex-row items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {exam && !error && <StudentExamCard exam={exam} />}
      
      {!exam && !error && !loading && (
        <Card>
          <CardHeader>
            <CardTitle>No Exam Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>There is currently no exam information assigned to you. Please check back later or contact administration if you believe this is an error.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
