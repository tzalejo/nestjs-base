import { Exclude, Expose, Type } from "class-transformer";
import { IsString } from "class-validator";
import { ReadUserDto } from "./../../user/dto";

// para exponer el token y user..
@Exclude()
export class LoggedInDto {
  @Expose()
  @IsString()
  token: string;

  @Expose()
  @Type(() => ReadUserDto)
  user: ReadUserDto;

}