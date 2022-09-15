import { ProductEntity } from '../../../api/product/entities/product.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { OrderEntity } from './order.entity';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * @code writer 김현균
 * @description 주문 묶음 모델
 */
@Entity({
  name: 'order_bunch',
})
export class OrderBunchEntity extends BaseEntity {
  @ApiProperty({
    example: 1,
    description: 'id',
    required: false,
  })
  @IsNumber()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => OrderEntity, (order: OrderEntity) => order.bunchs)
  @JoinColumn({
    name: 'order_id',
    referencedColumnName: 'id',
  })
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product: ProductEntity) => product.bunchs)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
  })
  product: ProductEntity;

  @ApiProperty({
    example: 1,
    description: '상품 개수',
    required: true,
  })
  @IsNumber()
  @Column({
    type: 'int',
  })
  amount: number;
}
