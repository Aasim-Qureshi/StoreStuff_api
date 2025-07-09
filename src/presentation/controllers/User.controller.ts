import { Request, Response } from "express";
import { BanUserUseCase } from "../../application/use-cases/user/ban.uc";
import { SuspendUserUseCase } from "../../application/use-cases/user/suspend.uc";
import { ActivateUserUseCase } from "../../application/use-cases/user/activate.uc";

import { AuthRepository } from "../../domain/repositories/Auth.repo";
import { UserRepository } from "../../domain/repositories/User.repo";

import { catchAsync } from "../../shared/utils/CatchAsync";
import { ResponseHandler } from "../../shared/utils/ResponseHandler";

export class UserController {
  private banUserUseCase: BanUserUseCase;
  private suspendUserUseCase: SuspendUserUseCase;
  private activateUserUseCase: ActivateUserUseCase;

  constructor(userRepo: UserRepository, authRepo: AuthRepository) {
    this.banUserUseCase = new BanUserUseCase(userRepo, authRepo);
    this.suspendUserUseCase = new SuspendUserUseCase(userRepo, authRepo);
    this.activateUserUseCase = new ActivateUserUseCase(userRepo, authRepo);
  }

  ban = catchAsync(async (req: Request, res: Response) => {
    const { uid } = req.params;
    await this.banUserUseCase.execute(uid);
    ResponseHandler.success(res, "User banned successfully", 200, null);
  });

  suspend = catchAsync(async (req: Request, res: Response) => {
    const { uid } = req.params;
    const { suspensionTime } = req.body;

    await this.suspendUserUseCase.execute(uid, new Date(suspensionTime));
    ResponseHandler.success(res, "User suspended successfully", 200, null);
  });

  activate = catchAsync(async (req: Request, res: Response) => {
    const { uid } = req.params;
    await this.activateUserUseCase.execute(uid);
    ResponseHandler.success(res, "User activated successfully", 200, null);
  });
}
