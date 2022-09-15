import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEnum } from 'class-validator';
import { OrderEntity } from './order.entity';
import { PaymentWay } from '../enums/paymentWay.enum';
import { PayStatus } from '../enums/payStatus.enum';

/**
 * @code writer 김현균
 * @description 결재 모델
 */
@Entity({
  name: 'pay',
})
export class PayEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => OrderEntity)
  @JoinColumn()
  order: OrderEntity;

  @ApiProperty({
    example: PaymentWay.CARD,
  })
  @Column({
    enum: PaymentWay,
  })
  @IsEnum(PaymentWay)
  paymentWay: PaymentWay;

  @ApiProperty({
    example: PayStatus.READY,
  })
  @Column({
    enum: PayStatus,
    default: PayStatus.READY,
  })
  @IsEnum(PayStatus)
  status: PayStatus;
}
