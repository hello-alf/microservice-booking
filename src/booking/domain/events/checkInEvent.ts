import { IEvent } from '@nestjs/cqrs';

export class CheckInEvent implements IEvent {
  constructor(readonly id: string) {}
}
