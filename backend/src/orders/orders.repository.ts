import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from 'src/user/user.repository';
import { OrdersDto } from './dto';

@Injectable({})
export class OrdersRepository {
  constructor(
    private user: UserRepository,
    private prisma: PrismaService,
  ) {}

  async setOrder(userUid: string, body: OrdersDto) {
    const user = await this.user.findByUid(userUid);

    if (!user) {
      return;
    }

    const order = await this.prisma.orders.create({
      data: {
        userId: user.id,
        eventId: body.eventId,
        side: body.side,
        price: body.price,
        amount: body.amount,
        createdAt: new Date(),
      },
    });
  }
}
