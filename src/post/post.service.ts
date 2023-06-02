import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

  async create(CreatePostDto: CreatePostDto) {
    return await this.repo.insert(CreatePostDto);
  }

  async findAll(): Promise<Post[]> {
    return await this.repo.find();
  }
  async findOne(id: number): Promise<Post | undefined> {
    const post: Post | undefined = await this.repo.findOne({ where: { id } });
    return post;
  }
}
