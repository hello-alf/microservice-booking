import { Currency } from '../../../../src/shared-kernel/valueObjects/currency';

const BOB = 'BOB';
const USD = 'USD';

describe('Currency ValueObject', () => {
  test('Currency ValueObject correct', () => {
    const actualCurrency: Currency = new Currency(BOB);

    const lastCurrency: Currency = new Currency(BOB);

    expect(actualCurrency.equalTo(lastCurrency)).toBeTruthy();
  });

  test('Currency ValueObject different', () => {
    const actualCurrency: Currency = new Currency(BOB);

    const lastCurrency: Currency = new Currency(USD);

    expect(actualCurrency.equalTo(lastCurrency)).toBeFalsy();
  });
});
