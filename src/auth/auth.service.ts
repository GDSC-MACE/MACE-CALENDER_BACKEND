/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userservice: UserService) {}
  async validateUser(username: string, password: string) {
    const user = await this.userservice.fetchuser(username);
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const { password, ...rest } = user;
      return rest;
    }
  }
}
