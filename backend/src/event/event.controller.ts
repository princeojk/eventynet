import { Body, Controller, Get } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('v1/events')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get('openEvents')
  async getOpenEvents() {
    return await this.eventService.getOpenEvents();
  }
}
