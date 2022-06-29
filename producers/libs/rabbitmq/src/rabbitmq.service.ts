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

          //  const response = await this.amqpCon.publish("", route, message)

            //* use rabbit rpc
            const response = await this.amqpCon.request<any>({
                exchange: '',
                routingKey: 'send_email_winner_new',
                payload: {
                    ...message,
                },
                timeout: 10000, // optional timeout for how long the request
                // should wait before failing if no response is received
            });

            return response
        } catch (error) {
            console.log(error)
        }
    }
}



