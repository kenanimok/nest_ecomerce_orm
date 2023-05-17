import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDTO } from '../../src/dto/product.dto';

@Injectable()
export class ProductService {
  private products: ProductDTO[] = [
    { name: 'mango', id: 1, price: 250 },
    { name: 'apple', id: 2, price: 999 },
    { name: 'xxx', id: 3, price: 555 },
  ];

  // findAll():ProductDTO[]{
  // return [
  //     {name:"mango",id:1,price:250}
  //    ]
  // }

  findAll(): ProductDTO[] {
    return this.products;
  }

  findById(id: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException('Could not find product!');
    }

    return product;
  }

  findByCondition(predicate: (product: ProductDTO) => boolean) {
    return this.products.filter((item) => predicate(item));
  }
}
