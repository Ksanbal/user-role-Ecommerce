import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CommonResponse } from '../../common/responses/common.response';
import { Staff } from '../auth/decorator/staff.decorator';
import { JWTAuthGuard } from '../auth/guard/jwt.guard';
import { ProductApiDocs } from './docs/product.docs';
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
  @ApiOperation(ProductApiDocs.CreateOperation())
  @ApiCreatedResponse(CommonResponse.CreatedResponse())
  @ApiBadRequestResponse(CommonResponse.BadRequestException())
  @ApiUnauthorizedResponse(CommonResponse.UnauthorizedException())
  @ApiForbiddenResponse(CommonResponse.ForbiddenException())
  @ApiBearerAuth('Access Token')
  @Staff(true)
  @UseGuards(JWTAuthGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  /**
   * 상품 리스트 가져오기
   */
  @ApiOperation(ProductApiDocs.GetListOperation())
  @ApiOkResponse(ProductApiDocs.GetListOkRes())
  @Get()
  async getList() {
    return await this.productService.getList();
  }

  /**
   * 상품 상세정보 가져오기
   * @param id product_id
   */
  @ApiOperation(ProductApiDocs.GetOneOperation())
  @ApiOkResponse(ProductApiDocs.GetOneOkRes())
  @ApiNotFoundResponse(CommonResponse.NotFoundException())
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.getOne(id);
  }

  /**
   * 상품 수정
   * @param id product_id
   * @param createProductDto
   */
  @ApiOperation(ProductApiDocs.EditOperation())
  @ApiBadRequestResponse(CommonResponse.BadRequestException())
  @ApiUnauthorizedResponse(CommonResponse.UnauthorizedException())
  @ApiForbiddenResponse(CommonResponse.ForbiddenException())
  @ApiNotFoundResponse(CommonResponse.NotFoundException())
  @ApiBearerAuth('Access Token')
  @Staff(true)
  @UseGuards(JWTAuthGuard)
  @Put(':id')
  async edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() createProductDto: CreateProductDto,
  ) {
    return await this.productService.edit(id, createProductDto);
  }

  /**
   * 상품 삭제
   * @param id product_id
   */
  @ApiOperation(ProductApiDocs.DeleteOperation())
  @ApiOkResponse(CommonResponse.OkResponse())
  @ApiUnauthorizedResponse(CommonResponse.UnauthorizedException())
  @ApiForbiddenResponse(CommonResponse.ForbiddenException())
  @ApiNotFoundResponse(CommonResponse.NotFoundException())
  @ApiBearerAuth('Access Token')
  @Staff(true)
  @UseGuards(JWTAuthGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.delete(id);
  }
}
