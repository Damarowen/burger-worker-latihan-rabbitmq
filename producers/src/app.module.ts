import { RabbitMQModule } from '@app/rabbitmq';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [RabbitMQModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
