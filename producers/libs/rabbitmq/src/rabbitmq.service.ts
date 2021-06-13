import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BURGER_QUEUE} from './rabbitmq.constant';

@Injectable()
export class RabbitMQService {
    constructor(
        @Inject(BURGER_QUEUE) private readonly client: ClientProxy,
    ) { }


    public send(pattern: string, data: any) {
        try {
            return this.client.send(pattern, data).toPromise();

        } catch (error) {
            console.log(error)
        }
    }
}
