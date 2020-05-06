import { IsString, MaxLength } from "class-validator";

export class UpdateRoleDto {
  // IsString: valida dicha informacion q le estamos pasando name sea un string de lo contrario 
  // activa middeleware d nestjs
  @IsString() 
  @MaxLength(50, { message: 'El nombre no es valido'}) // el campo va a tener un limite
  readonly name: string;
  
  @IsString() 
  @MaxLength(100, { message: 'La descripcion no es valido'}) // el campo va a tener un limite
  readonly description: string;

}