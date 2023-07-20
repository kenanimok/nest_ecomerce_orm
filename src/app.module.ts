// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { UserModule } from './user/user.module';
// import { UserRepository } from './user/user.repository';
// @Module({
//   imports: [
//     ConfigModule.forRoot(), // Load environment variables
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule, UserModule],
//       useFactory: async (configService: ConfigService) => ({
//         type: 'mysql',
//         host: configService.get('DB_HOST'),
//         port: +configService.get('DB_PORT'),
//         username: configService.get('DB_USERNAME'),
//         password: configService.get('DB_PASSWORD'),
//         database: configService.get('DB_DATABASE'),
//         entities: [__dirname + '/**/*.entity{.ts,.js}'],
//         synchronize: true, // Auto-create database tables (use carefully in production)
//       }),
//       inject: [ConfigService],
//     }),
//   ],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Auto-create database tables (use carefully in production)
      }),
      inject: [ConfigService],
    }),

    UserModule,

    AuthModule, // Import the UserModule here
  ],
})
export class AppModule {}
