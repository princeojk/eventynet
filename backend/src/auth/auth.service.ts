import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  login() {
    return { msg: ' I have signed in  ' };
  }

  async signup(dto: AuthDto) {
    const user = await this.prisma.user.create({
      data: {
        uid: dto.uid,
        email: dto.email,
        name: dto.name,
        lastLogin: new Date(),
      },
    });
    return user;
  }
}
