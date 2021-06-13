import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BURGER_QUEUE} from './rabbitmq.constant';

@Injectable()
export class RabbitMQService {
    constructor(
        @Inject(BURGER_QUEUE) private readonly client: ClientProxy,
    ) { }


    public async send(pattern: string, data: any) {
        try {
            Logger.log(`Burger for ${data.customer} is being cooked 😋`);
            return await this.client.send(pattern, data).toPromise();
        } catch (error) {
            console.log(error)
        }
    }
}
