import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
