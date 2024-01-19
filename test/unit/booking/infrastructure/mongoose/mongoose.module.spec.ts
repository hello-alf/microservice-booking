import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { environments } from '../../../../../src/environments';
import config from '../../../../../src/booking/infrastructure/config';
import { MongooseConfigModule } from '../../../../../src/booking/infrastructure/mongoose/mongoose.module';
// import { ThingsResolver } from './things.resolver';
// import { ThingsService } from './things.service';

describe('ThingsModule', () => {
  it.skip('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [config],
          isGlobal: true,
        }),
        MongooseConfigModule,
      ],
    }).compile();

    expect(module).toBeDefined();
    // expect(module.get(ThingsResolver)).toBeInstanceOf(ThingsResolver);
    // expect(module.get(ThingsService)).toBeInstanceOf(ThingsService);
  });
});
