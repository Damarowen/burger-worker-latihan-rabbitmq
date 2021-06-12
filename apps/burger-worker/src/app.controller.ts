import { MakeBurgerPayload, MakeBurgerSuccessPayload, MAKE_BURGER_FAILURE_PATTERN, MAKE_BURGER_PATTERN, MAKE_BURGER_SUCCESS_PATTERN, queueOptions } from "@app/shared";
import { Controller, Inject, Logger } from "@nestjs/common";
import { ClientProxy, Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";

@Controller()
export class AppController {
  // add variable 
  pattyCount = 0;

  constructor(
    // use the injection token we provided earlier
    @Inject(queueOptions.burger.name) private burgerQueue: ClientProxy
  ) { }



  @EventPattern(MAKE_BURGER_PATTERN)
  makeBurgerEvent(
    @Payload() payload: MakeBurgerPayload,
    @Ctx() context: RmqContext
  ) {
    try {
      this.makeBurger(payload.patties);

      this.emitBurgerSuccess(payload);

      // acknowledge that we processed the message
      context.getChannelRef().ack(context.getMessage());
    } catch (err) {
      Logger.warn(
        `An error ${err} occured while preparing the burger for ${payload.customer}.`
      );

      // reject message and set reque = false
      // this will dead letter our message
      context.getChannelRef().reject(context.getMessage(), false);
    }
  }

  @EventPattern(MAKE_BURGER_SUCCESS_PATTERN)
  makeBurgerSuccessEvent(
    @Payload() payload: MakeBurgerPayload,
    @Ctx() context: RmqContext,
  ) {
    Logger.log(`Burger for ${payload.customer} is ready 😋`);
    context.getChannelRef().ack(context.getMessage());
    console.log(payload)
    console.log(this.pattyCount )
  }

  @EventPattern(MAKE_BURGER_FAILURE_PATTERN)
  makeBurgerFailureEvent(
    @Payload() payload: MakeBurgerPayload,
    @Ctx() context: RmqContext,
  ) {
    Logger.error(
      `Burger for ${payload.customer} couldn't be prepared. Will not retry 🔥`,
    );
    console.log(payload)
    context.getChannelRef().ack(context.getMessage());
  }

   // simply throws an error for every third burger
   private makeBurger(patties: number) {
    for (let i = 0; i < patties; i++) {
      //* kalau entry 3 patty count lansung 4
      this.pattyCount++;
      if (this.pattyCount % 3 === 0) {
        throw Error("Dropped patty 😓");
      }
    }
  }

  private emitBurgerSuccess(payload: MakeBurgerSuccessPayload) {
    this.burgerQueue.emit(MAKE_BURGER_SUCCESS_PATTERN, payload);
    console.log(payload)
  }

}