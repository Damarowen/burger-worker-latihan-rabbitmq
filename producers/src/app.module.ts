import { RabbitMQModule } from '@app/rabbitmq';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [RabbitMQModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
