import { Injectable, Inject, Logger } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class RabbitMQService {
    constructor(
        private amqpCon: AmqpConnection
    ) { }


    public async send(route: string, message: any) {
        try {
            Logger.log(`MESSAGE IS BEING SEND 😋`);
            await this.amqpCon.publish("", route, message)
        } catch (error) {
            console.log(error)
        }
    }
}



