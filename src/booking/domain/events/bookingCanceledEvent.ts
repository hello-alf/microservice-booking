import { IEvent } from '@nestjs/cqrs';

export class BookingCanceledEvent implements IEvent {
  constructor(readonly id: string) {}
}
