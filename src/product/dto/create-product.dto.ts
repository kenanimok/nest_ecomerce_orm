import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  categoryId: number;
  @ApiProperty()
  quantity: number;
}
