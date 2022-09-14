import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorator/user.decorator';
import { JWTAuthGuard } from '../auth/guard/jwt.guard';
import { UserEntity } from '../user/entities/user.entity';
import { CreateOrderDto } from './dtos/createOrderBunch.dto';
import { OrderService } from './order.service';

@ApiTags('주문')
@ApiBearerAuth('Access Token')
@UseGuards(JWTAuthGuard)
@Controller('api/order')
export class OrderController {
  constructor(private readonly orderSerivce: OrderService) {}

  /**
   * 주문하기
   * @param user
   * @param createOrderDto
   */
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
  @Get()
  async getList(@CurrentUser() user: UserEntity) {
    return await this.orderSerivce.getList(user);
  }

  /**
   * 주문 상세정보
   * @param id order_id
   * @param user
   */
  @Get(':id')
  async getOne(@Param('id') id: number, @CurrentUser() user: UserEntity) {
    return await this.orderSerivce.getOne(id, user);
  }
}
