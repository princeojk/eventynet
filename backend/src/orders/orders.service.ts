import { Injectable } from '@nestjs/common';
import { OrdersDto } from './dto';
import { OrdersRepository } from './orders.repository';
import { BalanceService } from 'src/balance/balance.service';
import { UserRepository } from 'src/user/user.repository';
@Injectable({})
export class OrdersService {
  constructor(
    private orders: OrdersRepository,
    private balance: BalanceService,
    private user: UserRepository,
  ) {}

  async placeOrder(userUid: string, body: OrdersDto) {
    const user = await this.user.findByUid(userUid);

    if (!user) {
      console.error('user not found');
      return;
    }

    const canOrder = await this.canPlaceOrder(user.id, body.amount);

    if (!canOrder) {
      return {
        success: false,
        message: 'Insufficient balance',
      };
    }

    await this.orders.setOrder(user.id, body);
    return { success: true, message: 'Order placed' };
  }

  private async canPlaceOrder(userId: number, amount: number) {
    const balance = await this.balance.getUserBalanceAmount(userId);

    if (!balance) {
      console.error('user balance not found');
      return;
    }

    const canPlaceOrder = this.balance.isEnoughBalance(
      amount,
      balance.toNumber(),
    );

    if (!canPlaceOrder) {
      return false;
    }

    return true;
  }
}
