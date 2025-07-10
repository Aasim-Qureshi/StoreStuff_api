import { Request, Response } from "express";

import { CreateUserDTO } from "../../application/dtos/auth/CreateUser.dto";
import { LoginDTO } from "../../application/dtos/auth/Login.dto";

import { CreateUserUseCase } from "../../application/use-cases/auth/CreateUser.uc";
import { GetUserByIdUseCase } from "../../application/use-cases/auth/GetUserById.us";
import { LoginUseCase } from "../../application/use-cases/auth/Login.uc";
import { LogoutUseCase } from "../../application/use-cases/auth/Logout.uc";

import { SafeUser } from "../../domain/interfaces/SafeUser.interface";
import { AuthRepository } from "../../domain/repositories/Auth.repo";
import { EmailAddress } from "../../domain/value-objects/email.vo";

import { catchAsync } from "../../shared/utils/CatchAsync";
import { ResponseHandler } from "../../shared/utils/ResponseHandler";
import { PasswordService } from "../../infrastructure/services/Password.service";


export class AuthController {
    private loginUseCase: LoginUseCase;
    private createUserUseCase: CreateUserUseCase;
    private getUserByIdUseCase: GetUserByIdUseCase;
    private logoutUseCase: LogoutUseCase;

    constructor(authRepo: AuthRepository) {
        this.loginUseCase = new LoginUseCase(authRepo);
        this.createUserUseCase = new CreateUserUseCase(authRepo);
        this.getUserByIdUseCase = new GetUserByIdUseCase(authRepo);
        this.logoutUseCase = new LogoutUseCase();
    }

    create = catchAsync(async (req: Request, res: Response) => {
        const { username, email, password } = req.body;

        const hashedPassword = await PasswordService.hashPassword(password);

        const signupDTO = new CreateUserDTO(
            username,
            new EmailAddress(email),
            hashedPassword
        );

        const user = await this.createUserUseCase.execute(signupDTO);

        ResponseHandler.success(res, "User created successfully", 201, user);
    });

    login = catchAsync(async (req: Request, res: Response) => {

        const { email, password } = req.body;

        const loginDTO = new LoginDTO(
            new EmailAddress(email),
            password
        )

        const { user, accessToken, refreshToken } = await this.loginUseCase.execute(loginDTO);

        res.cookie("accessToken", accessToken ?? '', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });

        res.cookie("refreshToken", refreshToken ?? '', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });

        ResponseHandler.success(res, "User logged in successfully", 200, user);
    });

    getUserById = catchAsync(async (req: Request, res: Response) => {
        const { uid } = req.params;
        const user: SafeUser | null = await this.getUserByIdUseCase.execute(uid)

        ResponseHandler.success(res, "User found: ", 200, user);
    })

    me = catchAsync(async (req: Request, res: Response) => {
        const userId = req.userId;

        if (!userId) {
            return ResponseHandler.error(res, "User not authenticated", 401);
        }

        const user = await this.getUserByIdUseCase.execute(userId);

        ResponseHandler.success(res, "User retrieved", 200, user);
    });


    logout = catchAsync(async (req: Request, res: Response) => {
        await this.logoutUseCase.execute(res);
        ResponseHandler.success(res, "User logged out successfully", 200, null);
    })
}