import AnimatedBackground from '@/components/background';
import AuthNavbar from '@/components/auth/navbar';
import LoginForm from '@/components/auth/login-form';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <AnimatedBackground/>

      {/* Header */}
      <AuthNavbar type="login" />

      {/* Main Content */}
      <main className="relative z-10 px-6 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <LoginForm/>
        </div>
      </main>
    </div>
  );
}
