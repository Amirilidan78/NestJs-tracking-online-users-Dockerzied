### Installation 
##### install docker 
##### create image located at /Dockerfile 
##### Run image 
 
### Api routes 
##### List online users : /user/users 
##### Emit to user : /user/emit-user 
##### Emit to socket : /user/emit-socket

### Socket channels 
##### Sync user data : `sync-user`
##### Sync user page : `sync-page`

### Important 
##### Socket client request header.auth.token must be preset and it value must maches /src/user/gateways/user.gateway.ts Line 29 
##### For accessing user api header.api-token must be preset and it value must maches /src/user/guards/api.guard.ts Line 12