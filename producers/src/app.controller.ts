import { RabbitMQService } from '@app/rabbitmq';
import { MAKE_BURGER_PATTERN } from '@app/rabbitmq';
import { Body, Controller, Post } from '@nestjs/common';

class CreatePostDto {
  customer?: string
  patties?: number
}


@Controller('/post')
export class AppController {

  constructor(
    private readonly rabbitMQService: RabbitMQService,
  ) { }

  @Post()
  async PostTest(
    @Body() createPost: CreatePostDto,
  ) {
    try {

      const { customer, patties } = createPost
      const data = { customer, patties }

      await this.rabbitMQService.send(MAKE_BURGER_PATTERN, data);
      return { customer, patties }
    } catch (error) {
      console.log(error)
    }
  }
}


