import { Response } from "express";
import { cookieConfig } from "../../../infrastructure/config/cookies.confg";

export class LogoutUseCase {
    async execute(res: Response): Promise<void> {
        
        res.clearCookie("accessToken", cookieConfig);
        res.clearCookie("refreshToken", cookieConfig);
    }
}
