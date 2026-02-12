import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

import { UserRepository } from 'src/user/user.repository';
import { BalanceService } from './balance.service';

@Module({
  imports: [PrismaModule],
  //   controllers: [OrdersController],
  providers: [BalanceService, UserRepository],
})
export class OrdersModule {}
