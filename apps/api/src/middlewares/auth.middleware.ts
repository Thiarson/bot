import jwt from "jsonwebtoken";
import { jwtSecret, internalApiKey } from "src/config/api.config";

import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "jsonwebtoken";
import { ApiResponse, User } from "@bot/types";
import { addSocketEmitter } from "src/helpers/web-socket";

declare global {
  namespace Express {
    interface Request {
      user?: User | JwtPayload;
    }
  }
}

function validateToken(req: Request, res: Response, next: NextFunction) {
    const bearer = req.headers.authorization;
    
    if (!bearer) {
        return res.status(401).json({
            message: 'Access denied. No token provided.',
            code: 401,
            status: 'error'
        });
    }

    const token = bearer.split(' ')[1];

    // Check if jwtSecret is defined
    if (!jwtSecret) {
        console.error('JWT secret is not configured');
        return res.status(500).json({
            message: 'Server configuration error',
            code: 500,
            status: 'error'
        });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);

        // Handle the case where decoded is a string
        if (typeof decoded === 'string') {
            console.error('Invalid token format: expected object, got string');
            
            res.clearCookie('authcookie');
            return res.status(401).json({
                message: 'Invalid token format',
                code: 401,
                status: 'error'
            });
        }
        
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        
        // Clear the invalid token cookie
        res.clearCookie('authcookie');
        
        return res.status(401).json({
            message: 'Invalid or expired token',
            code: 401,
            status: 'error'
        });
    }
}

function validateServiceKey(req: Request, res: Response, next: NextFunction) {
    const serviceKey = req.headers['x-service-key'];

    if (!internalApiKey) {
        console.error('INTERNAL_API_KEY is not configured');

        addSocketEmitter("cv:extracted", { status: "error", error: "Failed to save extracted CV", data: null });

        const response: ApiResponse<null> = {
            code: 500,
            status: 'error',
            message: 'Service authentication not configured',
            data: null,
        };
        return res.status(500).json(response);
    }

    if (!serviceKey) {
        addSocketEmitter("cv:extracted", { status: "error", error: "Failed to save extracted CV", data: null });
        
        const response: ApiResponse<null> = {
            code: 401,
            status: 'error',
            message: 'Service key is required',
            data: null,
        };
        return res.status(401).json(response);
    }

    if (serviceKey !== internalApiKey) {
        addSocketEmitter("cv:extracted", { status: "error", error: "Failed to save extracted CV", data: null });
        
        const response: ApiResponse<null> = {
            code: 403,
            status: 'error',
            message: 'Invalid service key',
            data: null,
        };
        return res.status(403).json(response);
    }

    next();
}

export {
    validateToken,
    validateServiceKey,
}
