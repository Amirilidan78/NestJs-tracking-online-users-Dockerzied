import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { SocketService } from "./share/services/socket.service";

@Global()
@Module({
  imports: [

    // for .env file register
    ConfigModule.forRoot({
      isGlobal : true ,
      envFilePath : `.env.${process.env.NODE_ENV}` ,
    }),

    UserModule ,

  ],
  controllers: [],

  providers: [
    SocketService ,
  ],

  exports: [
    SocketService,
  ],

})

export class AppModule {}