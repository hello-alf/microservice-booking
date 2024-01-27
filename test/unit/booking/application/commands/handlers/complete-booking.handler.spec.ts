import { BadRequestException } from '@nestjs/common';
import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CompleteBookingPaymentHandler } from '../../../../../../src/booking/application/commands/handlers/complete-booking-payment.handler';
import { CompleteBookingPaymentCommand } from '../../../../../../src/booking/application/commands/impl/complete-booking-payment.command';
import { BookingRepository } from '../../../../../../src/booking/infrastructure/mongoose/repositories/booking.repository';
import { BookingFactory } from '../../../../../../src/booking/domain/factories/booking.factory';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

class MockEventPublisher {
  mergeObjectContext() {
    return {
      commit: jest.fn(),
      completePayment: jest.fn(),
      getBookingState: jest.fn(),
      getPaymentState: jest.fn(),
    };
  }
}

class MockBookingRepository {
  findById(id) {
    if (id === '123') {
      return Promise.resolve({
        id,
        paymentState: 'Pending',
        // Otras propiedades necesarias
      });
    }

    throw new BadRequestException('Booking not found');
  }

  findOneAndUpdate(id: string, update: any) {
    // Simula actualizar la reserva en la base de datos
    return Promise.resolve({
      id,
      ...update,
    });
  }
}

class MockBookingFactory {}

class MockAmqpConnection {
  publish(exchange: string, routingKey: string, content: any) {
    return Promise.resolve();
  }
}

describe('CompleteBookingPaymentHandler', () => {
  let handler: ICommandHandler<CompleteBookingPaymentCommand>;
  let repository: BookingRepository;
  let amqpConnection: AmqpConnection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompleteBookingPaymentHandler,
        {
          provide: BookingRepository,
          useClass: MockBookingRepository,
        },
        {
          provide: EventPublisher,
          useClass: MockEventPublisher,
        },
        {
          provide: BookingFactory,
          useClass: MockBookingFactory,
        },
        {
          provide: AmqpConnection,
          useClass: MockAmqpConnection,
        },
      ],
    }).compile();

    handler = module.get<ICommandHandler<CompleteBookingPaymentCommand>>(
      CompleteBookingPaymentHandler,
    );
    repository = module.get<BookingRepository>(BookingRepository);
    amqpConnection = module.get<AmqpConnection>(AmqpConnection);
  });

  it('Debe estar definido', () => {
    expect(handler).toBeDefined();
  });

  it('Booking approved', async () => {
    const bookingId = '123';

    const command = new CompleteBookingPaymentCommand(bookingId);

    const result = await handler.execute(command);

    expect(result).toBeDefined();
  });

  it('Mostrar error BadRequestException', async () => {
    const bookingId = '1234546';

    const command = new CompleteBookingPaymentCommand(bookingId);

    await expect(handler.execute(command)).rejects.toThrowError(
      BadRequestException,
    );

    jest
      .spyOn(MockBookingRepository.prototype, 'findOneAndUpdate')
      .mockRejectedValueOnce(new Error('Test Error') as never);
  });
});
