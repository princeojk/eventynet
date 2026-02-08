import { IsEmail, IsString } from 'class-validator';

export class OrdersDto {
  @IsString()
  token: string;
}
