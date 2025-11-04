import Link from "next/link";
import Logo from "@/components/logo";

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
                <Logo/>
                
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    <span>{message} </span>
                    <Link href={path} className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                        {action}
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default AuthNavbar;
