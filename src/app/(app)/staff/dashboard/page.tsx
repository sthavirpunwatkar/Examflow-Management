"use client";

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import type { Exam } from '@/lib/types';
import { db } from '@/lib/firebase/config';
import { collection, getDocs, doc, updateDoc, Timestamp, onSnapshot } from 'firebase/firestore';
import ExamManagementTable from '@/components/dashboard/ExamManagementTable';
import { useToast } from '@/hooks/use-toast';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; // Example: for add exam button

export default function StaffDashboardPage() {
  const { userProfile, loading: authLoading } = useAuth();
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (authLoading) return;

    if (!userProfile || userProfile.role !== 'staff') {
      setLoading(false);
      // Auth guard in layout should handle redirection
      return;
    }

    setLoading(true);
    setError(null);
    const examsRef = collection(db, 'exams');
    
    // Using onSnapshot for real-time updates
    const unsubscribe = onSnapshot(examsRef, (querySnapshot) => {
      const examsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          dateTime: data.dateTime instanceof Timestamp ? data.dateTime.toDate().toISOString() : data.dateTime,
        } as Exam;
      });
      setExams(examsData);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching exams in real-time:", err);
      setError('Failed to load exam data. Please try refreshing.');
      setLoading(false);
      toast({
        title: "Error Loading Exams",
        description: "Could not fetch exam data in real-time.",
        variant: "destructive",
      });
    });

    return () => unsubscribe(); // Cleanup listener on component unmount

  }, [userProfile, authLoading, toast]);

  const handleUpdateExam = useCallback(async (examId: string, data: Partial<Exam>) => {
    if (!userProfile || userProfile.role !== 'staff') {
      toast({ title: "Unauthorized", description: "You don't have permission to update exams.", variant: "destructive" });
      return;
    }
    
    const examDocRef = doc(db, 'exams', examId);
    try {
      // If dateTime is being updated, convert ISO string back to Firestore Timestamp
      const updateData = { ...data };
      if (data.dateTime) {
        updateData.dateTime = Timestamp.fromDate(new Date(data.dateTime));
      }
      
      await updateDoc(examDocRef, updateData);
      // Notification: "FCM notification would be triggered here for student."
      // This is handled by onSnapshot automatically updating the UI.
      // Manual toast is in the modal upon successful save.
    } catch (err) {
      console.error("Error updating exam:", err);
      throw err; // Re-throw to be caught by the modal's error handler
    }
  }, [userProfile, toast]);

  if (loading || authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Loading exam management dashboard...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-headline font-bold text-foreground">Exam Management</h1>
          <p className="text-muted-foreground">Oversee and update all student practicals and project exams.</p>
        </div>
        {/* Placeholder for "Add New Exam" button if needed in future */}
        {/* <Button>Add New Exam</Button> */}
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
      
      {!error && <ExamManagementTable exams={exams} onUpdateExam={handleUpdateExam} isLoading={loading} />}
    </div>
  );
}
