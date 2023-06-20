// cart.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto } from './dto/create-cart.dto';
import { Cart } from './entities/cart.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('carts')
@Controller('carts')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  async createCart(@Body() cartDto: CartDto): Promise<Cart> {
    return this.cartService.createCart(cartDto);
  }

  @Get()
  async getAllCarts(): Promise<Cart[]> {
    return this.cartService.getAllCarts();
  }

  @Get(':id')
  async getCartById(@Param('id') cartId: number): Promise<Cart> {
    return this.cartService.getCartById(cartId);
  }

  @Put(':id')
  async updateCart(
    @Param('id') cartId: number,
    @Body() cartDto: CartDto,
  ): Promise<Cart> {
    return this.cartService.updateCart(cartId, cartDto);
  }

  @Delete(':id')
  async deleteCart(@Param('id') cartId: number): Promise<void> {
    return this.cartService.deleteCart(cartId);
  }
}
