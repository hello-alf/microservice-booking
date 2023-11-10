import { IEvent } from '@nestjs/cqrs';

export class BookingConfirmedEvent implements IEvent {
  constructor(readonly id: string) {}
}
