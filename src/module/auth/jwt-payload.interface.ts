import { RoleType } from '../role/roletype.enum';

export interface IJwtPayload {
  id: number;
  username: string;
  email: string;
  roles: RoleType[];
  ait?: Date; // fecha de expiracion..es opcional.
}
