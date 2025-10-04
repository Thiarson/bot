"use server";

import createHttpRequest from "@/utils/http-request";
import type {
    ApiResponse,
    CVData,
    CVWithMetadata,
    CVWithTitle,
} from "@bot/types";

export async function extractCV(formData: FormData) {
    try {
        const http = await createHttpRequest();
        const {  data: response } = await http.post<ApiResponse<CVData>>("/cv/extract", formData);

        if (response.status === "error") throw new Error(response.message);

        return response.data;
    } catch (e: any) {
        if (e.code === 'ECONNREFUSED') throw Error("Check your internet connection and try again");
        throw Error("Failed to import CV. Please try again");
    }
    
}

export async function getSavedCv() {
    try {
        const http = await createHttpRequest();

        const { data: response } = await http.get<ApiResponse<CVWithMetadata>>(
            '/cv/saved',
        )

        if (response.status === "error") throw new Error(response.message);

        return response.data;
    } catch (e) {
        return null
    }
}

export async function saveCV(cv: CVWithTitle) {
    try {
        const http = await createHttpRequest();
        const {  data: response } = await http.post<ApiResponse<Date>>("/cv/save", cv);

        if (response.status === "error") throw new Error(response.message);

        return response.data;
    } catch (e: any) {
        if (e.code === 'ECONNREFUSED') throw Error("Check your internet connection and try again");
        throw Error("Failed to save CV. Please try again");
    }
}

export async function exportCV(template: string, format: string) {
    try {
        const http = await createHttpRequest();
        const { data } = await http.post(
            "/cv/export",
            { template, format },
            { responseType: "blob" },
        );

        const base64 = Buffer.from(data).toString("base64");

        return {
            contentType: 'application/pdf',
            data: base64,
        };
    } catch (e: any) {
        if (e.code === 'ECONNREFUSED') throw Error("Check your internet connection and try again");
        throw Error("Failed to save CV. Please try again");
    }
}
