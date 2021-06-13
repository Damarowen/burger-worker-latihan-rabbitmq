import { RabbitMQService } from '@app/rabbitmq';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

MAKE_BURGER_PATTERN = 'MAKE_BURGER'

  constructor(
    private readonly appService: AppService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  
  @Get()
  async getHello() {
    this.rabbitMQService.send(this.MAKE_BURGER_PATTERN, {
      message: this.appService.getHello(),
    });
    
    return 'Message sent to the queue!';
  }
}