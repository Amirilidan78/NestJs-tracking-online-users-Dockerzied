import { Module } from '@nestjs/common';
import { UserGateway } from "./gateways/user.gateway";

@Module({

  controllers: [

  ],

  providers: [
    UserGateway ,
  ],

})

export class UserModule {}
