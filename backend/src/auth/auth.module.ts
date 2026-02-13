import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BalanceService } from 'src/balance/balance.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { BalanceRepository } from 'src/balance/balance.repository';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    BalanceService,
    BalanceRepository,
    UserService,
    PrismaService,
  ],
})
export class AuthModule {}
