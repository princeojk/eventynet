import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
// import { OrdersController } from './orders.controller';
// import { OrdersService } from './orders.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [PrismaModule],
  //   controllers: [OrdersController],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
