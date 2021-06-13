import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RABBITMQ_NAME } from './rabbitmq.constant';

@Injectable()
export class RabbitMQService {
    constructor(
        @Inject(RABBITMQ_NAME) private readonly client: ClientProxy,
    ) { }


    public send(pattern: string, data: any) {
        return this.client.send(pattern, data).toPromise();
    }
}
