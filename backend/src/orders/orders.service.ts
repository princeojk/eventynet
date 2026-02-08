import { Injectable } from '@nestjs/common';
import { OrdersDto } from './dto';
import { OrdersRepository } from './orders.repository';
@Injectable({})
export class OrdersService {
  constructor(private orders: OrdersRepository) {}

  async placeOrder(userUid: string, body: OrdersDto) {
    await this.orders.setOrder(userUid, body);
    return { success: true, message: 'Order placed', userUid };
  }
}
