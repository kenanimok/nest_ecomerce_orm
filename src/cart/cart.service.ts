// cart.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartDto } from './dto/create-cart.dto';
import { Cart } from './entities/cart.entity';
// import { Cart } from './cart.entity';
// import { CartDto } from './cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async createCart(cartDto: CartDto): Promise<Cart> {
    const cart = this.cartRepository.create(cartDto);
    return this.cartRepository.save(cart);
  }

  async getAllCarts(): Promise<Cart[]> {
    return this.cartRepository.find();
  }

  async getCartById(cartId: number): Promise<Cart> {
    return this.cartRepository.findOne({ where: { id: cartId } });
  }

  async updateCart(cartId: number, cartDto: CartDto): Promise<Cart> {
    await this.cartRepository.update(cartId, cartDto);
    return this.getCartById(cartId);
  }

  async deleteCart(cartId: number): Promise<void> {
    await this.cartRepository.delete(cartId);
  }
}
