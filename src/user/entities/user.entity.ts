// user.entity.ts

import { Cart } from 'src/cart/entities/cart.entity';
import { Order } from 'src/order/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts?: Cart[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
