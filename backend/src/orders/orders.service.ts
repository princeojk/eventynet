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

    const balance = await this.balance.getUserBalanceAmount(user.id);

    if (!balance) {
      console.error('user balance not found');
      return;
    }

    const canPlaceOrder = this.balance.isEnoughBalance(
      body.amount,
      balance.toNumber(),
    );

    if (!canPlaceOrder) {
      return {
        success: false,
        message: 'Unable to place oder',
        userId: user.id,
      };
    }

    const userId = await this.orders.setOrder(user.id, body);
    return { success: true, message: 'Order placed', userId: userId };
  }
}
