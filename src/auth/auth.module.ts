import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
// import { UserRepository } from '../user/user.repository'; // Import UserRepository
import { LocalStrategy } from './local/local.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UserModule, PassportModule], // Import the UserModule
  providers: [AuthService, LocalStrategy, UserService], // Include UserRepository as a provider
  controllers: [AuthController],
})
export class AuthModule {}
