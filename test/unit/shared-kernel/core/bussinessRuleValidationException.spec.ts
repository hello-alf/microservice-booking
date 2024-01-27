import { BusinessRuleValidationException } from '../../../../src/shared-kernel/core/bussinessRuleValidationException';
import { iBusinessRule } from '../../../../src/shared-kernel/core/iBusinessRule';

// Mock para iBusinessRule
class MockBusinessRule implements iBusinessRule {
  isValid(): boolean {
    throw new Error('Method not implemented.');
  }
  getMessage(): string {
    return 'Mock Business Rule Message';
  }
}

describe('BusinessRuleValidationException', () => {
  it('should create an exception with iBusinessRule', () => {
    // Arrange
    const mockRule = new MockBusinessRule();

    // Act
    const exception = new BusinessRuleValidationException(mockRule);

    // Assert
    expect(exception).toBeInstanceOf(BusinessRuleValidationException);
    expect(exception.getMessage()).toBe('Mock Business Rule Message');
  });

  it('should create an exception with a string message', () => {
    // Arrange
    const errorMessage = 'Test Error Message';

    // Act
    const exception = new BusinessRuleValidationException(errorMessage);

    // Assert
    expect(exception).toBeInstanceOf(BusinessRuleValidationException);
    expect(exception.getMessage()).toBe(errorMessage);
  });
});
