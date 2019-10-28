import { AuthService } from './auth.service';
import { Controller, UseGuards, Post, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './decorator/current-user.decorator';
import { LoginEntryPoint } from './decorator/login-entry-point.decorator';

@Controller()
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @LoginEntryPoint()
  @UseGuards(AuthGuard('login'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/refresh')
  async refresh(@Request() req) {
    const token = req.headers.authorization.replace('Bearer ', '');
    return this.authService.refresh(token);
  }

  @Get('profile')
  getProfile(@Request() req, @CurrentUser() user) {
    console.log(user);
    return req.user;
  }
}
