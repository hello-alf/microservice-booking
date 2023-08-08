import { CreateBookingHandler } from './create-booking.handler';
import { CreatePropertyHandler } from './create-property.handler';
import { ConfirmBookingHandler } from './confirm-booking.handler';
import { CancelBookingHandler } from './cancel-booking.handler';
import { CompleteBookingPaymentHandler } from './complete-booking-payment.handler';

export const CommandHandlers = [
  CreateBookingHandler,
  CreatePropertyHandler,
  ConfirmBookingHandler,
  CancelBookingHandler,
  CompleteBookingPaymentHandler,
];
