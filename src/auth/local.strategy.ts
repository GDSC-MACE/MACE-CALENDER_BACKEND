import {Injectable,UnauthorizedException} from '@nestjs/common'
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from './auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy)
{
    constructor(private readonly authservice:AuthService){
        super() 
    }
    async validate(email:string,password:string):Promise<any>
    {
        console.log(`in local startegy ${email} ${password}`)
        const user=this.authservice.validateuser(email,password);
        if(!user)
        throw new UnauthorizedException()
        return user;
    }
}