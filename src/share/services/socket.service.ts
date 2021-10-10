import { Injectable } from "@nestjs/common";
import { RemoteSocket, Server, Socket } from "socket.io";

@Injectable()
export class SocketService {

    public support_server : Server ;
    public user_server : Server ;
    public admin_server : Server ;

    async emit_user( user_id : number ,event : string ,payload : {} ) : Promise<number>
    {
        const sockets = await this.get_sockets( this.user_server )

        const user_sockets = sockets.filter( item => item.data.user.id === user_id )

        for ( const socket of user_sockets )
            await this.emit_socket( this.user_server ,socket.id ,event ,payload )

        return user_sockets.length
    }

    async get_users() : Promise<{ id ,data ,ip }[]>
    {
        const result = []

        const sockets = await this.get_sockets( this.user_server )

        sockets.forEach( ( value ,key ) => {
            result.push({
                id : value.id ,
                data : value.data ,
                rooms : Array.from( value.rooms ) ,
                ip : value.handshake.address ,
            })
        });

        return result
    }

    // ============ PRIVATE ============ //

    async get_sockets( socket_server : Server ) : Promise<RemoteSocket<Socket>[]>
    {
        return socket_server.fetchSockets()
    }

    async get_room_sockets( socket_server : Server , room : string ) : Promise<RemoteSocket<Socket>[]>
    {
        return socket_server.in(room).fetchSockets()
    }

    async find_socket( socket_server : Server ,socket_id : string ) : Promise<RemoteSocket<any>>
    {
        const sockets = await this.get_sockets( socket_server )

        const socket = sockets.find( item => item.id === socket_id )

        if( ! socket )
            return null

        return socket ;
    }

    async emit_socket(  socket_server : Server ,socket_id : string ,event : string ,payload : {}  ) : Promise<boolean>
    {
        const socket = await this.find_socket( socket_server ,socket_id )

        if( socket )
        {
            return socket.emit(event,payload)
        }

        return false
    }
}