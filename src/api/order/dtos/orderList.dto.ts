import { PickType } from '@nestjs/swagger';
import { OrderEntity } from '../entities/order.entity';
import { PayDto } from './order.dto';

export class OrderListDto extends PickType(OrderEntity, [
  'id',
  'orderPrice',
  'deliveryFee',
  'status',
]) {
  // 결제
  pay: PayDto;

  constructor(order: OrderEntity, pay: PayDto) {
    super();
    this.id = order.id;
    this.orderPrice = order.orderPrice;
    this.deliveryFee = order.deliveryFee;
    this.status = order.status;
    this.pay = pay;
  }
}
