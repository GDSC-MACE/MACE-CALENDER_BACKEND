import {Injectable,CanActivate,ExecutionContext} from '@nestjs/common'
@Injectable()
export class AuthenticatedGuard implements CanActivate{
    async canActivate(context: ExecutionContext): Promise<boolean> {
      console.log('in guard 2')
        const request = context.switchToHttp().getRequest();
        return request.isAuthenticated;
      }
}