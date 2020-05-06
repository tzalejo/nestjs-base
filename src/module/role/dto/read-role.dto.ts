import { IsString, MaxLength, IsNumber } from "class-validator";
import { Exclude, Expose } from 'class-transformer';

@Exclude() // para exponer la informacion al exterior utlizaremos el decorador
export class ReadRoleDto {
  @Expose() // nos muestra dichas propiedad al exterior
  @IsNumber()
  readonly id: number;

  @Expose() // nos muestra dichas propiedad al exterior
  @IsString() // IsString: valida dicha informacion q le estamos pasando name sea un string de lo contrario activa middeleware d nestjs
  @MaxLength(50, { message: 'El nombre no es valido'}) // el campo va a tener un limite
  readonly name: string;
  
  @Expose() // nos muestra dichas propiedad al exterior
  @IsString() 
  @MaxLength(100, { message: 'La descripcion no es valido'}) // el campo va a tener un limite
  readonly description: string;

}