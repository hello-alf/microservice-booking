import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedKernelModule } from './shared-kernel/shared-kernel.module';

@Module({
  imports: [SharedKernelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
