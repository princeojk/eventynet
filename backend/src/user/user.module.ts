import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
// import { UserController } from './user.controller';

@Module({
  imports: [UserRepository],
  //   controllers: [UserController],
})
export class UserModule {}
