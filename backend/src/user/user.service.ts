// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { AuthDto } from './dto';

// @Injectable({})
// export class UserService {
//   constructor(private prisma: PrismaService) {}

//   async signup(dto: AuthDto) {
//     const user = await this.prisma.user.create({
//       data: {
//         uid: dto.uid,
//         email: dto.email,
//         name: dto.name,
//         lastLogin: new Date(),
//       },
//     });
//     return user;
//   }
// }
