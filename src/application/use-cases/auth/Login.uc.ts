import { AuthRepository } from "../../../domain/repositories/Auth.repo";
import { JwtService } from "../../../infrastructure/services/JWT.service";
import { AppError } from "../../../shared/utils/AppError";
import { LoginDTO } from "../../dtos/auth/Login.dto";
import { ILoginUseCase } from "../../types/ILoginUseCase";
import { PasswordService } from "../../../infrastructure/services/Password.service";

export class LoginUseCase {
  constructor(private authRepo: AuthRepository) {}

  async execute(loginData: LoginDTO): Promise<ILoginUseCase> {
    const { email, password } = loginData;

    if (!email || !password) {
      throw new AppError("Enter all fields", 400);
    }

    const user = await this.authRepo.findUserByEmail(email.value);

    if (!user) {
      throw new AppError("This user does not exist", 404);
    }

    const isPasswordValid = await PasswordService.comparePassword(
      password,
      user.hashedPassword
    );

    if (!isPasswordValid) {
      throw new AppError("Invalid password", 401);
    }

    console.log("User found:", user);
    const accessToken = JwtService.generateAccessToken(user.userId, user.email);
    const refreshToken = JwtService.generateRefreshToken(user.userId, user.email);

    return { user, accessToken, refreshToken };
  }
}
