import { IsEmail, IsNotEmpty } from 'class-validator';

/* eslint-disable prettier/prettier */
export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  password:string;

  @IsNotEmpty()
  name:string;
}
