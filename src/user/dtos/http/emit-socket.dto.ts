import { IsNumber, IsObject, IsString } from "class-validator";

export class EmitSocketDto {

  @IsNumber()
  socket_id : string
  
  @IsString()
  event : string
  
  @IsObject()
  payload : object


}