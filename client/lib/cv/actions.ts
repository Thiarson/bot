"use server";

import { extractCV } from "@/repositories/cv.model";

export async function parseCV(formData: FormData) {
    try {
        const cv = await extractCV(formData);
    } catch (e) {
        if (e instanceof Error) {
            if (e.message.startsWith("NEXT_REDIRECT")) throw e;
            if (e instanceof Error) return e.message;
        }

        return "An unknown error occurred";
    }
}
