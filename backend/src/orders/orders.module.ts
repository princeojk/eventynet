import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserRepository } from 'src/user/user.repository';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [PrismaModule, UserRepository],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class AuthModule {}
