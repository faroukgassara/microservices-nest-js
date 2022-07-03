import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './all-exception.filter';
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://@localhost:5672/hello'],
      queue: 'user-messages',
      queueOptions: {
        durable: false
      },
      noAck: false,
    }
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
  
}

bootstrap();