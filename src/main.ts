import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as dotenv from 'dotenv';
import { PrismaService } from './prisma/prisma.service';
import * as bcrypt from 'bcrypt';

dotenv.config();

async function createSuperUser(prisma: PrismaService) {
  const email = process.env.SUPER_USER_EMAIL;
  const password = process.env.SUPER_USER_PASSWORD;
  const name = process.env.SUPER_USER_NAME || 'Super User';
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!existingUser) {
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
        role: 'admin',
      },
    });
    console.log('Super user created:', user);
  } else {
    console.log('Super user already exists:', existingUser);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });

  const prismaService = app.get(PrismaService);
  await prismaService.$connect();

  await createSuperUser(prismaService);

  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}

bootstrap();
