import { IsNumber, IsString } from 'class-validator';

export class OrdersDto {
  @IsNumber()
  eventId: number;

  @IsString()
  side: string;

  @IsNumber()
  price: number;

  @IsNumber()
  amount: number;
}
