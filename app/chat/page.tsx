import { logout } from "@/lib/auth/actions";

export default function Home() {
    return (
        <div>
            <p>Chat</p>
            <form action={logout}>
                <button >Sign out</button>
            </form>
        </div>
    );
}
