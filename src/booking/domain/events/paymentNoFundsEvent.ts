import { IEvent } from '@nestjs/cqrs';

export class PaymentNoFundsEvent implements IEvent {
  constructor(readonly id: string) {}
}
