import { CreateUserDTO } from "../../dtos/auth/CreateUser.dto";

import { AuthRepository } from "../../../domain/repositories/Auth.repo";
import { SafeUser } from "../../../domain/interfaces/SafeUser.interface";

import { AppError } from "../../../shared/utils/AppError";

export class CreateUserUseCase {
    constructor (private userRepo: AuthRepository) {}

    async execute(userData: CreateUserDTO) : Promise<SafeUser> {
        const {name, email, password} = userData;

        if(!name || !email || !password){
            throw new AppError("Name, email and password are required", 406);
        }

        if(password.length < 6){
            throw new AppError("Password must be at least 6 characters long", 406)
        }

        const existingUser = await this.userRepo.findUserByEmail(email.value);

        if(existingUser) {
            throw new AppError("Email is already in use", 403);
        }

        return this.userRepo.create(userData)

    }
}