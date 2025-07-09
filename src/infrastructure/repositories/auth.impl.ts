import { PrismaClient, User } from "@prisma/client";
import { prisma } from "../prisma/client";

import { CreateUserDTO } from "../../application/dtos/auth/CreateUser.dto";

import { SafeUser } from "../../domain/interfaces/SafeUser.interface";
import { AuthRepository } from "../../domain/repositories/Auth.repo";


export class AuthRepoImpl implements AuthRepository {
    private prisma: PrismaClient;
    
    constructor(){
        this.prisma = prisma;
    }

    async findUserById(uid: string): Promise<SafeUser | null> {
        const user = await this.prisma.user.findUnique({
            where: {userId: uid},
        });

        return user as SafeUser;
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {email: email}
        });

        return user;
    }

    async create(user: CreateUserDTO): Promise<SafeUser> {
        const newUser = await this.prisma.user.create({
            data: {
                username: user.name,
                email: user.email.value,
                hashedPassword: user.password
            },
            select: {
                userId: true,
                username: true,
                email: true,
            }
        })

        return newUser as SafeUser
        }
}