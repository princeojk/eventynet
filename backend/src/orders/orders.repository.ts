import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrdersDto } from './dto';

@Injectable({})
export class OrdersRepository {
  constructor(private prisma: PrismaService) {}

  async setOrder(userId: number, body: OrdersDto) {
    const order = await this.prisma.orders.create({
      data: {
        userId: userId,
        eventId: body.eventId,
        side: body.side,
        price: body.price,
        amount: body.amount,
        createdAt: new Date(),
      },
    });

    return order;
  }
}
