import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import { ConfigModule } from '@nestjs/config';
import config from '../../../../../src/booking/infrastructure/config';
import { MongooseConfigModule } from '../../../../../src/booking/infrastructure/mongoose/mongoose.module';

const mockConfig = {
  KEY: 'mock-key',
  mongo: {
    dbName: 'mongodb',
    user: 'user',
    password: 'password',
    host: 'localhost',
    port: '27017',
    connection: 'test-db',
  },
};

jest.mock('../../../../../src/booking/infrastructure/config', () => ({
  __esModule: true,
  default: {
    KEY: 'mock-key',
    mongo: {
      connection: 'mongodb',
      user: 'user',
      password: 'password',
      host: 'localhost',
      port: '27017',
      dbName: 'test-db',
    },
  },
}));

// Mock MongoClient
jest.mock('mongodb');

describe('MongooseConfigModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
          load: [config],
          isGlobal: true,
        }),
        MongooseModule.forRootAsync({
          useFactory: (configService: any) => {
            const { connection, user, password, host, port, dbName } =
              configService.mongo;
            return {
              uri: `${connection}://${host}:${port}`,
              user,
              pass: password,
              dbName,
            };
          },
          inject: [config.KEY],
        }),
        MongooseConfigModule,
      ],
    })
      .overrideProvider(config.KEY)
      .useValue(mockConfig)
      .compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it.skip('should connect to MongoDB', async () => {
    const clientConnectSpy = jest.spyOn(MongoClient.prototype, 'connect');
    const clientCloseSpy = jest.spyOn(MongoClient.prototype, 'close');

    const app = module.createNestApplication();
    await app.init();

    expect(clientConnectSpy).toHaveBeenCalled();
    expect(clientCloseSpy).toHaveBeenCalled();

    await app.close();
  });
});
