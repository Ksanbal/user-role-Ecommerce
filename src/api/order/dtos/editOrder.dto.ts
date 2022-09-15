import { ApiProperty, PickType } from '@nestjs/swagger';
import { OrderEntity } from '../entities/order.entity';
import { PayEntity } from '../entities/pay.entity';

class EditPayDto extends PickType(PayEntity, ['status']) {}

export class EditOrderDto extends PickType(OrderEntity, ['status']) {
  @ApiProperty({
    type: EditPayDto,
  })
  pay: EditPayDto;
}
