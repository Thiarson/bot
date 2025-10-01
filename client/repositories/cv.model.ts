import { logout } from "@/lib/auth/actions";
import createHttpRequest from "@/utils/http-request";

export async function extractCV(formData: FormData) {
    try {
        const http = await createHttpRequest();

        const { data: response } = await http.post(
            '/agent/parse-cv',
            formData,
        )

        if (response.status === "error") throw new Error(response.message);
        const cv = response.data;

        return cv;
    } catch (e: any) {
        if (e.code === 'ECONNREFUSED') throw Error("Check your internet connection and try again");
        if (e.response.status === 401) {
            await logout();
        }
    }
}
