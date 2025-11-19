import Link from "next/link";
import { Zap } from "lucide-react";

function Logo() {
  return (
    <Link 
      href="/" 
      className="group flex items-center gap-2 hover:opacity-90 transition-all duration-200"
      aria-label="Boost - Go to homepage"
    >
      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:scale-105 transition-all duration-200">
        <Zap className="w-5 h-5 text-white" aria-hidden="true" />
      </div>
      <span className="text-xl font-bold text-gray-900 dark:text-white">
        Boost
      </span>
    </Link>
  );
}

export default Logo;
