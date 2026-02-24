import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EventRepository } from './event.repository';
import EventModel from './event.model';
import { EventService } from './event.service';
import { EventController } from './event.controller';

@Module({
  imports: [PrismaModule],
  controllers: [EventController],
  providers: [EventRepository, EventModel, EventService],
})
export class EventModule {}
