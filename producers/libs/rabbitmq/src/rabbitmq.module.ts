import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { queueOptions } from './queue-option';

import { RabbitMQService } from './rabbitmq.service';

@Module({
  imports: [
    ClientsModule.register([queueOptions.burger])
  ],
  controllers: [],
  providers: [RabbitMQService],
  exports: [RabbitMQService, queueOptions],
})
export class RabbitMQModule { }