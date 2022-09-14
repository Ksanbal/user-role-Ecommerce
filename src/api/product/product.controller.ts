import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from '../auth/guard/jwt.guard';
import { CreateProductDto } from './dtos/createProduct.dto';
import { ProductService } from './product.service';

@ApiTags('상품')
@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * 상품 생성
   * @param createProductDto
   */
  @ApiBearerAuth('Access Token')
  @UseGuards(JWTAuthGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  /**
   * 상품 리스트 가져오기
   */
  @Get()
  async getList() {
    return await this.productService.getList();
  }

  /**
   * 상품 상세정보 가져오기
   * @param id product_id
   */
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.getOne(id);
  }

  /**
   * 상품 수정
   * @param id product_id
   * @param createProductDto
   */
  @ApiBearerAuth('Access Token')
  @UseGuards(JWTAuthGuard)
  @Put(':id')
  async edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() createProductDto: CreateProductDto,
  ) {
    return await this.productService.edit(id, createProductDto);
  }
}
