import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductListDto } from './dtos/productList.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productEntity: Repository<ProductEntity>,
  ) {}

  /**
   * 상품 리스트 가져오기
   * @returns ProductListDto[]
   */
  async getList() {
    // [x] 모든 상품 가져오기
    const products = await this.productEntity.find();
    return products.map((product) => new ProductListDto(product));
  }
}
