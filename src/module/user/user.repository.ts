import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';

// Este decorador va a indicar q nuestro usuario va a ser una entidad DB
// por tanto va proveer de todo los metodos necesarios.
@EntityRepository(User)
export class UserRepository extends Repository<User> {}
