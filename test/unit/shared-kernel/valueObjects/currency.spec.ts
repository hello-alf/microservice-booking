import { Currency } from '../../../../src/shared-kernel/valueObjects/currency';

const BOB = 'BOB';
const USD = 'USD';

describe('Currency ValueObject', () => {
  let actualCurrency: Currency;
  let lastCurrency: Currency;

  beforeEach(() => {
    actualCurrency = new Currency(BOB);
  });

  test('Currency ValueObject correct', () => {
    lastCurrency = new Currency(BOB);

    expect(actualCurrency.equalTo(lastCurrency)).toBeTruthy();
  });

  test('Currency ValueObject different', () => {
    lastCurrency = new Currency(USD);

    expect(actualCurrency.equalTo(lastCurrency)).toBeFalsy();
  });
});
