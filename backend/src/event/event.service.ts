import { Injectable } from '@nestjs/common';
import EventModel from './event.model';
import { EventDto } from './dto/event.dto';
import { EventRepository } from './event.repository';

@Injectable({})
export class EventService {
  constructor(private eventRepo: EventRepository) {}

  async createEvent(dto: EventDto): Promise<EventModel> {
    const event = new EventModel(
      dto.id,
      dto.question,
      dto.status,
      dto.amountTraded,
      dto.totalTraded,
      dto.closesAt,
      dto.yesPrice,
      dto.noPrice,
      dto.liquidityParameter,
    );

    await this.eventRepo.commit(event);
    return event;
  }
}
