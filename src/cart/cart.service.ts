import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartDto } from './dto/create-cart.dto';
import { Cart } from './entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>, // Add the userRepository
  ) {}

  async addToCart(
    userId: number,
    productId: number,
    quantity: number,
  ): Promise<Cart> {
    const user = await this.getUserById(userId);
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!user || !product) {
      throw new NotFoundException('User or product not found.');
    }

    const existingCart = await this.cartRepository.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });

    if (existingCart) {
      // Update the quantity if the product already exists in the cart
      existingCart.quantity += quantity;
      return this.cartRepository.save(existingCart);
    }

    const cart = new Cart();
    cart.user = user;
    cart.product = product;
    cart.quantity = quantity;

    console.log('cart===>', cart);

    return this.cartRepository.save(cart);
  }

  async updateCart(cartId: number, quantity: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ where: { id: cartId } });

    if (!cart) {
      throw new NotFoundException('Cart not found.');
    }

    cart.quantity = quantity;

    return this.cartRepository.save(cart);
  }

  async removeCartItem(cartId: number): Promise<void> {
    await this.cartRepository.delete(cartId);
  }

  async getUserCart(userId: number): Promise<Cart[]> {
    const user = await this.getUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return this.cartRepository.find({ where: { user: { id: userId } } });
  }

  private async getUserById(userId: number): Promise<User> {
    return this.userRepository.findOne({ where: { id: userId } });
  }
  async getAllcart(): Promise<Cart[]> {
    return this.cartRepository.find();
  }
}
