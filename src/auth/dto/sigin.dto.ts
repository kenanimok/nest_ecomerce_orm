import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ default: 'adminken2' })
  username: string;

  @ApiProperty({ default: '12345678' })
  password: string;
}
