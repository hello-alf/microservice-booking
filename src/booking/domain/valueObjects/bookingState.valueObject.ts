import { ValueObject } from '../../../shared-kernel/core/valueObject';

export class BookingState extends ValueObject {
  private state: string;

  constructor(state: string) {
    super();
    this.state = state;
  }

  public getState() {
    return this.state;
  }
}
