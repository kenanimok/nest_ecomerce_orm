import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductDto } from './dto/create-product.dto';
// import { loadRelation } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createProduct(productDto: ProductDto): Promise<Product> {
    const product = this.productRepository.create(productDto);
    return this.productRepository.save(product);
  }

  async getProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  // async getProductById(productId: number): Promise<Product> {
  //   const product = await this.productRepository.findOne(productId);
  //   if (product) {
  //     await this.productRepository.loadRelation(product, 'category');
  //   }
  //   return product;
  // }

  async getProductById(productId: number): Promise<Product> {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.id = :productId', { productId })
      .getOne();

    return product;
  }

  async updateProduct(
    productId: number,
    productDto: ProductDto,
  ): Promise<Product> {
    await this.productRepository.update(productId, productDto);
    return this.getProductById(productId);
  }

  async deleteProduct(productId: number): Promise<void> {
    await this.productRepository.delete(productId);
  }
}
