import { RabbitMQService } from '@app/rabbitmq';
import { Body, Controller, Post } from '@nestjs/common';


@Controller('/post')
export class AppController {

  constructor(
    private readonly rabbitMQService: RabbitMQService,
  ) { }

  @Post()
  async PostTest(
    @Body() createPost,
  ) {
    try {

      const { route, message } = createPost

      await this.rabbitMQService.send(route,message);
      return { route, message }
    } catch (error) {
      console.log(error)
    }
  }
}


