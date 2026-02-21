import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { UserRepository } from 'src/user/user.repository';
import { OrdersRepository } from './orders.repository';
import { BalanceService } from 'src/balance/balance.service';
import { BalanceRepository } from 'src/balance/balance.repository';
import { EventRepository } from 'src/event/event.repository';

@Module({
  imports: [PrismaModule],
  controllers: [OrdersController],
  providers: [
    BalanceService,
    UserRepository,
    OrdersRepository,
    BalanceRepository,
    OrdersService,
    EventRepository,
  ],
})
export class OrdersModule {}
