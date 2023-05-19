import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Max,
  Min,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString({ message: 'name must be a user_name' })
  @MaxLength(255)
  @MinLength(3)
  @ApiProperty()
  user_name: string;

  @IsNotEmpty()
  @IsString({ message: 'name must be a password' })
  @MaxLength(255)
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @ApiProperty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, and one digit',
  })
  user_password: string;
}
