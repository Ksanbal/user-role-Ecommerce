import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from '../auth/guard/jwt.guard';
import { ProductService } from './product.service';

@ApiTags('상품')
@ApiBearerAuth('Access Token')
@UseGuards(JWTAuthGuard)
@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * 상품 리스트 가져오기
   * @returns json
   */
  @Get()
  async getList() {
    return await this.productService.getList();
  }
}
