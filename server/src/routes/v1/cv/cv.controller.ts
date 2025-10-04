import axios from "axios";
import FormData from "form-data";
import { pipeline } from "node:stream/promises";
import { CvModel } from "model/cv.model";
import { agentUrl, internalApiKey, requestTimeout } from "@config/api.config";

import type { Request, Response } from "express-serve-static-core";
import type {
    ApiResponse,
    CVData,
    CVWithMetadata,
    CVWithTitle,
} from "@bot/types";
import { getSavedCv, upsertCV } from "@models/cv.repo";

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

        const { status: code, data } = await axios.post(
            `${agentUrl}/agent/v1/cv/extract`,
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    "X-API-KEY": internalApiKey,
                },
                timeout: requestTimeout,
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

async function saved(req: Request, res: Response) {
    try {
        const userId = parseInt(req.user?.id);
        let response: ApiResponse<CVWithMetadata| null>;

        const [pgResult, mongoResult] = await Promise.all([
            getSavedCv(userId),
            CvModel.findOne({ userId: userId }),
        ]);

        if (!pgResult || !mongoResult) {
            response = {
                code: 404,
                status: "error",
                message: "Saved CV not found",
                data: null,
            };

            return res.status(404).json(response);
        }

        response = {
            code: 200,
            status: "success",
            message: "Success getting saved CV",
            data: {
                personalInfo: mongoResult.personalInfo,
                experiences: mongoResult.experiences,
                education: mongoResult.education,
                skills: mongoResult.skills,
                projects: mongoResult.projects,
                title: pgResult.title,
                lastSaved: pgResult.updated_at,
            },
        };

        return res.status(response.code).json(response);
    } catch (e) {
        console.error(e)
        const response: ApiResponse<null> = {
            code: 500,
            status: "error",
            message: "Failed getting saved CV. Please try again",
            data: null,
        };
        
        return res.status(500).json(response);
    }
}

async function saveCV(req: Request, res: Response) {
    try {
        const userId = parseInt(req.user?.id);
        const cv = req.body as CVWithTitle;
        let response: ApiResponse<Date | null>;

        if (!cv) {
            response = {
                code: 400,
                status: "error",
                message: "No CV data",
                data: null,
            };

            return res.status(400).json(response);
        }
        
        const [result, saved] = await Promise.all([
            upsertCV(userId, cv.title),
            CvModel.findOneAndUpdate(
                { userId },
                cv,
                { upsert: true, new: true }
            )
        ]);

        response = {
            code: 200,
            status: "success",
            message: "CV saved successfully",
            data: result.updated_at,
        };

        return res.status(response.code).json(response);
    } catch (e) {
        console.error(e)
        const response: ApiResponse<null> = {
            code: 500,
            status: "error",
            message: "Failed saving CV. Please try again",
            data: null,
        };
        
        return res.status(500).json(response);
    }
}

async function exportCV(req: Request, res: Response) {
    try {
        const userId = parseInt(req.user?.id);
        const { template, format } = req.body;
        let response: ApiResponse<null>;

        if (!template || !format) {
            response = {
                code: 400,
                status: "error",
                message: "No Template or Format data",
                data: null,
            };

            return res.status(400).json(response);
        }
        
        const [pgResult, mongoResult] = await Promise.all([
            getSavedCv(userId),
            CvModel.findOne({ userId: userId }),
        ]);

        if (!pgResult || !mongoResult) {
            response = {
                code: 404,
                status: "error",
                message: "Saved CV not found",
                data: null,
            };

            return res.status(404).json(response);
        }

        const cvData: CVData = {
            personalInfo: mongoResult.personalInfo,
            experiences: mongoResult.experiences,
            education: mongoResult.education,
            skills: mongoResult.skills,
            projects: mongoResult.projects,
        }

        const { status: code, data } = await axios.post(
            `${agentUrl}/agent/v1/cv/export`,
            {
                cv_data: cvData,
                template,
                filename: pgResult.title,
                format,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "X-API-KEY": internalApiKey,
                },
                responseType: "stream",
                timeout: requestTimeout,
            },
        );

        res.setHeader("Content-Type", "application/pdf");
        
        return await pipeline(data, res);
    } catch (e: any) {
        console.error(e)
        const response: ApiResponse<null> = {
            code: 500,
            status: "error",
            message: "Failed exporting CV. Please try again",
            data: null,
        };
        
        return res.status(500).json(response);
    }
}

export default {
    parseCV,
    saved,
    saveCV,
    exportCV,
}
