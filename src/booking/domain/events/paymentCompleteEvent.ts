import { IEvent } from '@nestjs/cqrs';

export class PaymentCompleteEvent implements IEvent {
  constructor(readonly id: string) {}
}
