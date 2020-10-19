import { Repository, EntityRepository } from 'typeorm';
import { Role } from './role.entity';

// Este decorador va a indicar q nuestro usuario va a ser una entidad DB
// por tanto va proveer de todo los metodos necesarios.
@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {}
