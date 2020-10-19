import { IsNotEmpty, IsString } from 'class-validator';
// estos dto se lo va a utilizar para el login..el tema de que no usa etidad user
// es simplemnte porque hay campos que no necesitamos
export class SigninDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
