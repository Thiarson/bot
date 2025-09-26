import { getUserByEmail } from "../../../../models/user.model";
import { Request, Response } from "express-serve-static-core";

interface LoginRequestBody {
    email: string;
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

export default {
    login,
};
