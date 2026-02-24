import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import EventModel from './event.model';
import { Prisma } from 'src/generated/client';
import { NotFoundException } from '@nestjs/common';
import { statusEnum } from './eventEnums';

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
      throw new NotFoundException('Event not found');
    }

    return new EventModel(
      event.id,
      event.question,
      event.status,
      Number(event.amountTraded),
      event.totalTraded,
      event.closesAt,
      Number(event.yesPrice),
      Number(event.noPrice),
      event.liquidityParameter,
      Number(event.yesShares),
      Number(event.noShares),
      event.outCome,
    );
  }

  async findOpenEvents() {
    const events = await this.prisma.event.findMany({
      where: { status: statusEnum.open },
    });

    return events.map((event) => {
      return new EventModel(
        event.id,
        event.question,
        event.status,
        Number(event.amountTraded),
        event.totalTraded,
        event.closesAt,
        Number(event.yesPrice),
        Number(event.noPrice),
        event.liquidityParameter,
        Number(event.yesShares),
        Number(event.noShares),
        event.outCome,
      );
    });
  }

  private async lockEventRowForUpdate(
    tx: Prisma.TransactionClient,
    eventId: number,
  ) {
    await tx.$queryRaw`
    SELECT id FROM Event WHERE id = ${BigInt(eventId)} FOR UPDATE
  `;
  }

  async commit(event: EventModel) {
    await this.prisma.$transaction(async (tx) => {
      await this.lockEventRowForUpdate(tx, event.id);

      return await tx.event.upsert({
        where: { id: event.id },
        update: {
          question: event.question,
          closesAt: event.closesAt,
          status: event.status,
          amountTraded: event.amountTraded,
          totalTraded: event.totalTraded,
          outCome: event.outCome,
          yesPrice: event.yesPrice,
          noPrice: event.noPrice,
          liquidityParameter: event.liquidityParameter,
          noShares: event.noShares,
          yesShares: event.yesShares,
        },
        create: {
          question: event.question,
          closesAt: event.closesAt,
          status: event.status,
          amountTraded: event.amountTraded,
          totalTraded: event.totalTraded,
          outCome: event.outCome,
          yesPrice: event.yesPrice,
          noPrice: event.noPrice,
          liquidityParameter: event.liquidityParameter,
          noShares: event.noShares,
          yesShares: event.yesShares,
        },
      });
    });
  }
}
