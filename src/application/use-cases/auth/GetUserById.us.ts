import { SafeUser } from "../../../domain/interfaces/SafeUser.interface";
import { AuthRepository } from "../../../domain/repositories/Auth.repo";
import { AppError } from "../../../shared/utils/AppError";

export class GetUserByIdUseCase {
    constructor(private authRepo: AuthRepository){

    }

    async execute(uuid: string): Promise<SafeUser | null> {

        const user = this.authRepo.findUserById(uuid)

        if(!user){
            throw new AppError("User not found", 404)
        }

        return user
    }
} 

