import { IEvent } from '@nestjs/cqrs';

export class PaymentCompletedEvent implements IEvent {
  constructor(readonly id: string) {}
}
