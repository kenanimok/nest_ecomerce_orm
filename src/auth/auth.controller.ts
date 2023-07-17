// import { Controller } from '@nestjs/common';

// @Controller('auth')
// export class AuthController {}

import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local/local-auth.guards';
// import { JwtAuthGuard } from './jwt/jwt-auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Request() req: any): Promise<any> {
    return req.user;
    // return this.authService.signIn(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req: any) {
  //     return req.user
  // }
}
