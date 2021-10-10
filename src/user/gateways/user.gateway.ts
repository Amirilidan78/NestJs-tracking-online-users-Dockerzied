import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io"
import { SocketService } from "../../share/services/socket.service";
import { SyncUserDto } from "../dtos/socket/sync-user.dto";
import { SyncPageDto } from "../dtos/socket/sync-page.dto";
import { WsPipePipe } from "../../share/pipes/WsPipe.pipe";
import { UsePipes } from "@nestjs/common";

@UsePipes(new WsPipePipe()) // for websocket exception config
@WebSocketGateway(1001, { path : "/websockets" ,namespace : "/user" })
export class UserGateway implements OnGatewayInit ,OnGatewayConnection ,OnGatewayDisconnect {

  @WebSocketServer() server : Server ;

  constructor( private socketService: SocketService )
  {}

  afterInit( server : any ) : any
  {
    // after socket server initialled
    this.socketService.user_server = server
  }


  handleConnection(client: any, payload : [] ) 
  {
    const token = client.handshake.auth.token

    if( token !== process.env.USER_SOCKET_SECRET_TOKEN )
    {
      client.disconnect()
    }

    // event for on join user 
  }


  handleDisconnect(client: any) : any 
  {
    // event for on leave user 
  }


  // ============================================================================== //

  @SubscribeMessage('sync-user')
  syncUser( client : any ,payload : SyncUserDto )
  {
    const { user } = payload 

    client.data.user = user

    client.join("users")

    // event for on join users room 
  }

  @SubscribeMessage('sync-page')
  syncPage( client : any ,payload : SyncPageDto )
  {
    const { page } = payload 

    client.data.info = {
      page : page ,
      time : new Date().toLocaleString("en-us",{ timeZone: process.env.TIMEZONE })
    }

    // const user = client.data.user ;
    // event for on change user page 
  }

}