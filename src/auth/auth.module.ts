import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './passport/local.strategy';
import { SessionSerializer } from './passport/session.serializer';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UserModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
