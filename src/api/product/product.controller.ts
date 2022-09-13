import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';

@ApiTags('상품')
@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * 상품 리스트 가져오기
   */
  @Get()
  async getList() {
    return await this.productService.getList();
  }

  /**
   * 상품 상세정보 가져오기
   * @param id
   */
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.getOne(id);
  }
}
