import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // app.connectMicroservice({
  //   transport: Transport.RMQ,
  //   options: { urls: ['amqp://localhost:5672'], queue: 'properties' },
  // });

  const options = new DocumentBuilder()
    .setTitle('Booking API')
    .setDescription('Microservicio de Booking')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api/docs', app, document, {
    swaggerOptions: { filter: true },
  });

  // await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
