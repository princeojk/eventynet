import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import EventModel from './event.model';

@Injectable({})
export class EventRepository {
  constructor(private prisma: PrismaService) {}

  async findById(eventId: number) {
    const event = await this.prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });
    if (!event) {
      console.error('event not found');
      return;
    }
    return new EventModel(
      event.question,
      event.status,
      Number(event.amountTraded),
      event.totalTraded,
      event.closesAt,
      Number(event.yesPrice),
      Number(event.noPrice),
      event.liquidityParameter,
    );
  }

  async commit(event: EventModel): Promise<EventModel> {
    await this.prisma.event.upsert({
      where: { question: event.question },
      update: {
        status: event.status,
        amountTraded: event.amountTraded,
        totalTraded: event.totalTraded,
        closesAt: event.closesAT,
        yesPrice: event.yesPrice,
        noPrice: event.noPrice,
        liquidityParameter: event.liquidityParameter,
      },
      create: {
        question: event.question,
        status: event.status,
        amountTraded: event.amountTraded,
        totalTraded: event.totalTraded,
        closesAt: event.closesAT,
        yesPrice: event.yesPrice,
        noPrice: event.noPrice,
        liquidityParameter: event.liquidityParameter,
        outCome: event.outCome,
      },
    });
    return event;
  }
}
