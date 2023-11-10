import { IEvent } from '@nestjs/cqrs';

export class BookingPendingResolvedEvent implements IEvent {
  constructor(readonly id: string) {}
}
