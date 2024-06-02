/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { Req } from '@nestjs/common/decorators/http/route-params.decorator';
import { Roles } from 'src/auth/Decorators/roles.decorator';
import { AuthenticatedGuard } from 'src/auth/Guards/authenticated.guard';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { Role } from 'src/auth/roles.enum';
import { UserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('signup')
  signup(@Body() dto: UserDto, @Req() req) {
    return this.userService.signup(dto);
  }
}
