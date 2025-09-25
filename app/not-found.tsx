"use client";

import Link from 'next/link'
import { Zap, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-purple-900/20 to-gray-900/50"></div>        
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-600/5 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-indigo-600/5 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
            <Zap className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
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
          <p className="mb-4">Quick links to get you started:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/login" className="hover:text-blue-400 transition-colors">
              Login
            </Link>
            <span className="text-gray-600">•</span>
            <Link href="#" className="hover:text-blue-400 transition-colors">
              Pricing
            </Link>
            <span className="text-gray-600">•</span>
            <Link href="#" className="hover:text-blue-400 transition-colors">
              Support
            </Link>
            <span className="text-gray-600">•</span>
            <Link href="#" className="hover:text-blue-400 transition-colors">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
