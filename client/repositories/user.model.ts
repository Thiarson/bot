import axios from "axios";
import { apiUrl } from "@/config/api.config";

import type { User } from "@/types/definitions";

export interface ApiResponse<T> {
    code: number;
    status: "success" | "error";
    message: string;
    data: T;
}

type UserForm = {
    name: string,
    email: string,
    password: string,
};

export async function createUser({ name, email, password }: UserForm) {
    try {
        const { data: response } = await axios.post<ApiResponse<{ id: string; email: string; name: string }>>(
            `${apiUrl}/auth/signup`,
            { name, email, password },
        )

        if (response.status === "error") throw new Error(response.message);
        const user = response.data;

        return user;
    } catch (e: any) {
        if (e.code === 'ECONNREFUSED') throw Error("Check your internet connection and try again");
        console.error('Failed to fetch user:', e);
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
        if (e.code === 'ECONNREFUSED') throw Error("Check your internet connection and try again");
        console.error('Failed to fetch user:', e);
    }
}
