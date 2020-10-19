import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}
  async get(id: number): Promise<Role> {
    if (!id) {
      throw new BadRequestException('Id es necesario');
    }
    const role: Role = await this._roleRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });
    if (!role) {
      throw new NotFoundException('Usuario no existe');
    }
    // retorno el usuario con el formato que defino en roleDto
    return role;
  }

  async getAll(): Promise<Role[]> {
    const roles: Role[] = await this._roleRepository.find({
      where: { status: 'ACTIVE' },
    });
    // retorno los usuarios mapeado
    return roles;
  }

  async create(role: Role): Promise<Role> {
    const savedRole = await this._roleRepository.save(role);
    return savedRole;
  }

  async update(id: number, role: Role): Promise<void> {
    await this._roleRepository.update(id, role);
    // return this._mapperService.map<Role, RoleDto>(updateRole, new RoleDto());
  }

  async delete(id: number): Promise<void> {
    const roleExists = await this._roleRepository.findOne(id, { where: { status: 'ACTIVE' } });
    if (!roleExists) {
      throw new NotFoundException('Usuario no existe');
    }

    await this._roleRepository.update(id, { status: 'INACTIVE' });
  }
}
