import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UserDetails } from './user.details.entity';
import { Role } from '../role/role.entity';
import { RoleRepository } from '../role/role.repository';
import { status } from './../../shared/entity-status.num';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}

  async get(id: number): Promise<User> {
    if (!id) {
      throw new BadRequestException('Id es necesario');
    }
    const user: User = await this._userRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });
    if (!user) {
      throw new NotFoundException('Usuario no existe');
    }
    // retorno el usuario con el formato que defino en userDto
    return user;
  }

  async getAll(): Promise<User[]> {
    const users: User[] = await this._userRepository.find({
      where: { status: status.ACTIVE },
    });
    // retorno los usuarios mapeado
    return users;
  }

  async create(user: User): Promise<User> {
    if (!user) {
      throw new BadRequestException('El usuario es requerido');
    }
    const details = new UserDetails();
    user.details = details;
    const repo = await getConnection().getRepository(Role);
    const defaulRole = await repo.findOne({ where: { name: status.GENERAL } });
    user.roles = [defaulRole];
    const savedUser = await this._userRepository.save(user);
    return savedUser;
  }

  async update(id: number, user: User): Promise<void> {
    await this._userRepository.update(id, user);
    // return this._mapperService.map<User, UserDto>(updateUser, new UserDto());
  }

  async delete(id: number): Promise<void> {
    const userExists = await this._userRepository.findOne(id, { where: { status: status.ACTIVE } });
    if (!userExists) {
      throw new NotFoundException('Usuario no existe');
    }

    await this._userRepository.update(id, { status: status.INACTIVE });
  }

  async setRoleToUser(userId: number, roleId: number): Promise<boolean> {
    const userExists = await this._userRepository.findOne(userId, {
      where: { status: status.ACTIVE },
    });
    if (!userExists) {
      throw new NotFoundException('Usuario no existe');
    }

    const roleExists = await this._roleRepository.findOne(roleId, {
      where: { status: status.ACTIVE },
    });
    if (!roleExists) {
      throw new NotFoundException('Role no existe');
    }
    userExists.roles.push(roleExists);
    await this._userRepository.save(userExists);
    return true;
  }
}
