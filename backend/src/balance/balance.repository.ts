import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'src/generated/client';
import { Balance } from 'src/generated/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from 'src/user/user.repository';

@Injectable({})
export class BalanceRepository {
  constructor(
    private user: UserRepository,
    private prisma: PrismaService,
  ) {}

  async findByUid(userUid: string) {
    const user = await this.user.findByUid(userUid);

    if (!user) {
      return;
    }

    const balance = await this.prisma.balance.findUnique({
      where: {
        userId: user.id,
      },
    });

    return balance;
  }

  async findById(userId: number) {
    const balance = await this.prisma.balance.findUnique({
      where: {
        userId: userId,
      },
    });

    return balance;
  }

  async updateBalance(
    tx: PrismaClient,
    userId: number,
    amount: number,
    lockedBalance: number = 0,
  ): Promise<Balance> {
    const res = await tx.balance.upsert({
      where: {
        userId: userId,
      },
      update: {
        balance: amount,
        lockedBalance: lockedBalance,
        updatedAt: new Date(),
      },
      create: {
        userId: userId,
        balance: amount,
        lockedBalance: lockedBalance,
        updatedAt: new Date(),
      },
    });

    return res;
  }
}
