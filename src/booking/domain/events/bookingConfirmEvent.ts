import { IEvent } from '@nestjs/cqrs';

export class BookingConfirmEvent implements IEvent {
  constructor(readonly id: string) {}
}
