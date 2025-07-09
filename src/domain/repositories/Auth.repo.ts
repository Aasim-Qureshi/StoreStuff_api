import { User } from "@prisma/client";
import { CreateUserDTO } from "../../application/dtos/auth/CreateUser.dto";
import { SafeUser } from "../interfaces/SafeUser.interface";

export interface AuthRepository {
    create(user: CreateUserDTO): Promise<SafeUser>;
    findUserById(uid: string): Promise<SafeUser | null>;
    findUserByEmail(email: string): Promise<User | null>;
};