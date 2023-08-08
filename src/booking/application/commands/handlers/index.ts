import { CreateBookingHandler } from './create-booking.handler';
import { CreatePropertyHandler } from './create-property.handler';
import { CancelBookingHandler } from './cancel-booking.handler';

export const CommandHandlers = [
  CreateBookingHandler,
  CreatePropertyHandler,
  CancelBookingHandler,
];
