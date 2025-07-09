import { UserRepository } from "../../../domain/repositories/User.repo";
import { AuthRepository } from "../../../domain/repositories/Auth.repo";
import { AppError } from "../../../shared/utils/AppError";

export class ActivateUserUseCase {
  constructor(
    private userRepo: UserRepository,
    private authRepo: AuthRepository
  ) {}

  async execute(userId: string): Promise<void> {
    const user = await this.authRepo.findUserById(userId);

    if (!user) throw new AppError("User not found", 404);

    if (user.status === "active") {
      throw new AppError("User is already active", 400);
    }

    await this.userRepo.activate(userId);
  }
}
