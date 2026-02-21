import { Injectable } from '@nestjs/common';
import { BalanceRepository } from './balance.repository';
import { Balance, PrismaClient } from 'src/generated/client';

@Injectable({})
export class BalanceService {
  constructor(private balance: BalanceRepository) {}

  async createBalance(tx: PrismaClient, userId: number): Promise<Balance> {
    const startBalance = 0.0;
    return await this.balance.createBalance(tx, userId, startBalance);
  }

  isEnoughBalance(amount: number, balance: number) {
    return amount < balance;
  }

  async getUserBalanceAmount(userId: number) {
    console.log('tk user id', userId);
    const accountBalance = await this.balance.findById(userId);
    if (!accountBalance) {
      console.error('balance not found');
      return;
    }
    return accountBalance.balance;
  }
}
