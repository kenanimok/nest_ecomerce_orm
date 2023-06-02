import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  //   @Column()
  //   slug: string;

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdOn: Date;

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  modifieOn: Date;

  @Column()
  mainImageUrl: string;
}
