import { IsString } from "class-validator";

export class SyncPageDto {

  @IsString()
  page : string

}