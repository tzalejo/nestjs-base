import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.respository';
import { MapperService } from 'src/shared/mapper.service';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository​​,
    private readonly _mapperService: MapperService
  ){}
  async get(id: number): Promise<UserDto>{
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
    return this._mapperService.map<User,UserDto>(user, new UserDto());
  }

  async getAll(): Promise<UserDto[]>{

    const users: User[] = await this._userRepository.find( {
      where: { status: 'ACTIVE'},
    });
    // retorno los usuarios mapeado
    return this._mapperService.mapCollection<User,UserDto>(users, new UserDto());
  }


  async create(user: User): Promise<UserDto> {
    const savedUser = await this._userRepository.save(user);
    return this._mapperService.map<User, UserDto>(savedUser, new UserDto());
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
