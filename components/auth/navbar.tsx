import Link from "next/link";
import { Zap } from "lucide-react";

type PropsType = {
    type: "login" | "signup",
}

function AuthNavbar({ type }: PropsType) {
    let message = null;
    let action = null;
    let path = null;

    if  (type === "login") {
        message = "Don't have an account?";
        action = "Sign up";
        path = "/signup";
    } else {
        message = "Already have an account?";
        action = "Sign in";
        path = "/login";
    }
    
    return (
        <header className="relative z-50 px-6 py-4">
            <nav className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold">Catalyst</span>
                </Link>
                
                <div className="text-sm text-gray-400">
                    <span>{message} </span>
                    <Link href={path} className="text-blue-400 hover:text-blue-300 transition-colors">
                        {action}
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default AuthNavbar;
