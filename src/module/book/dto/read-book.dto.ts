import { Expose, Exclude, Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { ReadUserDto } from "src/module/user/dto";

@Exclude()
export class ReadBookDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  readonly name: string;

  @Expose()
  @IsString()
  readonly description: string;
  
  @Expose()
  @Type(() => ReadUserDto)
  readonly authors: ReadUserDto[];
}