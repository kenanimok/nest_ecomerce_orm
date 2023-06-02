// export class CreatePostDto {}

import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  //   @Column({
  //     nullable: false,
  //     default: () => 'CURRENT_TIMESTAMP',
  //   })
  //   createdOn: Date;

  //   @Column({
  //     nullable: false,
  //     default: () => 'CURRENT_TIMESTAMP',
  //   })
  //   modifieOn: Date;
  @ApiProperty()
  mainImageUrl: string;
}
