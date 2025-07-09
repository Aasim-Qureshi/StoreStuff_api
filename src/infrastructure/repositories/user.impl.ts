import { PrismaClient } from "@prisma/client";
import { prisma } from "../prisma/client";

export class UserRepoImpl {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async ban(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { userId },
      data: {
        status: "banned",
        suspensionExpiry: null, // clear any previous suspension
      },
    });
  }

  async suspend(userId: string, suspensionExpiry: Date): Promise<void> {
    await this.prisma.user.update({
      where: { userId },
      data: {
        status: "suspended",
        suspensionExpiry,
      },
    });
  }

  async activate(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { userId },
      data: {
        status: "active",
        suspensionExpiry: null,
      },
    });
  }
}
