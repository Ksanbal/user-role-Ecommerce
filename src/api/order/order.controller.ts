import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
}
