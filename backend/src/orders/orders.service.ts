import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  placeOrder(req: string) {
    console.log(req);
    // return user;
  }
}
