import { Injectable } from '@nestjs/common';
import { BalanceRepository } from './balance.repository';

@Injectable({})
export class BalanceService {
  constructor(private balance: BalanceRepository) {}

  isEnoughBalance(amount: number, balance: number) {
    return amount < balance;
  }

  async getUserBalanceAmount(userId) {
    const accountBalance = await this.balance.findByUid(userId);
    if (!accountBalance) {
      console.error('balance not found');
      return;
    }
    return accountBalance.balance;
  }
}
