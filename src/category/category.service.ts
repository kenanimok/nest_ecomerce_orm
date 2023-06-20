import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(categoryDto: CategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(categoryDto);
    return this.categoryRepository.save(category);
  }

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  // async getCategoryById(categoryId: number): Promise<Category> {
  //   return this.categoryRepository.findOne(categoryId, {
  //     relations: ['products'],
  //   });
  // }

  async getCategoryById(categoryId: number): Promise<Category> {
    const category = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.products', 'products')
      .where('category.id = :categoryId', { categoryId })
      .getOne();

    return category;
  }

  async updateCategory(
    categoryId: number,
    categoryDto: CategoryDto,
  ): Promise<Category> {
    await this.categoryRepository.update(categoryId, categoryDto);
    return this.getCategoryById(categoryId);
  }

  async deleteCategory(categoryId: number): Promise<void> {
    await this.categoryRepository.delete(categoryId);
  }
}
