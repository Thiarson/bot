"use client";

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

type PropsType = {
  children: React.ReactNode
  link: string
}

function QuickLinkItem({ children, link }: PropsType) {
  return (
    <Link href={link} className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
      {children}
    </Link>
  );
}

export default function NotFound() {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Sorry, we can't find that page. Let's get you back to building your career with Boost.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Link>
        </div>

        {/* Quick Links */}
        <div className="text-sm text-gray-400">
          <div className="flex flex-wrap justify-center gap-4">
            <QuickLinkItem link="/login">Login</QuickLinkItem>
            <span className="text-gray-600">•</span>
            <QuickLinkItem link="#">Pricing</QuickLinkItem>
            <span className="text-gray-600">•</span>
            <QuickLinkItem link="#">Support</QuickLinkItem>
            <span className="text-gray-600">•</span>
            <QuickLinkItem link="#">About Us</QuickLinkItem>
          </div>
        </div>
      </div>
    </div>
  )
}
