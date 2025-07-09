import { UserRepository } from "../../../domain/repositories/User.repo";
import { AuthRepository } from "../../../domain/repositories/Auth.repo";
import { AppError } from "../../../shared/utils/AppError";

export class BanUserUseCase {
  constructor(
    private userRepo: UserRepository,
    private authRepo: AuthRepository
  ) {}

  async execute(userId: string): Promise<void> {

    const user = await this.authRepo.findUserById(userId);
    
    if (!user) throw new AppError("User not found", 404);

    if (user.status === "banned") {
      throw new AppError("User is already banned", 400);
    }

    await this.userRepo.ban(userId);
  }
}
