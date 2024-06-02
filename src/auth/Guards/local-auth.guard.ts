import { AuthGuard } from "@nestjs/passport";
import { Injectable,ExecutionContext} from "@nestjs/common";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local')
{  
    async canActivate(context: ExecutionContext) {
       console.log('in guard')
        const result = (await super.canActivate(context)) as boolean;
        console.log('guard done')
        const request = context.switchToHttp().getRequest();
      
        await super.logIn(request);
        return result;
      }
}
