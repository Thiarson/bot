import { Suspense } from 'react';

import AuthNavbar from '@/components/auth/navbar';
import SignupForm from '@/components/auth/signup-form';

export default function Page() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Header */}
      <AuthNavbar type="signup" />

      {/* Main Content */}
      <main className="relative z-10 px-6 flex items-center justify-center min-h-[calc(100vh-80px)] py-8">
        <div className="w-full max-w-md">
          {/* Signup Card */}
          <Suspense>
            <SignupForm/>
          </Suspense>
        </div>
      </main>
    </div>
  );
}
