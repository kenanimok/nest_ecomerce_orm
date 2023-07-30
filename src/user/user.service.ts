import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';

// user.service.ts

// private userRepository: Repository<User>,

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async createUser(userDto: UserDto): Promise<User> {
    const user = this.userRepository.create(userDto);
    return this.userRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

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

  async signUp(userDto: UserDto): Promise<User> {
    try {
      const { username, password, email, address } = userDto;

      const hashedPassword = await bcrypt.hashSync(password, 10);

      const user = this.userRepository.create({
        username,
        password: hashedPassword,
        email,
        address,
      });

      return await this.userRepository.save(user);
    } catch (e) {
      throw new ConflictException({
        message: ['Username has been already using.'],
      });
    }
  }

  // async signIn(username: string, password: string): Promise<User> {
  //   const user = await this.userRepository.findOne({ where: { username } });
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   const passwordMatch = await bcrypt.compare(password, user.password);
  //   if (!passwordMatch) {
  //     throw new NotFoundException('Invalid password');
  //   }

  //   return user;
  // }

  async findOneUser(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { username } });
    return user;
  }
}
