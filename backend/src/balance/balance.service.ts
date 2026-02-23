import { Injectable } from '@nestjs/common';
import { BalanceRepository } from './balance.repository';
import { Balance, PrismaClient } from 'src/generated/client';
import { NotFoundException } from '@nestjs/common';

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
    const accountBalance = await this.balance.findById(userId);
    if (!accountBalance) {
      throw new NotFoundException('balance not found');
    }
    return accountBalance.balance;
  }
}
