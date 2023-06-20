import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() productDto: ProductDto): Promise<Product> {
    return this.productService.createProduct(productDto);
  }

  @Get()
  async getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Get(':id')
  async getProductById(
    @Param('id', ParseIntPipe) productId: number,
  ): Promise<Product> {
    return this.productService.getProductById(productId);
  }

  @Put(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) productId: number,
    @Body() productDto: ProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(productId, productDto);
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id', ParseIntPipe) productId: number,
  ): Promise<void> {
    return this.productService.deleteProduct(productId);
  }
}
