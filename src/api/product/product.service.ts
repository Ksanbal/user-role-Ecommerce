import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from './dtos/product.dto';
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

  /**
   * 상품 상세정보 가져오기
   * @param id product id
   * @returns ProductDto
   */
  async getOne(id: number) {
    // [x] 모든 상품 가져오기
    const product = await this.productEntity.findOne({ where: { id } });
    if (!product) throw new NotFoundException('상품을 찾을 수 없습니다.');

    return new ProductDto(product);
  }
}
