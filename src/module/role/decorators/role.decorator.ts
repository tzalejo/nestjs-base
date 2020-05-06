import { SetMetadata } from "@nestjs/common"

// @Roles('rol1','rol2')
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

