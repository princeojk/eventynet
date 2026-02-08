import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';

@Injectable({})
export class OrdersRepository {
  constructor(private user: UserRepository) {}

  async findbyUserId(token: string) {
    const user = await this.user.findByUid(token);

    console.log(user);
  }
}
