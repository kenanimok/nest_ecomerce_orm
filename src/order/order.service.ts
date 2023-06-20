// order.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
// import { Order } from './order.entity';
// import { OrderDto } from './order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async createOrder(orderDto: OrderDto): Promise<Order> {
    const order = this.orderRepository.create(orderDto);
    return this.orderRepository.save(order);
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
