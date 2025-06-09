"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && userProfile) {
      if (userProfile.role === 'student') {
        router.replace('/student/dashboard');
      } else if (userProfile.role === 'staff') {
        router.replace('/staff/dashboard');
      } else {
        // Fallback or error handling if role is undefined
        router.replace('/login');
      }
    } else if (!loading && !userProfile) {
      // Not authenticated or profile not loaded
      router.replace('/login');
    }
  }, [userProfile, loading, router]);

  return (
    <div className="flex min-h-[calc(100vh-150px)] items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="ml-4 text-lg text-muted-foreground">Loading your dashboard...</p>
    </div>
  );
}
