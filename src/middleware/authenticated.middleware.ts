import jwt from 'jsonwebtoken';
import HttpException from "@/utils/exceptions/http.exception";
import Token from "@/utils/interfaces/token.interface";
import { Request, Response, NextFunction } from "express";
import TokenService from "@/utils/token.service";
import UserModel from '@/resources/user/user.model';

async function authenticated(
    req: Request,
    res: Response,
    next: NextFunction 
): Promise<Response | void> {
    const bearer = req.headers.authorization;
    // First Validation
    if (!bearer || !bearer.startsWith("Bearer ")) {
        return next(new HttpException(401, "Unauthorized!"));
    }
    const accessToken: string = bearer.split("Bearer ")[1].trim();
    try {
        const payload: Token | jwt.JsonWebTokenError = await (new TokenService()).verifyToken(accessToken);
        // Second Validation
        if (payload instanceof jwt.JsonWebTokenError) {
            return next(new HttpException(401, "Unauthorized!"));
        }
        const user = await UserModel.findById(payload.id).select(["-password"]);
        if (!user) {
            return next(new HttpException(401, "Unauthorized!"));
        }
        req.user = user;
        return next();
    } catch (e: any) {
        return next(new HttpException(401, "Unauthorized!"));
    }
}

export default authenticated;