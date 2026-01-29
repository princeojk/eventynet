import { IsEmail, IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  uid: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
