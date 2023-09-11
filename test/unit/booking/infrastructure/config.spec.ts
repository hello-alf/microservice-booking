import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import databaseConfig from '../../../../src/booking/infrastructure/config';

describe('Database Configuration', () => {
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: new ConfigService({}),
        },
      ],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
  });

  it('should return the expected database configuration', () => {
    const expectedConfig = {
      mongo: {
        dbName: 'nurbnb',
        user: 'mongo',
        password: 'secret',
        port: 27018,
        host: 'localhost',
        connection: 'mongodb',
      },
    };

    const config = databaseConfig();

    expect(config).toMatchObject(expectedConfig);
  });
});
