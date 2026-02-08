import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as admin from 'firebase-admin';

@Injectable({})
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByUid() {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userUid = decodedToken.uid;

    const user = await this.prisma.user.findUnique({
      where: {
        uid: userUid,
      },
    });

    console.log(user);
  }
}
