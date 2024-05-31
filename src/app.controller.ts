import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { Body,Post,UseGuards,Request } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

   @UseGuards(LocalAuthGuard)
 
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
