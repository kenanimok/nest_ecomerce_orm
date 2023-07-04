import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto } from './dto/create-cart.dto';
import { ApiTags } from '@nestjs/swagger';
import { Cart } from './entities/cart.entity';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addToCart(@Body() cartDto: CartDto) {
    try {
      const { userId, productId, quantity } = cartDto;
      const cart = await this.cartService.addToCart(
        userId,
        productId,
        quantity,
      );
      return { message: 'Product added to cart successfully', cart };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Put(':cartId/update')
  async updateCart(@Param('cartId') cartId: number, @Body() cartDto: CartDto) {
    try {
      const cart = await this.cartService.updateCart(cartId, cartDto.quantity);
      return { message: 'Cart updated successfully', cart };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':cartId/remove')
  async removeCartItem(@Param('cartId') cartId: number) {
    try {
      await this.cartService.removeCartItem(cartId);
      return { message: 'Cart item removed successfully' };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':userId')
  async getUserCart(@Param('userId') userId: number) {
    try {
      const cart = await this.cartService.getUserCart(userId);
      return { cart };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get()
  async getAllCarts(): Promise<Cart[]> {
    return this.cartService.getAllCarts();
  }
}
