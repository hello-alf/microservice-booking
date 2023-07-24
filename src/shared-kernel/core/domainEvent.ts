import { v4 as uuidv4 } from 'uuid';

export abstract class DomainEvent {
  private readonly ocurredOn: Date;
  private readonly id: string;

  protected constructor(ocurredOn: Date) {
    this.id = uuidv4();
    this.ocurredOn = ocurredOn;
  }
}
