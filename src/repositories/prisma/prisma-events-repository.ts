import { prisma } from "@/lib/prisma";
import { Prisma, Event } from "@prisma/client";
import { EventsRepository } from "../events-repository";
import { randomUUID } from "crypto";
import { Decimal } from "@prisma/client/runtime/library";

export class PrismaEventsRepository implements EventsRepository {
  async create({
    title,
    address,
    phone,
    description,
    startDate,
    endDate,
    latitude,
    longitude,
  }: Prisma.EventCreateInput): Promise<Event> {
    const event = await prisma.event.create({
      data: {
        id: randomUUID(),
        title,
        address: address ? address : null,
        phone: phone ? phone : null,
        description: description ? description : null,
        startDate,
        endDate,
        latitude: new Decimal(123),
        longitude: new Decimal(123),
        image: "https://github.com/rafaelpalma88.png",
        created_at: new Date(),
        approved_at: null,
        active: false,
      },
    });

    return event;
  }
}
