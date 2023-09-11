import { QueryHandlers } from '../../../../../../src/booking/application/queries/impl/index';
import { GetBookingsQuery } from '../../../../../../src/booking/application/queries/impl/get-bookings.query';
import { GetPropertiesQuery } from '../../../../../../src/booking/application/queries/impl/get-properties.query';

describe('QueryHandlers', () => {
  it('Exportar GetBookingsQuery', () => {
    expect(QueryHandlers).toContain(GetBookingsQuery);
  });

  it('Exportar GetPropertiesQuery', () => {
    expect(QueryHandlers).toContain(GetPropertiesQuery);
  });
});
