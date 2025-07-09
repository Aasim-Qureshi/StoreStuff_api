import { SafeUser } from "../../domain/interfaces/SafeUser.interface";

export interface ILoginUseCase {
    user: SafeUser | null;
    accessToken: string | null;
    refreshToken: string | null;
}