// import { Controller } from '@nestjs/common';

// @Controller('auth')
// export class AuthController {}

import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local/local-auth.guards';
import { SignInDto } from 'src/auth/dto/sigin.dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('login')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  // @Post('signin')
  // async signIn(@Request() req: any): Promise<any> {
  //   return req.user;
  // }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Body() sigInDto: SignInDto): Promise<any> {
    return this.authService.signIn(sigInDto);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
