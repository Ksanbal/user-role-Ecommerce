import { ApiProperty } from '@nestjs/swagger';
import { CommonEntity } from '../../../common/entities/common-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';
import { DeliveryWay } from '../enums/deliveryWay.enum';
import { OrderBunchEntity } from '../../../api/order/entities/orderBunch.entity';

/**
 * @code writer 김현균
 * @description 상품 모델
 */
@Entity({
  name: 'product',
})
export class ProductEntity extends CommonEntity {
  @ApiProperty({
    example: '상품에 대한 설명입니다.',
  })
  @Column({
    type: 'text',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: '강원도',
  })
  @Column({
    type: 'varchar',
    length: 50,
  })
  @IsString()
  origin: string;

  @ApiProperty({
    example: DeliveryWay.DELIVERY,
  })
  @Column({
    enum: DeliveryWay,
  })
  @IsEnum(DeliveryWay)
  deliveryWay: DeliveryWay;

  @ApiProperty({
    example: 3000,
  })
  @Column({
    type: 'int',
  })
  @IsNumber()
  deliveryFee: number;

  @ApiProperty({
    example: 30000,
  })
  @Column({
    type: 'int',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 20000,
  })
  @Column({
    type: 'int',
  })
  @IsNumber()
  offedPrice: number;

  @ApiProperty({
    example: ['SALE', 'BEST'],
  })
  @Column({
    type: 'simple-array',
  })
  @IsArray()
  tags: string[];

  @OneToMany(
    () => OrderBunchEntity,
    (orderBunch: OrderBunchEntity) => orderBunch.order,
  )
  bunchs: OrderBunchEntity[];
}
