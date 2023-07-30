import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  // imports: [TypeOrmModule.forFeature([Product], )],
  imports: [TypeOrmModule.forFeature([Product]), AuthModule],

  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
