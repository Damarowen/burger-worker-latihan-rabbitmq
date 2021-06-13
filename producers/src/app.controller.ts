import { RabbitMQService } from '@app/rabbitmq';
import { BURGER_QUEUE } from '@app/rabbitmq/rabbitmq.constant';
import { Body, Controller, Get, Post } from '@nestjs/common';

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

      this.rabbitMQService.send(BURGER_QUEUE, data);
      return { customer, patties }
    } catch (error) {
      console.log(error)
    }
  }
}

function IsNotEmpty() {
  throw new Error('Function not implemented.');
}
