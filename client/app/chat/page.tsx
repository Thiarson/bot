import { SessionProvider } from 'next-auth/react';

import ChatNavbar from '@/components/chat/navbar';
import ChatSidebar from '@/components/chat/sidebar';
import Dashboard from '@/components/chat/dashboard';

export default function Home() {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <ChatNavbar/>

        <div className="flex max-w-7xl mx-auto">
            {/* Sidebar */}
            <ChatSidebar/>

            {/* Main Content */}
            <Dashboard/>
        </div>
      </div>
    </SessionProvider>
  )
}
