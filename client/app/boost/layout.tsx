import { SessionProvider } from 'next-auth/react';

import Navbar from '@/components/boost/navbar';
import Sidebar from '@/components/boost/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <Navbar/>

        <div className="flex max-w-7xl mx-auto">
            {/* Sidebar */}
            <Sidebar/>

            {/* Main Content */}
            {children}
        </div>
      </div>
    </SessionProvider>
  )
}
