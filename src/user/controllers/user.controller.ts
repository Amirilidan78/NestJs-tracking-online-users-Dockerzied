import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { SocketService } from "../../share/services/socket.service";
import { EmitSocketDto } from "../dtos/http/emit-socket.dto";
import { EmitUserDto } from "../dtos/http/emit-user.dto";
import { ApiGuard } from "../guards/api.guard";

@UsePipes(new ValidationPipe())
@UseGuards( ApiGuard )
@Controller('/user')
export class UserController {

  constructor( private socketService : SocketService )
  {}

  @Get("/users")
  getUsers()
  {
      return { success : true ,users : this.socketService.get_users() }
  }

  @Post("/emit-socket")
  async emitSocket( @Body() { socket_id ,event ,payload } : EmitSocketDto )
  {
    const socket = this.socketService.find_socket( this.socketService.user_server ,socket_id ) ;

    if( ! socket )
      return { success : false , message : "Socket instant not found!" }

    const emited = await this.socketService.emit_socket( this.socketService.user_server ,socket_id ,event ,payload )

    if( ! emited )
      return { success : false , message : "Error in emitting event!" }

    return { success : true , message : "Emitted successfully!" }
  }

  @Post("/emit-user")
  async emitUser( @Body() { user_id ,event ,payload } : EmitUserDto )
  {
    const emitted_count = await this.socketService.emit_user( user_id ,event ,payload )

    return { success : true ,message : `Emitted to ${emitted_count} socket instantses!` }
  }

}