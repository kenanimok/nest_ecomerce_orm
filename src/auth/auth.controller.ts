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
import { SignUpDto } from 'src/user/dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ke test
  //   @UseGuards(LocalAuthGuard)
  //   @Post('signin')
  //   async signIn(@Body() signUpDto: SignUpDto): Promise<any> {
  //     return signUpDto;
  //   }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Body() signUpDto: SignUpDto): Promise<any> {
    return this.authService.signIn(signUpDto);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req: any) {
  //     return req.user
  // }
}
