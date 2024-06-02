import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from './Guards/authenticated.guard';
import { LocalAuthGuard } from './Guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return { message: 'login success!!!!',user:req.user };
  }
}
