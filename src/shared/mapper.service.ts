import { Injectable } from '@nestjs/common';
import { TypeMapper } from 'ts-mapper'; // Para convertir un objeto de un tipo a otro tipo
import { User } from 'src/module/user/user.entity';
import { UserDto } from 'src/module/user/dto/user.dto';

@Injectable()
export class MapperService extends  TypeMapper {
  constructor() {
    // llamando explicitamente al constructor de la clase TypeMapper
    super();
    this.config(); 
  }

  private config(): void {
    // queremos maper(convertir en este caso) el objeto User a un UserDto
    this.createMap<User, UserDto>()
        .map(entity => entity.id, dto => dto.id)
        .map(entity => entity.username, dto => dto.username)
        .map(entity => entity.email, dto => dto.email)
        .map(entity => entity.details, dto => dto.details)
        .map(entity => entity.roles, dto => dto.roles)
      }
}