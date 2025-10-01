"use server";

import { AuthError } from "next-auth";
import { signUp, signIn, signOut } from "@/auth";

export async function register(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signUp(formData);
    } catch (e) {
        if (e instanceof Error) {
            if (e.message.startsWith("NEXT_REDIRECT")) throw e;
            if (e instanceof Error) return e.message;
        }

        return "An unknown error occurred";
    }
}

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
        await signOut()
    } catch (e) {
        throw e;
    }
}
