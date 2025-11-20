import { SessionProvider } from 'next-auth/react';
import { NotificationProvider } from '@/context/notification-context';

import Navbar from '@/components/boost/navbar';
import Sidebar from '@/components/boost/sidebar';
import NotificationContainer from '@/components/notification';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NotificationProvider>
        <div className="h-screen flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-950">
          {/* Fixed Header */}
          <header className="flex-shrink-0 z-30">
            <Navbar/>
          </header>

          <div className="flex flex-1 min-h-0">
            {/* Responsive Fixed Sidebar */}
            <aside className="flex-shrink-0">
              <Sidebar/>
            </aside>

            {/* Scrollable Main Content */}
            <main 
              id="main-content"
              className="flex-1 overflow-y-auto min-w-0"
              role="main"
              aria-label="Main content"
            >
              <div className="w-full min-h-full px-4 py-2 md:px-6 lg:px-8 max-w-[1600px] mx-auto">
                {children}
              </div>
            </main>
          </div>
        </div>

        <NotificationContainer />
      </NotificationProvider>
    </SessionProvider>
  );
}
