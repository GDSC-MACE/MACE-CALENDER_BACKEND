import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async fetchuser(email: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (user) return user;
      else throw new HttpException('no user found', HttpStatus.I_AM_A_TEAPOT);
    } catch (error) {
      throw new HttpException(error, HttpStatus.I_AM_A_TEAPOT);
    }
  }

  async signup(dto: UserDto) {
    const hash = await bcrypt.hash(
      dto.password,
      Number(process.env.BCRYPT_SALT_ROUNDS),
    );
    try {
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.username,
          password: hash,
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException(
            'user already exists',
            HttpStatus.NOT_ACCEPTABLE,
          );
        }
      }
    }
  }

  async fetchUsers() {
    try {
      const users = await this.prisma.user.findMany();
      users.forEach((user) => delete user.password);
      return users;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
