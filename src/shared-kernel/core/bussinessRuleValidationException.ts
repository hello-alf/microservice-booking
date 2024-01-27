import { iBusinessRule } from './iBusinessRule';

export class BusinessRuleValidationException {
  private brokenRule: iBusinessRule;
  private message: string;

  constructor(brokenRule: iBusinessRule);
  constructor(message: string);
  constructor(arg: iBusinessRule | string) {
    if (typeof arg === 'string') {
      this.message = arg;
    } else {
      this.brokenRule = arg;
      this.message = this.brokenRule.getMessage();
    }
  }

  public getMessage(): string {
    return this.message;
  }
}
