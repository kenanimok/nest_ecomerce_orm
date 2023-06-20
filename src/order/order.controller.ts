// order.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { OrderDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async createOrder(@Body() orderDto: OrderDto): Promise<Order> {
    return this.orderService.createOrder(orderDto);
  }

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  async getOrderById(@Param('id') orderId: number): Promise<Order> {
    return this.orderService.getOrderById(orderId);
  }

  @Put(':id')
  async updateOrder(
    @Param('id') orderId: number,
    @Body() orderDto: OrderDto,
  ): Promise<Order> {
    return this.orderService.updateOrder(orderId, orderDto);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') orderId: number): Promise<void> {
    return this.orderService.deleteOrder(orderId);
  }
}
