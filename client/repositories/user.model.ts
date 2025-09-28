import axios from "axios";
import { apiUrl } from "@/config/api.config";

import type { User, UserCredentials } from "@bot/types";
import type {
    ApiResponse,
    SignupRequestBody,
    LoginRequestBody,
} from "@bot/types";

export async function createUser({ name, email, password }: SignupRequestBody) {
    try {
        const { data: response } = await axios.post<ApiResponse<User>>(
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

export async function getUser({ email }: LoginRequestBody): Promise<UserCredentials | undefined> {
    try {
        const { data: response } = await axios.post<ApiResponse<UserCredentials>>(
            `${apiUrl}/auth/login`,
            { email },
        )

        if (response.status === "error") throw new Error(response.message);
        const credentials = response.data;

        return credentials;
    } catch (e: any) {
        if (e.code === 'ECONNREFUSED') throw Error("Check your internet connection and try again");
        console.error('Failed to fetch user:', e);
    }
}
