import { iBusinessRule } from './iBusinessRule';
import { BusinessRuleValidationException } from './bussinessRuleValidationException';

export class ValueObject {
  protected checkRule(rule: iBusinessRule): void {
    if (!rule) {
      throw new Error('Rule can not be null');
    }

    if (!rule.isValid()) {
      throw new BusinessRuleValidationException(rule);
    }
  }
}
