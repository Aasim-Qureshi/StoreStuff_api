import { UserRepository } from "../../../domain/repositories/User.repo";
import { AuthRepository } from "../../../domain/repositories/Auth.repo";
import { AppError } from "../../../shared/utils/AppError";

export class SuspendUserUseCase {
  constructor(
    private userRepo: UserRepository,
    private authRepo: AuthRepository
  ) {}

  async execute(userId: string, suspensionTime: Date): Promise<void> {

    const user = await this.authRepo.findUserById(userId);

    if (!user) throw new AppError("User not found", 404);

    if (user.status === "suspended") {
      throw new AppError("User is already suspended", 400);
    }

    if(!suspensionTime){
        throw new AppError("Suspension time not provided", 401)
    }

    await this.userRepo.suspend(userId, suspensionTime);
  }
}
