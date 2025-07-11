import { NextFunction, Request, Response } from "express";
import { JwtService } from "../../infrastructure/services/JWT.service";
import { catchAsync } from "../utils/CatchAsync";
import { cookieConfig } from "../../infrastructure/config/cookies.confg";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
    userEmail?: string;
  }
}

export const AuthenticateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userToken =
      req.cookies["accessToken"] || req.headers.authorization?.split(" ")[1];

    let decoded = userToken ? JwtService.verifyAccessToken(userToken) : null;

    if (!decoded) {
      const refreshToken = req.cookies["refreshToken"];
      if (!refreshToken) {
        res.status(401).json({ message: "Unauthorized: No refresh token provided" });
        return;
      }

      decoded = JwtService.verifyRefreshToken(refreshToken);

      if (!decoded || !decoded.userId || !decoded.email) {
        res.status(401).json({ message: "Unauthorized: Invalid refresh token" });
        return;
      }

      const newAccessToken = JwtService.generateAccessToken(decoded.userId, decoded.email);
      const newRefreshToken = JwtService.generateRefreshToken(decoded.userId, decoded.email);

      res.cookie("accessToken", newAccessToken, cookieConfig);
      res.cookie("refreshToken", newRefreshToken, cookieConfig);
    }

    if (decoded.userId && decoded.email) {
      req.userId = decoded.userId;
      req.userEmail = decoded.email;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized: Invalid token payload" });
    }
  }
);
