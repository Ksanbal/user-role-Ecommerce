import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/createProduct.dto';
import { ProductDto } from './dtos/product.dto';
import { ProductListDto } from './dtos/productList.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  /**
   * 상품 등록하기
   * @param createProductDto
   * @returns ProductDto
   */
  async create(createProductDto: CreateProductDto) {
    // [x] 상품 생성하기
    const newProduct = await this.productRepository.create(createProductDto);
    const result = await newProduct.save();
    return new ProductDto(result);
  }

  /**
   * 상품 리스트 가져오기
   * @returns ProductListDto[]
   */
  async getList() {
    // [x] 모든 상품 가져오기
    const products = await this.productRepository.find();
    return products.map((product) => new ProductListDto(product));
  }

  /**
   * 상품 상세정보 가져오기
   * @param id product id
   * @returns ProductDto
   */
  async getOne(id: number) {
    // [x] 모든 상품 가져오기
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException('상품을 찾을 수 없습니다.');

    return new ProductDto(product);
  }
}
