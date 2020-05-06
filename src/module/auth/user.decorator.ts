// Decorador que nos ayuda a extraer la informacion de 
// nuestro usuario una vez que se haga un request
import { createParamDecorator } from "@nestjs/common";
import { UserDto } from "../user/dto/user.dto";

export const GetUser = createParamDecorator((data, req): UserDto​​ => {
  return req.user;
});

