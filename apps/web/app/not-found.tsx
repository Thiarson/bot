"use client";

import Link from "next/link";
import { ArrowLeft, Home, HelpCircle } from 'lucide-react';

type QuickLinkProps = {
  children: React.ReactNode;
  link: string;
  icon?: React.ReactNode;
}

function QuickLinkItem({ children, link, icon }: QuickLinkProps) {
  return (
    <Link 
      href={link} 
      className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
    >
      {icon}
      {children}
    </Link>
  );
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4 animate-in slide-in-from-bottom duration-700">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Sorry, we couldn't find the page you're looking for.<br/> Let's get you back on track with Boost.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-in slide-in-from-bottom duration-700 delay-300">
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-500 hover:scale-105 active:scale-95 transition-all duration-200 shadow hover:shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>

          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5" />
            Go to Home
          </Link>
        </div>

        {/* Quick Links */}
        <div className="animate-in fade-in duration-700 delay-500">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">
            Quick Links
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <QuickLinkItem link="/login" icon={<Home className="w-4 h-4" />}>
              Login
            </QuickLinkItem>
            <QuickLinkItem link="#">
              Pricing
            </QuickLinkItem>
            <QuickLinkItem link="#" icon={<HelpCircle className="w-4 h-4" />}>
              Support
            </QuickLinkItem>
            <QuickLinkItem link="#">
              About Us
            </QuickLinkItem>
          </div>
        </div>
      </div>
    </div>
  );
}
