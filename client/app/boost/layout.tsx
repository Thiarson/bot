import { SessionProvider } from 'next-auth/react';

import Navbar from '@/components/boost/navbar';
import Sidebar from '@/components/boost/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
        {/* Fixed Header */}
        <div className="flex-shrink-0">
          <Navbar/>
        </div>

        <div className="flex flex-1 min-h-0">
          {/* Responsive Fixed Sidebar */}
          <div className="flex-shrink-0">
            <Sidebar/>
          </div>

          {/* Scrollable Main Content */}
          <main className="flex-1 overflow-y-auto min-w-0">
            <div className="w-full px-4 md:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SessionProvider>
  )
}
