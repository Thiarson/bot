import { getUserByEmail, insertUser } from "../../../../models/user.model";
import { Request, Response } from "express-serve-static-core";

interface LoginRequestBody {
    email: string;
}

interface SignupRequestBody {
    name: string;
    email: string;
    password: string;
}

interface ApiResponse<T> {
    code: number;
    status: "success" | "error";
    message: string;
    data: T;
}

async function login(req: Request<{}, {}, LoginRequestBody>, res: Response<ApiResponse<any>>) {
    try {
        const { email } = req.body;
        const user = await getUserByEmail(email);

        if (!user) throw new Error("User not found");

        const response: ApiResponse<typeof user> = {
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

        const response: ApiResponse<{ id: string; email: string; name: string }> = {
            code: 201,
            status: "success",
            message: "User registered successfully",
            data: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
            },
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
