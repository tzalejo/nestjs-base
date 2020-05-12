// Decorador que nos ayuda a extraer la informacion de 
// nuestro usuario una vez que se haga un request
import { createParamDecorator } from "@nestjs/common";

export const GetUser = createParamDecorator((key, req) => key ? req.user[key]: req.user );

