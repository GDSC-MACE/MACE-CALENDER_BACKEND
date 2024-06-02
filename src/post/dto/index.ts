import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

/* eslint-disable prettier/prettier */
export class PostDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  date: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsOptional()
  contacts: {
    name: string;
    number: string;
  };
}
