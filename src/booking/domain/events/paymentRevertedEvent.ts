import { IEvent } from '@nestjs/cqrs';

export class PaymentRevertedEvent implements IEvent {
  constructor(readonly id: string) {}
}
