import { Injectable } from '@nestjs/common';
import { OrdersDto } from './dto';
import { OrdersRepository } from './orders.repository';
import { BalanceService } from 'src/balance/balance.service';
import { UserRepository } from 'src/user/user.repository';
import { BalanceRepository } from 'src/balance/balance.repository';
import { EventRepository } from 'src/event/event.repository';
import LmsrCalculator from 'src/lmsr/lmsr.model';
import { NotFoundException } from '@nestjs/common';
@Injectable({})
export class OrdersService {
  constructor(
    private orders: OrdersRepository,
    private balance: BalanceService,
    private balanceRepo: BalanceRepository,
    private user: UserRepository,
    private eventRepo: EventRepository,
  ) {}

  async placeOrder(userUid: string, body: OrdersDto) {
    const user = await this.user.findByUid(userUid);
    const zeroAmount = 0;

    if (body.amount === zeroAmount) {
      throw new NotFoundException('invalid amount');
    }

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const canOrder = await this.canPlaceOrder(user.id, body.amount);

    if (!canOrder) {
      return {
        success: false,
        message: 'Insufficient balance',
      };
    }

    await this.orders.setOrder(user.id, body);

    const userBalance = await this.balance.getUserBalanceAmount(user.id);

    if (!userBalance) {
      throw new NotFoundException('balance not found');
    }

    const newBalance = Number(userBalance) - body.amount;
    await this.balanceRepo.updateBalance(user.id, newBalance);

    let event = await this.eventRepo.findById(body.eventId);

    if (!event) {
      throw new NotFoundException('event not found');
    }

    const lmsrCal = new LmsrCalculator(event, body.amount, body.side);
    event = lmsrCal.calculatePrice();
    await this.eventRepo.commit(event);

    return { success: true, message: 'Order placed' };
  }

  private async canPlaceOrder(userId: number, amount: number) {
    const balance = await this.balance.getUserBalanceAmount(userId);

    if (!balance) {
      throw new NotFoundException('user balance not found');
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
