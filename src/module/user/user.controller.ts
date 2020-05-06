import { Controller, Get, Param, Body, Post, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ReadUserDto, UpdateUserDto } from './dto';
// import { Roles } from '../role/decorators/role.decorator';
// import { RoleGuard } from '../role/guards/role.guard';
// import { RoleType } from '../role/roletype.enum';

@Controller('users')
export class UserController {
  constructor(
    private readonly _userService: UserService
  ){}
  // ParseIntPipe es para parsear el valor que viene como un objeto= {id:'1'}
  // este comportamiento es normal de nodejs, si se quiere parsear los params a un tipo
  // number se debe crear un middleware. En nest esto se resuelve con un pipe: ParseIntPipe
  @Get(':userId')
  // @Roles(RoleType​​.ADMINSTRATOR, 'AUTHOR')
  // @UseGuards(AuthGuard(), RoleGuard)
  getUser(@Param('userId', ParseIntPipe) userId: number): Promise<ReadUserDto​​> {
    return this._userService.get(userId);
   
  }
  @Get()
  // @Roles(RoleType​​.ADMINSTRATOR)
  // @UseGuards(AuthGuard())
  getUsers(): Promise<ReadUserDto[]> {
    return this._userService.getAll();
  }

  @Patch(':userId')
  updateUser(
    @Param('userId', ParseIntPipe) userId: number, 
    @Body() user: UpdateUserDto​​
  ) {
    return this._userService.update(userId, user);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this._userService.delete(id);
  }

  @Post('setRole/:userId/:roleId')
  setRoleToUser(
    @Param('userId', ParseIntPipe) userId: number, 
    @Param('roleId', ParseIntPipe) roleId: number 
  ): Promise<boolean> {
    return this._userService.setRoleToUser(userId, roleId);
  }
}
