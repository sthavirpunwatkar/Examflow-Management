import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-150px)] items-center justify-center py-12">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
