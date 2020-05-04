import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UserDetails } from './user.details.entity';
import { getConnection } from 'typeorm';
import { Role } from '../role/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository​​,
  ){}
  async get(id: number): Promise<User>{
    if(!id) {
      throw new BadRequestException('Id es necesario');
    }
    const user: User = await this._userRepository.findOne(id, {
      where: { status: 'ACTIVE'},
    });
    if (!user) {
      throw new NotFoundException('Usuario no existe');
    }
    // retorno el usuario con el formato que defino en userDto
    return user;
  }

  async getAll(): Promise<User[]>{

    const users: User[] = await this._userRepository.find( {
      where: { status: 'ACTIVE'},
    });
    // retorno los usuarios mapeado
    return users;
  }


  async create(user: User): Promise<User> {
    const details = new UserDetails();
    user.details = details;
    const repo = await getConnection().getRepository(Role);
    const defaulRole = await repo.findOne({ where: {name: 'GENERAL'}});
    user.roles =[defaulRole]; 
    const savedUser = await this._userRepository.save(user);
    return savedUser;
  }

  async update(id: number, user: User): Promise<void>{
    await this._userRepository.update(id, user);
    // return this._mapperService.map<User, UserDto>(updateUser, new UserDto());
  }

  async delete(id: number): Promise<void> {
    const userExists = await this._userRepository.findOne(id, {where: {status: 'ACTIVE'}});
    if (!userExists) {
      throw new NotFoundException('Usuario no existe');
    }

    await this._userRepository.update(id, {status: 'INACTIVE'});
  }
}
