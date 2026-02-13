import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto';
import { PrismaClient } from 'src/generated/client';

@Injectable({})
export class UserService {
  constructor() {}

  async createUser(tx: PrismaClient, dto: AuthDto, uid: string) {
    const res = await tx.user.create({
      data: {
        uid: uid,
        email: dto.email,
        name: dto.name,
        lastLogin: new Date(),
      },
    });

    return res;
  }
}
