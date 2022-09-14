import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { DeliveryWay } from '../../../api/product/enums/deliveryWay.enum';
import { OrderBunchEntity } from '../entities/orderBunch.entity';
import { PaymentWay } from '../enums/paymentWay.enum';

class CreateOrderBunchDto extends PickType(OrderBunchEntity, ['amount']) {
  @ApiProperty({
    example: 1,
    description: '상품 id',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

export class CreateOrderDto {
  @ApiProperty({
    enum: DeliveryWay,
    example: DeliveryWay.DELIVERY,
    required: true,
  })
  @IsEnum(DeliveryWay)
  deliveryWay: DeliveryWay;

  @ApiProperty({
    enum: PaymentWay,
    example: PaymentWay.CARD,
    required: true,
  })
  @IsEnum(PaymentWay)
  paymentWay: PaymentWay;

  // 주문 묶음
  @ApiProperty({
    type: CreateOrderBunchDto,
    isArray: true,
    required: true,
  })
  orderBunchs: CreateOrderBunchDto[];
}
