import { SetMetadata } from '@nestjs/common';
//bhjhbj
export const ROLES_KEY = 'roles';
export const Roles = (...roles) => SetMetadata(ROLES_KEY, roles);
