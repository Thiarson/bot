import axios from "axios";
import { auth } from "@/auth";
import { apiUrl } from "@/config/api.config";

async function createHttpRequest() {
    const session = await auth();

    const http = axios.create({
        withCredentials: true,
        baseURL: apiUrl,
        headers: {
            "Authorization": `Bearer ${session?.user.token}`,
        },
    });

    return http;
}

export default createHttpRequest;
