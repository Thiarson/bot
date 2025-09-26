"use server";

import axios from "axios";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { apiUrl } from "@/config/api.config";

import type { User } from "@/types/definitions";

export interface ApiResponse<T> {
    code: number;
    status: "success" | "error";
    message: string;
    data: T;
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (e) {
        console.log("autherr", e)
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
        const { data: response } = await axios.post<ApiResponse<User>>(
            `${apiUrl}/auth/login`,
            { email },
        )

        if (response.status === "error") throw new Error(response.message);
        const user = response.data;

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
        };
    } catch (e: any) {
        if (e.code === 'ECONNREFUSED') throw Error(e);
        
        console.error('Failed to fetch user:', e);
    }
}
