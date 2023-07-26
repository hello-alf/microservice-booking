import { IEvent } from '@nestjs/cqrs';

export class BookingPendingEvent implements IEvent {
  constructor(readonly id: string) {}
}
