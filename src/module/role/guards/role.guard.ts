import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    // conseguimos los roles..ya que lo seteamos con el decorador..ya q estan en el contexto..
    // En el decorador usamos el key 'roles' para obtener los roles..
    const roles: string[] = this._reflector.get<string[]>('roles', context.getHandler());

    // si hay recursos q no necesitan roles retornamos true
    if (!roles) {
      return true;
    }

    // Si hay roles..
    // interceptamos el request q se esta enviando para obtener el usuario
    // tenemos saber tmb q ese request debe estar autenticado

    // swittohttp para obtener el request
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    // vamos a comprobar que tenga el rol que le especifico en el array
    const hasRole = () => user.roles.some((role: string) => roles.includes(role)); // includes devuelve un boolean si el role se encuentra en roles

    return user && user.roles && hasRole();
  }
}
