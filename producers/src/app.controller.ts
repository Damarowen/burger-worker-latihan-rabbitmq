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

      const { route, data } = createPost

      await this.rabbitMQService.send(route,data);
      return { route, data }
    } catch (error) {
      console.log(error)
    }
  }
}


