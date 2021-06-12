import { queueOptions } from '@app/shared';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  await app.connectMicroservice<MicroserviceOptions>(
    queueOptions.burger
  );
 
  app.startAllMicroservices(() => Logger.log('Burger Worker is work'))
}

bootstrap();