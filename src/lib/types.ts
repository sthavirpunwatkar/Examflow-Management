import type { User as FirebaseUser } from 'firebase/auth';

export interface UserProfile {
  uid: string;
  email: string | null;
  name: string;
  role: 'student' | 'staff';
  studentId?: string; // Specific student identifier, could be same as UID
}

export interface Exam {
  id: string; // Firestore document ID
  studentId: string;
  studentName: string;
  subject: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  room: string;
  dateTime: string; // ISO string format for date and time
}

export interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
}
