"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";

import type { User } from "@/types/definitions";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (e) {
        if (e instanceof AuthError) {
            switch (e.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials';
                default:
                    return 'Something went wrong';
            }
        }
        
        throw e;
    }
}

export async function logout() {
    try {
        await signOut({ redirectTo: '/' })
    } catch (e) {
        throw e;
    }
}

export async function getUser(email: string): Promise<User | undefined> {
    try {
        // const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
        // return user[0];

        return {
            id: String(1),
            name: "Admin",
            email: "admin@boost.ai",
            password: "$2a$12$QU3ssn0pjLG/PcL7cj57z.zsl3nIHd.BMErrziGPz0cx7cSWpdRvK", // Admin123
        };
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}
