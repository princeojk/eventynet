import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByUid(userUid: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        uid: userUid,
      },
    });

    return user;
  }
}
