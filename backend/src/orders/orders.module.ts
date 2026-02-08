import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { UserRepository } from 'src/user/user.repository';
import { OrdersRepository } from './orders.repository';
// import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [PrismaModule],
  controllers: [OrdersController],
  providers: [OrdersService, UserRepository, OrdersRepository],
})
export class OrdersModule {}
