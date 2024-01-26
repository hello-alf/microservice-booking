import { GetBookingsHandler } from './get-bookings.handler';
import { GetPropertiesHandler } from './get-properties.handler';
import { GetPropertyHandler } from './get-booking.handler';
import { GetTripsHandler } from './get-trips.handler';
import { GetHostingHandler } from './get-hosting.handler';

export const QueryHandlers = [
  GetBookingsHandler,
  GetPropertiesHandler,
  GetPropertyHandler,
  GetTripsHandler,
  GetHostingHandler,
];
