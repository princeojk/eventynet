import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { UserService } from 'src/user/user.service';
import { PrismaClient } from 'src/generated/client';

import { BalanceService } from 'src/balance/balance.service';

@Injectable({})
export class AuthService {
  constructor(
    private user: UserService,
    private prisma: PrismaService,
    private balance: BalanceService,
  ) {}
  login() {
    return { msg: ' I have signed in  ' };
  }

  async signup(dto: AuthDto, uid: string) {
    console.log('tx sign up called ');
    const user = await this.prisma.$transaction(async (tx: PrismaClient) => {
      const user = await this.user.createUser(tx, dto, uid);
      return await this.balance.createBalance(tx, user.id);
    });
    console.log('tx user transaction', user);
    return user;
  }
}
