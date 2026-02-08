import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

interface AuthenticatedRequest extends Request {
  userUid: string;
}

@UseGuards(AuthenticationGuard)
@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto, @Req() request: AuthenticatedRequest) {
    return this.authService.signup(dto, request.userUid);
  }

  @Post('signin')
  signin() {
    return this.authService.login();
  }
}
