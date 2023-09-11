import { ValueObject } from '../../../../src/shared-kernel/core/valueObject';
import { iBusinessRule } from '../../../../src/shared-kernel/core/iBusinessRule';
import { BusinessRuleValidationException } from '../../../../src/shared-kernel/core/bussinessRuleValidationException';

class MockBusinessRule implements iBusinessRule {
  getMessage(): string {
    return 'Regla no implementada';
  }
  isValid(): boolean {
    return true; // Cambia esto según tus necesidades de prueba
  }
}

describe('ValueObject', () => {
  it('should not throw an error when the rule is valid', () => {
    const valueObject = new ValueObject();
    const mockRule = new MockBusinessRule();

    expect(() => {
      valueObject['checkRule'](mockRule);
    }).not.toThrow();
  });

  it('should throw an error when the rule is null', () => {
    const valueObject = new ValueObject();

    expect(() => {
      valueObject['checkRule'](null);
    }).toThrow('Rule can not be null');
  });

  it('should throw a BusinessRuleValidationException when the rule is invalid', () => {
    const valueObject = new ValueObject();
    const mockRule = new MockBusinessRule();
    jest.spyOn(mockRule, 'isValid').mockReturnValue(false);

    expect(() => {
      valueObject['checkRule'](mockRule);
    }).toThrow(BusinessRuleValidationException);
  });
});
