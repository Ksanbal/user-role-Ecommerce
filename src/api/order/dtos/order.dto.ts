import { OmitType, PickType } from '@nestjs/swagger';
import { OrderEntity } from '../entities/order.entity';
import { OrderBunchEntity } from '../entities/orderBunch.entity';
import { PayEntity } from '../entities/pay.entity';

export class OrderBunchDto extends OmitType(OrderBunchEntity, ['order']) {
  constructor(orderBunch: OrderBunchEntity) {
    super();
    this.id = orderBunch.id;
    this.product = orderBunch.product;
    this.amount = orderBunch.amount;
  }
}

export class PayDto extends OmitType(PayEntity, ['order']) {
  constructor(pay: PayEntity) {
    super();
    (this.paymentWay = pay.paymentWay), (this.status = pay.status);
  }
}

export class OrderDto extends PickType(OrderEntity, [
  'id',
  'price',
  'deliveryFee',
  'orderPrice',
  'status',
]) {
  // 주문 묶음
  orderBunchs: OrderBunchDto[];

  // 결제
  pay: PayDto;

  constructor(
    order: OrderEntity,
    orderBunchDtos: OrderBunchDto[],
    payDto: PayDto,
  ) {
    super();
    this.id = order.id;
    this.price = order.price;
    this.deliveryFee = order.deliveryFee;
    this.orderPrice = order.orderPrice;
    this.status = order.status;
    this.orderBunchs = orderBunchDtos;
    this.pay = payDto;
  }
}
