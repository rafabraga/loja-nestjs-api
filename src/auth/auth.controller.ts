import { AuthService } from './auth.service';
import { Controller, UseGuards, Post, Request, Get, Req, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './decorator/current-user.decorator';
import { LoginEntryPoint } from './decorator/login-entry-point.decorator';
import { LoginAuthGuard } from './guard/login-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller()
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @LoginEntryPoint()
  @UseGuards(LoginAuthGuard, JwtAuthGuard)
  @Post('oauth/token')
  async loginSpringBoot(@Req() req, @Body() body) {
    return this.authService.loginSpringBoot(req.user);
  }

  @LoginEntryPoint()
  @UseGuards(AuthGuard('login'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req, @CurrentUser() user) {
    return req.user;
  }
}
