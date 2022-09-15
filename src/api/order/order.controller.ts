import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
import { CurrentUser } from '../auth/decorator/user.decorator';
import { JWTAuthGuard } from '../auth/guard/jwt.guard';
import { UserEntity } from '../user/entities/user.entity';
import { OrderApiDocs } from './docs/order.docs';
import { CreateOrderDto } from './dtos/createOrderBunch.dto';
import { EditOrderDto } from './dtos/editOrder.dto';
import { OrderService } from './order.service';

@ApiTags('주문')
@ApiBearerAuth('Access Token')
@ApiUnauthorizedResponse(CommonResponse.UnauthorizedException())
@UseGuards(JWTAuthGuard)
@Controller('api/order')
export class OrderController {
  constructor(private readonly orderSerivce: OrderService) {}

  /**
   * 주문하기
   * @param user
   * @param createOrderDto
   */
  @ApiOperation(OrderApiDocs.CreateOperation())
  @ApiCreatedResponse(CommonResponse.CreatedResponse())
  @ApiBadRequestResponse(CommonResponse.BadRequestException())
  @Post()
  async create(
    @CurrentUser() user: UserEntity,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return await this.orderSerivce.create(user, createOrderDto);
  }

  /**
   * 주문 내역
   * @param user
   */
  @ApiOperation(OrderApiDocs.GetListOperation())
  @ApiOkResponse(OrderApiDocs.GetListOkRes())
  @Get()
  async getList(@CurrentUser() user: UserEntity) {
    return await this.orderSerivce.getList(user);
  }

  /**
   * 주문 상세정보
   * @param id order_id
   * @param user
   */
  @ApiOperation(OrderApiDocs.GetOneOperation())
  @ApiOkResponse(OrderApiDocs.GetOneOkRes())
  @ApiNotFoundResponse(CommonResponse.NotFoundException())
  @Get(':id')
  async getOne(@Param('id') id: number, @CurrentUser() user: UserEntity) {
    return await this.orderSerivce.getOne(id, user);
  }

  /**
   * 주문 삭제
   * @param id order_id
   * @param user
   */
  @ApiOperation(OrderApiDocs.DeleteOperation())
  @ApiOkResponse(CommonResponse.OkResponse())
  @ApiNotFoundResponse(CommonResponse.NotFoundException())
  @Delete(':id')
  async delete(@Param('id') id: number, @CurrentUser() user: UserEntity) {
    return await this.orderSerivce.delete(id, user);
  }

  /**
   * 주문 상태 변경
   * @param id order_id
   * @param user
   * @param editOrderDto
   */
  @ApiOperation(OrderApiDocs.EditStatusOperation())
  @ApiOkResponse(CommonResponse.OkResponse())
  @ApiForbiddenResponse(CommonResponse.ForbiddenException())
  @ApiNotFoundResponse(CommonResponse.NotFoundException())
  @Patch(':id/status')
  async edit(
    @Param('id') id: number,
    @CurrentUser() user: UserEntity,
    @Body() editOrderDto: EditOrderDto,
  ) {
    return await this.orderSerivce.statusEdit(id, user, editOrderDto);
  }
}
