import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CategoryDto } from './dto/create-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() categoryDto: CategoryDto): Promise<Category> {
    return this.categoryService.createCategory(categoryDto);
  }

  @Get()
  async getCategories(): Promise<Category[]> {
    return this.categoryService.getCategories();
  }

  @Get(':id')
  async getCategoryById(
    @Param('id', ParseIntPipe) categoryId: number,
  ): Promise<Category> {
    return this.categoryService.getCategoryById(categoryId);
  }

  @Put(':id')
  async updateCategory(
    @Param('id', ParseIntPipe) categoryId: number,
    @Body() categoryDto: CategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategory(categoryId, categoryDto);
  }

  @Delete(':id')
  async deleteCategory(
    @Param('id', ParseIntPipe) categoryId: number,
  ): Promise<void> {
    return this.categoryService.deleteCategory(categoryId);
  }
}
