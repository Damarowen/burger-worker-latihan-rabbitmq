import { RabbitMQModules } from '@app/rabbitmq';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [RabbitMQModules],
  controllers: [AppController],
})
export class AppModule {}
