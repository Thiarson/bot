import axios from "axios";
import FormData from "form-data";

import type { Request, Response } from "express-serve-static-core";
import type { ApiResponse, CVData } from "@bot/types";

async function parseCV(req: Request, res: Response) {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: 'error',
                message: 'No file uploaded'
            });
        }

        const formData = new FormData();
        formData.append(
            "file",
            req.file.buffer,
            {
                filename: req.file.originalname,
                contentType: req.file.mimetype,
            }
        )

        const timeout = 5 * 1000 * 60; // 1 minute

        const { status: code, data } = await axios.post(
            `http://localhost:8000/agent/v1/cv/extract`,
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                },
                timeout: timeout,
            },
        );

        const response: ApiResponse<CVData> = {
            code: code,
            status: code === 200 ? "success" : "error",
            message: code === 200 ? "CV parsed successfully" : "CV parsing failed. Please try again",
            data: data,
        };

        return res.status(code).json(response);
    } catch (e) {
        console.error(e)
        const response: ApiResponse<null> = {
            code: 500,
            status: "error",
            message: "CV parsing failed. Please try again",
            data: null,
        };
        
        return res.status(500).json(response);
    }
}

export default {
    parseCV,
}
