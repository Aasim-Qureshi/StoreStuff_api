import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET as string;
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET as string;

type JwtPayload = {
  userId: string;
  email: string;
};

export class JwtService {

  static generateAccessToken(userId: string, email: string): string {
    return jwt.sign({ userId, email }, JWT_ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
  }

  static generateRefreshToken(userId: string, email: string): string {
    return jwt.sign({ userId, email }, JWT_REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
  }

  static verifyAccessToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, JWT_ACCESS_TOKEN_SECRET) as JwtPayload;
    } catch (error) {
      return null;
    }
  }

  static verifyRefreshToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, JWT_REFRESH_TOKEN_SECRET) as JwtPayload;
    } catch (error) {
      return null;
    }
  }
}
