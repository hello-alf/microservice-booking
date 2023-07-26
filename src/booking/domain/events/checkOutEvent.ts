import { IEvent } from '@nestjs/cqrs';

export class CheckOutEvent implements IEvent {
  constructor(readonly id: string) {}
}
