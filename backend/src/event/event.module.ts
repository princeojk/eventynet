import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EventRepository } from './event.repository';
import EventModel from './event.model';

@Module({
  imports: [PrismaModule],
  providers: [EventRepository, EventModel],
})
export class EventModule {}
