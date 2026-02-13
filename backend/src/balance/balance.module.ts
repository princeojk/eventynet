import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BalanceService } from './balance.service';
import { BalanceRepository } from './balance.repository';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [PrismaModule],
  // controllers: [BalanceController],
  providers: [BalanceService, BalanceRepository, UserRepository],
  // exports: [BalanceRepository],
})
export class BalanceModule {}
