import { Repository, EntityRepository, getConnection } from 'typeorm';
import { User } from '../user/user.entity';
import { SignupDto } from './dto';
import { RoleRepository } from '../role/role.repository';
import { Role } from '../role/role.entity';
import { RoleType } from '../role/roletype.enum';
import { UserDetails } from '../user/user.details.entity';
import { genSalt, hash } from 'bcryptjs';

// recordemos que repository es la clase que nos ayuda acceder a nuestra bd
@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signup(signupDto: SignupDto):Promise<void> {
    // desestructuracion de objeto de  javascritp
    const { username, email, password } = signupDto;

    const user = new User();
    user.username = username;
    user.email = email;
    // creamos una instancia del rol..
    const roleRepository: RoleRepository = await getConnection().getRepository(Role);
    // obtenemos un role general..
    const defaultRole: Role = await roleRepository.findOne({ where: { name: RoleType.GENERAL } });
    // le asignamo un rol por defecto.
    user.roles = [defaultRole];

    const details = new UserDetails();
    user.details = details;

    // Salt es un nro d digitos aleatoriios q se le agrega al hash
    // ya sea al principio o final haciendo mas dificil el decodificarlos.
    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    user.save();
  }
}
