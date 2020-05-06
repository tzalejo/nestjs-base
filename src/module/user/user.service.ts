import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { RoleRepository } from '../role/role.repository';
import { status } from './../../shared/entity-status.num';
import { ReadUserDto, UpdateUserDto } from './dto';
import { plainToClass } from 'class-transformer';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository​​,
    @InjectRepository(RoleRepository​​)
    private readonly _roleRepository: RoleRepository​​,
  ){}
  async get(userId: number): Promise<ReadUserDto​​>{
    if(!userId) {
      throw new BadRequestException('Id es necesario');
    }
    const user: User = await this._userRepository.findOne(userId, {
      where: { status: status.ACTIVE},
    });
    if (!user) {
      throw new NotFoundException('Usuario no existe');
    }
    // retorno el usuario con el formato que defino en userDto
    return plainToClass(ReadUserDto, user);
  }

  async getAll(): Promise<ReadUserDto[]>{

    const users: User[] = await this._userRepository.find( {
      where: { status: status.ACTIVE},
    });
    // retorno los usuarios mapeado
    return users.map((user: User) => plainToClass(ReadUserDto, user));
  }


  async update(userId: number, user: UpdateUserDto​​): Promise<ReadUserDto>{
    // verifico q el role exista..
    const foundUser: User = await this._userRepository.findOne(userId, {where: {status: status.ACTIVE}});
    // no exite, devuelvo error
    if (!foundUser) {
      throw new NotFoundException('El usuario no existe');
    }
    // actualizo
    foundUser.username = user.username;
    // guardo
    const userUpdate = await this._userRepository.save(foundUser);

    return plainToClass(ReadUserDto, userUpdate);
  }

  async delete(id: number): Promise<void> {
    const userExists = await this._userRepository.findOne(id, {where: {status: status.ACTIVE}});
    if (!userExists) {
      throw new NotFoundException('Usuario no existe');
    }

    await this._userRepository.update(id, {status: status.INACTIVE});
  }

  async setRoleToUser(userId: number, roleId: number): Promise<boolean> {
    const userExists = await this._userRepository.findOne(userId, {where: {status: status.ACTIVE}});
    if (!userExists) {
      throw new NotFoundException('Usuario no existe');
    }

    const roleExists = await this._roleRepository.findOne(roleId, {where: {status: status.ACTIVE}});
    if (!roleExists) {
      throw new NotFoundException('Role no existe');
    }
    userExists.roles.push(roleExists);
    await this._userRepository.save(userExists);
    return true;
  }
}
