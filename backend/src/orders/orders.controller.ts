import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { OrdersService } from './orders.service';

interface AuthenticatedRequest extends Request {
  userUid: string;
}

@UseGuards(AuthenticationGuard)
@Controller('v1/orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('placeTrade')
  placeOrder(@Res() request: AuthenticatedRequest) {
    return this.ordersService.placeOrder(request.userUid);
  }
}
