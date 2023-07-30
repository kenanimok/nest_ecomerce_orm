// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { UserModule } from './user/user.module';
// import { ProductModule } from './product/product.module';
// import { CategoryModule } from './category/category.module';
// import { AuthModule } from './auth/auth.module';
// import { CartModule } from './cart/cart.module';
// import { OrderModule } from './order/order.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot(), // Load environment variables
//     TypeOrmModule.forRootAsync({
//       imports: [
//         ConfigModule,
//         UserModule,
//         CategoryModule,
//         ProductModule,
//         CartModule,
//         OrderModule,
//       ],
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
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';

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
    UserModule,
    CategoryModule,
    ProductModule,
    CartModule,
    OrderModule,
    AuthModule,
  ],
})
export class AppModule {}
