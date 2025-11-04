import { Suspense } from 'react';

import AuthNavbar from '@/components/auth/navbar';
import LoginForm from '@/components/auth/login-form';

export default function Page() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Header */}
      <AuthNavbar type="login" />

      {/* Main Content */}
      <main className="relative z-10 px-6 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <Suspense>
            <LoginForm/>
          </Suspense>
        </div>
      </main>
    </div>
  );
}
