import { getUserByEmail, insertUser } from "@models/user.model";

import type { Request, Response } from "express-serve-static-core";
import type { User } from "@bot/types";
import type {
    ApiResponse,
    SignupRequestBody,
    LoginRequestBody,
} from "@bot/types";

async function login(req: Request<{}, {}, LoginRequestBody>, res: Response<ApiResponse<any>>) {
    try {
        const { email } = req.body;
        const user = await getUserByEmail(email);

        if (!user) throw new Error("User not found");

        const response: ApiResponse<User> = {
            code: 200,
            status: "success",
            message: "Login successfully",
            data: user,
        };

        return res.status(200).json(response);
    } catch (e) {
        const response: ApiResponse<null> = {
            code: 401,
            status: "error",
            message: "Invalid credentials",
            data: null,
        };
        
        return res.status(401).json(response);
    }
}

async function signup(req: Request<{}, {}, SignupRequestBody>, res: Response<ApiResponse<any>>) {
    try {
        const user = req.body;
        const newUser = await insertUser(user);

        const response: ApiResponse<User> = {
            code: 201,
            status: "success",
            message: "User registered successfully",
            data: newUser,
        };

        return res.status(200).json(response);
    } catch (e) {
        const response: ApiResponse<null> = {
            code: 500,
            status: "error",
            message: "Signup failed. Please try again",
            data: null,
        };
        
        return res.status(500).json(response);
    }
}

export default {
    login,
    signup,
}
