import { type Event, type Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { EventsRepository } from "../events-repository";
import { Decimal } from "@prisma/client/runtime/library";

export class InMemoryEventsRepository implements EventsRepository {
  public events: Event[] = [];

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
    const newEvent: Event = {
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
    };

    this.events.push(newEvent);

    return newEvent;
  }
}
