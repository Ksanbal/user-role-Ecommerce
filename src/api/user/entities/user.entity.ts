import { ApiProperty } from '@nestjs/swagger';
import { CommonEntity } from '../../../common/entities/common-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { IsString } from 'class-validator';
import { OrderEntity } from '../../../api/order/entities/order.entity';

/**
 * @code writer 김현균
 * @description 사용자 모델
 */
@Entity({
  name: 'user',
})
export class UserEntity extends CommonEntity {
  @ApiProperty({
    example: 'dev.ksanbal@gmail.com',
  })
  @IsString()
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  email: string;

  @ApiProperty({
    example: 'qwer1234!',
  })
  @IsString()
  @Column({
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  isStaff: boolean;

  @OneToMany(() => OrderEntity, (order: OrderEntity) => order.orderer)
  orders: OrderEntity[];
}
