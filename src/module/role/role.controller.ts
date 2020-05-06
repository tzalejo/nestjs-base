import { Controller, Get, Param, Body, Post, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';

@Controller('roles')
export class RoleController {
  constructor(
    private readonly _roleService: RoleService​​
  ){}
  // ParseIntPipe es para parsear el valor que viene como un objeto= {id:'1'}
  // este comportamiento es normal de nodejs, si se quiere parsear los params a un tipo
  // number se debe crear un middleware. En nest esto se resuelve con un pipe: ParseIntPipe
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    const role = await this._roleService.get(id);
    return role;
  }

  @Get()
  async getUsers(): Promise<Role[]> {
    const users = await this._roleService.getAll();
    return users;
  }

  @Post('create')
  async createUser(@Body() role: Role): Promise<Role> {
    const createUser = await this._roleService.create(role);
    return createUser;
  }

  @Patch(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() role: Role): Promise<any> {
    await this._roleService.update(id, role);
    return true;
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this._roleService.delete(id);
    return true;
  }
}
