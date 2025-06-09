
# ExamFlow: Streamlined Exam Management System

ExamFlow is a web application designed to simplify and modernize the management of student practicals and project exams. It provides distinct interfaces and functionalities for students and staff members, ensuring a smooth and organized examination process.

## Overview

Managing examination logistics can be complex. ExamFlow addresses this by offering a centralized platform where:
- **Staff** can easily schedule exams, assign rooms, update exam statuses (scheduled, in-progress, completed), and oversee all student examinations.
- **Students** can conveniently view their assigned exam details, including subject, date, time, room, and current status, ensuring they are always up-to-date.

The application leverages a modern tech stack for a responsive, real-time, and user-friendly experience.

## Key Features

- **Role-Based Access Control:**
    - Separate dashboards and functionalities for **Students** and **Staff**.
    - Secure authentication using Firebase.
- **Student Dashboard:**
    - View assigned exam details: subject, status, room, and date/time.
    - Clear and concise presentation of information.
- **Staff Dashboard:**
    - Comprehensive table view of all scheduled exams.
    - Real-time updates on exam statuses.
    - Ability to **edit exam details** (status, room, date/time) through an intuitive modal.
- **Real-time Data Synchronization:**
    - Firestore is used as the backend database, enabling real-time updates for exam information. Changes made by staff are reflected instantly for students.
- **User-Friendly Interface:**
    - Built with Next.js and React for a fast and modern user experience.
    - Styled with ShadCN UI components and Tailwind CSS for a clean and professional look.
    - Responsive design for accessibility on various devices.
- **Toast Notifications:**
    - Provides feedback to users for actions like login, signup, and exam updates.

## Tech Stack

- **Frontend:**
    - [Next.js](https://nextjs.org/) (React Framework with App Router)
    - [React](https://reactjs.org/)
    - [TypeScript](https://www.typescriptlang.org/)
- **UI & Styling:**
    - [ShadCN UI](https://ui.shadcn.com/) (Reusable UI components)
    - [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS framework)
    - [Lucide React](https://lucide.dev/) (Icons)
- **Backend & Database:**
    - [Firebase](https://firebase.google.com/):
        - **Firestore:** NoSQL database for storing user profiles and exam data.
        - **Firebase Authentication:** For user signup and login.
- **State Management & Hooks:**
    - React Context API (for AuthProvider)
    - Custom React Hooks (`useAuth`, `useToast`)
- **Form Handling:**
    - [React Hook Form](https://react-hook-form.com/)
    - [Zod](https://zod.dev/) (for schema validation)
- **Date & Time:**
    - [date-fns](https://date-fns.org/) (for date formatting)
- **AI (Potential for future integration):**
    - [Genkit](https://firebase.google.com/docs/genkit) (Genkit is part of the base stack but not actively used in core exam features yet)

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Firebase Setup

1.  Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/).
2.  Enable **Authentication** (Email/Password provider).
3.  Enable **Firestore** database.
4.  In your Firebase project settings, add a new Web App.
5.  Copy the Firebase configuration object.
6.  Replace the placeholder values in `src/lib/firebase/config.ts` with your actual Firebase project configuration:
    ```typescript
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID",
    };
    ```
    Alternatively, use environment variables as shown in the file (`NEXT_PUBLIC_FIREBASE_API_KEY`, etc.).

### Installation & Running the App

1.  **Clone the repository (if applicable):**
    ```bash
    # git clone <repository-url>
    # cd <project-directory>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    # yarn dev
    ```
    The application will typically be available at `http://localhost:9002`.

## Folder Structure

A brief overview of the main directories:

-   **`src/app/`**: Contains all Next.js App Router pages and layouts.
    -   **`(auth)/`**: Layout and pages for authentication (login, signup).
    -   **`(app)/`**: Layout and pages for authenticated users.
        -   **`dashboard/`**: Main redirection dashboard.
        -   **`staff/dashboard/`**: Staff-specific dashboard page.
        -   **`student/dashboard/`**: Student-specific dashboard page.
    -   **`globals.css`**: Global styles and Tailwind CSS theme configuration.
    -   **`layout.tsx`**: Root layout for the entire application.
    -   **`page.tsx`**: Homepage of the application.
-   **`src/components/`**: Reusable React components.
    -   **`auth/`**: Authentication related components (LoginForm, SignupForm, AuthProvider).
    -   **`dashboard/`**: Components used in the dashboards (ExamManagementTable, StudentExamCard, UpdateExamModal).
    -   **`layout/`**: Layout components like AppHeader.
    -   **`ui/`**: ShadCN UI components (Button, Card, Input, etc.).
-   **`src/hooks/`**: Custom React hooks (e.g., `useAuth`, `useToast`, `useIsMobile`).
-   **`src/lib/`**: Core logic, type definitions, and utility functions.
    -   **`firebase/`**: Firebase configuration (`config.ts`).
    -   **`types.ts`**: TypeScript type definitions for the application.
    -   **`utils.ts`**: Utility functions like `cn` for classnames.
-   **`src/ai/`**: (Currently placeholder) For Genkit AI flows and related code.
-   **`public/`**: Static assets.
-   **`next.config.ts`**: Next.js configuration file.
-   **`tailwind.config.ts`**: Tailwind CSS configuration file.
-   **`components.json`**: ShadCN UI configuration.

## Future Enhancements (Potential Ideas)

-   Real-time notifications for students on exam updates (e.g., room change, time change).
-   Bulk exam creation/upload for staff members.
-   Advanced search and filtering capabilities on the staff dashboard.
-   Integration with calendar services for students.
-   AI-assisted scheduling or room allocation suggestions for staff (leveraging Genkit).

---

This project serves as a foundation for a robust exam management system. Feel free to explore, modify, and extend its capabilities!
