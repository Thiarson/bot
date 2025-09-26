import Link from "next/link";
import { Zap } from "lucide-react";

function Logo() {
    return (
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Boost</span>
        </Link>
    );
}

export default Logo;
