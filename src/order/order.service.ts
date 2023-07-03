// // order.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { OrderDto } from './dto/create-order.dto';
// import { Order } from './entities/order.entity';
// import { Cart } from 'src/cart/entities/cart.entity';

// @Injectable()
// export class OrderService {
//   constructor(
//     @InjectRepository(Order)
//     private orderRepository: Repository<Order>,
//   ) {}

//   async createOrder(orderDto: OrderDto): Promise<Order> {
//     const order = this.orderRepository.create(orderDto);
//     return this.orderRepository.save(order);
//   }

//   async getAllOrders(): Promise<Order[]> {
//     return this.orderRepository.find();
//   }

//   async getOrderById(orderId: number): Promise<Order> {
//     return this.orderRepository.findOne({ where: { id: orderId } });
//   }

//   async updateOrder(orderId: number, orderDto: OrderDto): Promise<Order> {
//     await this.orderRepository.update(orderId, orderDto);
//     return this.getOrderById(orderId);
//   }

//   async deleteOrder(orderId: number): Promise<void> {
//     await this.orderRepository.delete(orderId);
//   }
// }

// order.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async createOrder(orderDto: OrderDto): Promise<Order> {
    const order = this.orderRepository.create(orderDto);
    const savedOrder = await this.orderRepository.save(order);

    // Update product quantities
    const cartItems = await this.cartRepository.find({
      where: { user: savedOrder.user },
      relations: ['product'],
    });

    console.log('cartItems==>', cartItems);

    for (const cartItem of cartItems) {
      const product = cartItem.product;
      const quantityInCart = cartItem.quantity;
      if (product.quantity >= quantityInCart) {
        product.quantity -= quantityInCart;
        await this.productRepository.save(product);
      }
    }

    return savedOrder;
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async getOrderById(orderId: number): Promise<Order> {
    return this.orderRepository.findOne({ where: { id: orderId } });
  }

  async updateOrder(orderId: number, orderDto: OrderDto): Promise<Order> {
    await this.orderRepository.update(orderId, orderDto);
    return this.getOrderById(orderId);
  }

  async deleteOrder(orderId: number): Promise<void> {
    await this.orderRepository.delete(orderId);
  }
}
