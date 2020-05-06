import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';
import { Role } from './role.entity';
import { plainToClass } from 'class-transformer';
import { ReadRoleDto, CreateRoleDto, UpdateRoleDto } from './dto';
import { status } from './../../shared/entity-status.num';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ){}
  async get(id: number): Promise<ReadRoleDto>{
    if(!id) {
      throw new BadRequestException('Id es necesario');
    }
    const role: Role = await this._roleRepository.findOne(id, {
      where: { status: status.ACTIVE},
    });
    if (!role) {
      throw new NotFoundException('Usuario no existe');
    }
    // retorno el usuario con el formato que defino en dto
    // osea devuelve solo las propiedades que defini en ReadRoledto(dto)
    // hay un metodo q hace lo inverso a plainToClass
    return plainToClass(ReadRoleDto, role);
  }

  async getAll(): Promise<ReadRoleDto[]>{

    const roles: Role[] = await this._roleRepository.find( {
      where: { status: status.ACTIVE},
    });
    // retorno los usuarios mapeado
    return roles.map((role: Role)=> plainToClass(ReadRoleDto, role));
  }

  // Partial: para q los valores q vengan no necesariamente sean todo las propiedades de dto
  async create(role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    const savedRole = await this._roleRepository.save(role);
    return plainToClass(ReadRoleDto, savedRole);
  }

  async update(roleId: number, role: Partial<UpdateRoleDto>): Promise<ReadRoleDto>{
    // verifico q el role exista..
    const foundRole: Role = await this._roleRepository.findOne(roleId,{where: {status: status.ACTIVE}});
    // no exite, devuelvo error
    if (!foundRole) {
      throw new NotFoundException('El role no existe');
    }
    // actualizamos
    foundRole.name = role.name;
    foundRole.description = role.description;

    // salvamos el role
    const updateRole = await this._roleRepository.save(foundRole);

    // devolvemos las propiedad q definimos en dto
    return plainToClass(ReadRoleDto, updateRole);
  }

  async delete(id: number): Promise<void> {
    const roleExists = await this._roleRepository.findOne(id, {where: {status: status.ACTIVE}});
    if (!roleExists) {
      throw new NotFoundException('Usuario no existe');
    }

    await this._roleRepository.update(id, {status: status.INACTIVE});
  }
}
