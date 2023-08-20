import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BookingController } from '../../../../../src/booking/api/booking/booking.controller';
import { CreateBookingDto } from '../../../../../src/booking/application/dtos/booking.dto';
import { CreateBookingCommand } from '../../../../../src/booking/application/commands/impl/create-booking.command';
import { ConfirmBookingCommand } from '../../../../../src/booking/application/commands/impl/confirm-booking.command';
import { CancelBookingCommand } from '../../../../../src/booking/application/commands/impl/cancel-booking.command';
import { CompleteBookingPaymentCommand } from '../../../../../src/booking/application/commands/impl/complete-booking-payment.command';
import { GetBookingsQuery } from '../../../../../src/booking/application/queries/impl/get-bookings.query';

describe('BookingController', () => {
  let controller: BookingController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BookingController>(BookingController);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  test('Controller be defined', () => {
    expect(controller).toBeDefined();
  });

  test('Crear una reserva', () => {
    const createBookingDto: CreateBookingDto = {
      propertyId: '12331',
      numberOfGuests: 1,
      checkInDate: new Date(),
      checkOutDate: new Date(),
    };
    controller.create(createBookingDto);
    expect(commandBus.execute).toHaveBeenCalledWith(
      new CreateBookingCommand(createBookingDto),
    );
  });

  test('Confirmar una reserva', () => {
    const bookingId = '123';
    controller.confirm(bookingId);
    expect(commandBus.execute).toHaveBeenCalledWith(
      new ConfirmBookingCommand(bookingId),
    );
  });

  test('Cancelar una reserva', () => {
    const bookingId = '123';
    controller.cancel(bookingId);
    expect(commandBus.execute).toHaveBeenCalledWith(
      new CancelBookingCommand(bookingId),
    );
  });

  test('Completar el pago de una reserva', () => {
    const bookingId = '123';
    controller.completePayment(bookingId);
    expect(commandBus.execute).toHaveBeenCalledWith(
      new CompleteBookingPaymentCommand(bookingId),
    );
  });

  test('Listar todas las reservas', () => {
    controller.findAll();
    expect(queryBus.execute).toHaveBeenCalledWith(new GetBookingsQuery());
  });
});
