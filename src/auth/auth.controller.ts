import {
  Controller,
  Get,
  UseGuards,
  Post,
  Request,
  Session,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from './Guards/authenticated.guard';
import { LocalAuthGuard } from './Guards/local-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return { message: 'login success!!!!', user: req.user };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('logout')
  logout(@Session() session: Record<string, any>, @Res() res: Response) {
    console.log(session.id);
    session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error' });
      }
      res.clearCookie('connect.sid');
      return res.status(200).json({ message: 'User logged out' });
    });
  }
}
