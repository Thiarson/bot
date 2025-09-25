"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";

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
