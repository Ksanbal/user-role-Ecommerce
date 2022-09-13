import { CommonEntity } from '../../../common/entities/common-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { OrderStatus } from '../enums/orderStatus.enum';
import { IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../api/user/entities/user.entity';
import { OrderBunchEntity } from './orderBunch.entity';

/**
 * @code writer 김현균
 * @description 주문 모델
 */
@Entity({
  name: 'order',
})
export class OrderEntity extends CommonEntity {
  @ApiProperty({
    example: 30000,
  })
  @Column({
    type: 'int',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 3000,
  })
  @Column({
    type: 'int',
  })
  @IsNumber()
  deliveryFee: number;

  @ApiProperty({
    example: 33000,
  })
  @Column({
    type: 'int',
  })
  @IsNumber()
  orderPrice: number;

  @ApiProperty({
    example: OrderStatus.READY,
  })
  @Column({
    enum: OrderStatus,
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.orders)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  orderer: UserEntity;

  @OneToMany(
    () => OrderBunchEntity,
    (orderBunch: OrderBunchEntity) => orderBunch.order,
  )
  bunchs: OrderBunchEntity[];
}
