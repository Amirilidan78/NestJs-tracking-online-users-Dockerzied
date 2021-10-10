import { Injectable, ValidationError, ValidationPipe } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";

@Injectable()
export class WsPipePipe extends ValidationPipe {

  exceptionFactory = (validationErrors: ValidationError[] = []) => {
    return new WsException(validationErrors[0].constraints)
  };

}