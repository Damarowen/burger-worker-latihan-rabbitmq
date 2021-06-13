import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BURGER_QUEUE, RABBITMQ_NAME } from './rabbitmq.constant';

import { RabbitMQService } from './rabbitmq.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RABBITMQ_NAME,
        transport: Transport.RMQ,
        options: {
          urls: [
          'amqp://guest:guest@localhost:5672',
          ],
          queue: BURGER_QUEUE,
        },
      },
    ]),
  ],
  controllers: [],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}