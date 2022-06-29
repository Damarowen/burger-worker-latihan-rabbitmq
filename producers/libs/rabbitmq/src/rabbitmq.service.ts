import { Injectable, Inject, Logger } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class RabbitMQService {
    constructor(
        private amqpCon: AmqpConnection
    ) { }


    public async send(route: string, message: any) {

        try {
            console.log("🚀 ~ file: rabbitmq.service.ts ~ line 12 ~ RabbitMQService ~ send ~ message", message)
            console.log("🚀 ~ file: rabbitmq.service.ts ~ line 12 ~ RabbitMQService ~ send ~ route", route)
            Logger.log(`MESSAGE IS BEING SEND 😋`);
            this.amqpCon.publish("", route, message)
        } catch (error) {
            console.log(error)
        }
    }
}



