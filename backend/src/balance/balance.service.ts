import { Injectable } from '@nestjs/common';
import { BalanceRepository } from './balance.repository';
import { PrismaClient } from 'src/generated/client';

@Injectable({})
export class BalanceService {
  constructor(private balance: BalanceRepository) {}

  async createBalance(tx: PrismaClient, userId: number) {
    const startBalance = 0.0;
    await this.balance.updateBalance(tx, userId, startBalance);
  }

  isEnoughBalance(amount: number, balance: number) {
    return amount < balance;
  }

  async getUserBalanceAmount(userId: number) {
    const accountBalance = await this.balance.findById(userId);
    if (!accountBalance) {
      console.error('balance not found');
      return;
    }
    return accountBalance.balance;
  }
}
