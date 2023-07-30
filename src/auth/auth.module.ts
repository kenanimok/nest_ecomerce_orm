// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { UserModule } from '../user/user.module';
// import { UserService } from '../user/user.service';
// import { LocalStrategy } from './local/local.strategy';
// import { AuthController } from './auth.controller';
// import { PassportModule } from '@nestjs/passport';

// @Module({
//   imports: [UserModule, PassportModule],
//   providers: [AuthService, LocalStrategy, UserService],
//   controllers: [AuthController],
// })
// export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        ``;
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '2 days' },
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],

  controllers: [AuthController],
})
export class AuthModule {}
