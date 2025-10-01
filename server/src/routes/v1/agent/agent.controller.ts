import axios from "axios";
import FormData from "form-data";

import type { Request, Response } from "express-serve-static-core";
import type { ApiResponse } from "@bot/types";

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

        // const data = await axios.post(
        //     `http://localhost:8000/agent/v1/cv/parse`,
        //     formData,
        //     {
        //         headers: {
        //             ...formData.getHeaders(),
        //         }
        //     }
        // );
        
        // console.log(data)

        const response: ApiResponse<null> = {
            code: 200,
            status: "success",
            message: "CV parsed successfully",
            data: null,
        };

        return res.status(200).json(response);
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
