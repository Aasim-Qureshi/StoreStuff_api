import { User as IUser } from "@prisma/client";

export class UserEntity implements IUser {
    userId: string;
    username: string;
    email: string;
    hashedPassword: string;
    status: string;
    suspensionExpiry: Date | null;
    
    constructor(user: IUser){
        this.userId = user.userId;
        this.username = user.username;
        this.email = user.email;
        this.hashedPassword = user.hashedPassword;
        this.status = "active";
        this.suspensionExpiry = null;
    }
}