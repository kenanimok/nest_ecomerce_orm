// order.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  productId: number;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  status: string;
}
