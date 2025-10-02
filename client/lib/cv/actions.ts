"use server";

import { extractCV } from "@/repositories/cv.model";

export async function parseCV(formData: FormData) {
    try {
        const cv = await extractCV(formData);
        return cv;
    } catch (e) {
        if (e instanceof Error) {
            if (e.message.startsWith("NEXT_REDIRECT")) throw e;
        }

        throw e;
    }
}
