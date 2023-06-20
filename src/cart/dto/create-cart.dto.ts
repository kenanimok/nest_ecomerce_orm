// cart.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CartDto {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  productId: number;
  @ApiProperty()
  quantity: number;
}
