import { IsNumber, IsObject, IsString } from "class-validator";

export class EmitUserDto {

  @IsNumber()
  user_id : number
  
  @IsString()
  event : string
  
  @IsObject()
  payload : object


}