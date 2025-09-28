import jwt from "jsonwebtoken";
import { jwtSecret } from "@config/api.config";

import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "jsonwebtoken";
import { User } from "@bot/types";

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

export {
    validateToken,
}
