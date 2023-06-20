import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/create-user.dto';

// user.service.ts

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userDto: UserDto): Promise<User> {
    const user = this.userRepository.create(userDto);
    return this.userRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  // async getUserById(userId: number): Promise<User> {
  //   return this.userRepository.findOne(userId);
  // }

  async getUserById(userId: number): Promise<User> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async updateUser(userId: number, userDto: UserDto): Promise<User> {
    await this.userRepository.update(userId, userDto);
    return this.getUserById(userId);
  }

  async deleteUser(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }
}
