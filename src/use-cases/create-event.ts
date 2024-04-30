import { EventsRepository } from "@/repositories/events-repository";
import type { Event } from "@prisma/client";

interface CreateEventUseCaseRequest {
  title: string;
  address: string;
  phone: string;
  description: string;
  startDate: string;
  endDate: string;
  latitude: number;
  longitude: number;
}

interface RegisterUseCaseResponse {
  event: Event;
}

export class RegisterUseCase {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async execute({
    title,
    address,
    phone,
    description,
    startDate,
    endDate,
    latitude,
    longitude,
  }: CreateEventUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const event = await this.eventsRepository.create({
      title,
      address,
      phone,
      description,
      startDate,
      endDate,
      latitude,
      longitude,
      active: false,
      image: "xxx.jpg",
    });

    return { event };
  }
}
