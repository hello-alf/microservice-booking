import { IEvent } from '@nestjs/cqrs';

export class BookingCancelEvent implements IEvent {
  constructor(readonly id: string) {}
}
