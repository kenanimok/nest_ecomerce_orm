import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from './dto/signup.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

// import { UserRepository } from './user.repository';
//// private userRepository: UserRepository,

// private userRepository: Repository<User>,

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async signUp(signupUpDto: SignUpDto): Promise<User> {
    console.log('signupUpDto==>', signupUpDto);
    try {
      const { username, password } = signupUpDto;

      const hashedPassword = await bcrypt.hashSync(password, 10);

      const user = this.userRepository.create({
        username,
        password: hashedPassword,
      });

      console.log('user===>', user);
      return await this.userRepository.save(user);
    } catch (e) {
      console.log('eeeeeee', e);
      throw new ConflictException({
        message: ['Username has been already using.'],
      });
    }
  }

  async findOneUser(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { username } });
    return user;
  }
}
