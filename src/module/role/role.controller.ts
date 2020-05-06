import { Controller, Get, Param, Body, Post, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { ReadRoleDto, CreateRoleDto, UpdateRoleDto } from './dto';

@Controller('roles')
export class RoleController {
  constructor(
    private readonly _roleService: RoleService​​
  ){}
  // ParseIntPipe es para parsear el valor que viene como un objeto= {id:'1'}
  // este comportamiento es normal de nodejs, si se quiere parsear los params a un tipo
  // number se debe crear un middleware. En nest esto se resuelve con un pipe: ParseIntPipe
  @Get(':roleId')
  getUser(@Param('roleId', ParseIntPipe) roleId: number): Promise<ReadRoleDto​​> {
    return this._roleService.get(roleId);
  }

  @Get()
  getUsers(): Promise<ReadRoleDto[]> {
    return this._roleService.getAll();
  }

  @Post('create')
  createUser(@Body() role: Partial<CreateRoleDto​​>): Promise<ReadRoleDto> {
    return this._roleService.create(role);
  }

  @Patch(':roleId')
  updateUser(@Param('roleId', ParseIntPipe) roleId: number, @Body() role: Partial<UpdateRoleDto​​>) {
    return this._roleService.update(roleId, role);
  }

  @Delete(':roleId')
  deleteUser(@Param('roleId', ParseIntPipe) roleId: number) {
    return this._roleService.delete(roleId);
  }
}
