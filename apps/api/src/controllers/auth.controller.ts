import jwt from "jsonwebtoken";
import { jwtSecret } from "@config/api.config";
import { getUserByEmail, insertUser } from "@models/user.repo";

import type { RequestHandler } from "express";
import type { User, UserCredentials } from "@bot/types";
import type {
    ApiResponse,
    SignupRequestBody,
    LoginRequestBody,
} from "@bot/types";

const login: RequestHandler<{}, ApiResponse<UserCredentials | null>, LoginRequestBody> = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await getUserByEmail(email);

        if (!user) throw new Error("User not found");
        if (!jwtSecret) throw Error('JWT secret is not configured');

        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            jwtSecret,
            { expiresIn: '30d' },
        );

        const response: ApiResponse<UserCredentials> = {
            code: 200,
            status: "success",
            message: "Login successfully",
            data: {
                user,
                token,
            },
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

const signup: RequestHandler<{}, ApiResponse<User | null>, SignupRequestBody> = async (req, res) => {
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
