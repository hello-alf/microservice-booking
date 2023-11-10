import { IEvent } from '@nestjs/cqrs';

export class PaymentNoFundsResolvedEvent implements IEvent {
  constructor(readonly id: string) {}
}
