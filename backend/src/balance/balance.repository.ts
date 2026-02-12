import { Injectable } from '@nestjs/common';
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
}
