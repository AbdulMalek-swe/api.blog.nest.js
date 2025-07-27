import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  @Post('register')
  async register(@Req() req, @Res() res, @Body() body) { 
    const auth = await this.authService.register(body);
    res.status(auth?.status).json(auth);
  }
  @Get('all/user')
  async findUser( @Res() res ) { 
    const user = await this.authService.findAllUser();
    res.status(user?.status).json(user);
  }
}
