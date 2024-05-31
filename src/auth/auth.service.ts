import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userservice:UserService){}
    async validateuser(email:string,password:string)
    {
        const user=await this.userservice.fetchuser(email)
        console.log(`password is ${password}`)
        console.log(` user password is ${user.password}`)
        if(user.password == password)
        {
            console.log('hi')
            const {password,...rest}=user
            return rest
        }
       console.log('hello')
    }
}
