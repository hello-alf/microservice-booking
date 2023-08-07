import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedKernelModule } from './shared-kernel/shared-kernel.module';
import { BookingModule } from './booking/booking.module';
import { MongooseConfigModule } from './booking/infrastructure/mongoose/mongoose.module';
import config from './booking/infrastructure/config';
import { environments } from './environments';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    SharedKernelModule,
    BookingModule,
    MongooseConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
