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

  async getOpenEvents() {
    const results: EventModel[] = await this.eventRepo.findOpenEvents();

    const events = results.map((result) => {
      const event = {
        id: result.id,
        question: result.question,
        status: result.getMarketStaus(),
        closesAt: result.closesAt,
        amountTraded: result.amountTraded,
        totalTraded: result.totalTraded,
        yesPrice: result.getYesPrice(),
        noPrice: result.getNoPrice(),
      };
      return event;
    });

    return {
      message: 'open Events',
      events: events,
    };
  }
}
