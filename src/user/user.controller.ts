import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto } from '../auth/dto/sigin.dto';

// user.controller.ts
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userDto: UserDto): Promise<User> {
    return this.userService.createUser(userDto);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) userId: number): Promise<User> {
    return this.userService.getUserById(userId);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() userDto: UserDto,
  ): Promise<User> {
    return this.userService.updateUser(userId, userDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) userId: number): Promise<void> {
    return this.userService.deleteUser(userId);
  }

  @Post('/sigup')
  async Sigups(@Body() userDto: UserDto): Promise<User> {
    return this.userService.signUp(userDto);
  }
}
