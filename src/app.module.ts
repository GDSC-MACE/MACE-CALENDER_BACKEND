import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
<<<<<<< HEAD
  imports: [AuthModule,  ConfigModule.forRoot({
    isGlobal: true, 
    envFilePath: '.env', 
  }), UserModule,],
=======
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
>>>>>>> c92dc150572f4e480ab64c09e655f5e69642b627
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
