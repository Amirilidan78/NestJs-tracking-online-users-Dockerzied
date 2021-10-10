import { IsObject } from 'class-validator';

export class SyncUserDto {

  @IsObject()
  user : object

}