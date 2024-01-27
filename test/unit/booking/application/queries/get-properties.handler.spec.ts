import { Test, TestingModule } from '@nestjs/testing';
import { GetPropertiesQuery } from '../../../../../src/booking/application/queries/impl/get-properties.query';
import { PropertyRepository } from '../../../../../src/booking/infrastructure/mongoose/repositories/property.repository';
import { GetPropertiesHandler } from '../../../../../src/booking/application/queries/handlers/get-properties.handler';

class MockPropertyRepository {
  findAll() {
    return ['Property1', 'Property2', 'Property3'];
  }

  findById() {
    return 'Property1';
  }
}

describe('GetPropertiesHandler', () => {
  let handler: GetPropertiesHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPropertiesHandler,
        {
          provide: PropertyRepository,
          useClass: MockPropertyRepository,
        },
      ],
    }).compile();

    handler = module.get<GetPropertiesHandler>(GetPropertiesHandler);
  });

  it('Maneja GetPropertiesQuery', async () => {
    const query = new GetPropertiesQuery();

    const result = await handler.execute(query);

    expect(result).toEqual(['Property1', 'Property2', 'Property3']);
  });
});
