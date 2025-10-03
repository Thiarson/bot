import { ChevronDown } from "lucide-react";

import AnimatedBackground from "@/components/background";
import LandingNavbar from "@/components/landing/navbar";
import LandingCard from "@/components/landing/landing-card";

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
            {/* Animated background elements */}
            <AnimatedBackground/>

            {/* Header */}
            <LandingNavbar/>

            {/* Main Content */}
            <main className="relative z-10">
                {/* Hero Section */}
                <section className="px-6 pt-20 pb-32">
                    <LandingCard/>
                </section>
            </main>

            {/* Floating scroll indicator */}
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <ChevronDown className="w-6 h-6 text-gray-400" />
            </div>
        </div>
  );
}
