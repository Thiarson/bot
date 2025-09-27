
export interface LoginRequestBody {
    email: string;
}

export interface SignupRequestBody {
    name: string;
    email: string;
    password: string;
}

export interface ApiResponse<T> {
    code: number;
    status: "success" | "error";
    message: string;
    data: T;
}
