import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma:PrismaService){}
    async fetchuser(email:string)
    {
        try{
            const user=await this.prisma.user.findFirst({
                where:{
                    email
                }
            })
            return user
        }
        catch (error) {
            throw new HttpException(error,HttpStatus.I_AM_A_TEAPOT)
          }
    }
}
