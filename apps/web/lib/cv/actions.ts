"use server";

import createHttpRequest from "@/utils/http-request";
import type {
    ApiResponse,
    CVWithMetadata,
    CVWithTitle,
    PresignedUrl,
} from "@bot/types";

interface FileMetadata {
    fileKey: string;
    fileType: string;
    filename: string;
}

export async function requestPresignedUrl(file: File) {
    try {
        const http = await createHttpRequest();
        const {  data: response } = await http.post<ApiResponse<PresignedUrl>>("/cv/presigned-url", {
            filetype: file.type,
        });

        if (response.status === "error") throw new Error(response.message);

        return response.data;
    } catch (e: any) {
        if (e.code === 'ECONNREFUSED') throw Error("Check your internet connection and try again");
        throw Error("Failed to request presigned URL. Please try again");
    }
}

export async function uploadFileUsingSignedUrl(signedUrl: string, file: File) {
    try {
        const response = await fetch(signedUrl, {
            method: "PUT",
            body: file,
            headers: {
                "Content-Type": file.type,
            },
        });
        
        if (!response.ok) throw new Error(`Upload failed with status: ${response.status}`);
    } catch (e: any) {
        if (e.code === 'ECONNREFUSED') throw Error("Check your internet connection and try again");
        throw Error("Failed to upload file using signed URL");
    }
}

export async function notifyApiAfterFileUpload(metadata: FileMetadata) {
    try {
        const http = await createHttpRequest();
        const {  data: response } = await http.post<ApiResponse<null>>("/cv/file-metadata", metadata);

        if (response.status === "error") throw new Error(response.message);

        return response.data;
    } catch (e: any) {
        if (e.code === 'ECONNREFUSED') throw Error("Check your internet connection and try again");
        throw Error("Failed to send Metadata. Please try again");
    }
}

// export async function extractCV(formData: FormData) {
//     try {
//         const http = await createHttpRequest();
//         const {  data: response } = await http.post<ApiResponse<CVData>>("/cv/extract", formData);

//         if (response.status === "error") throw new Error(response.message);

//         return response.data;
//     } catch (e: any) {
//         if (e.code === 'ECONNREFUSED') throw Error("Check your internet connection and try again");
//         throw Error("Failed to import CV. Please try again");
//     }
    
// }

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
