// dto es una clase pero con la excepcion que va a contner la informacion 
// que nosotros necesitamos transmitir, osea, podemos indicar que campos transmitir y que no
// por ejemplo el password de user no queremos enviar
import { IsNotEmpty} from 'class-validator';
import { RoleType } from './../../role/roletype.enum';
import { UserDetails } from '../user.details.entity';

export class UserDto {
  // este id no puede ser vacio, para ello usamos isnotempty
  @IsNotEmpty()
  id: number;
  
  @IsNotEmpty()
  username: string;
  
  @IsNotEmpty()
  email: string;
  
  @IsNotEmpty()
  roles: RoleType​​[];
  
  @IsNotEmpty()
  details: UserDetails;
}