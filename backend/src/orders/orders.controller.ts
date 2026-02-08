import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { OrdersService } from './orders.service';
import { OrdersDto } from './dto';

interface AuthenticatedRequest extends Request {
  userUid: string;
}

@Controller('v1/orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(AuthenticationGuard)
  @Post('placeOrder')
  async placeOrder(
    @Body() body: OrdersDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return await this.ordersService.placeOrder(request.userUid, body);
  }
}
