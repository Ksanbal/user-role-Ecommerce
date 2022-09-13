import { UserEntity } from '../../api/user/entities/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { ProductEntity } from '../../api/product/entities/product.entity';
import { DeliveryWay } from '../../api/product/enums/deliveryWay.enum';

export class CreateSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    // admin 유저 생성
    await connection
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([
        {
          id: 1,
          email: 'admin@admin.com',
          password:
            '$2a$10$KDymgKWnh.jFytrI9kwK0eGuTDnR5KN7xk8l6I6S6v.cTEut7GJAq', //qwer1234!
          isStaff: true,
        },
      ])
      .execute();

    // 상품 적용
    await connection
      .createQueryBuilder()
      .insert()
      .into(ProductEntity)
      .values([
        {
          id: 1,
          title: '국산 강원도 화천 생 아스파라거스 1kg 2kg',
          description:
            '미생물을 이용한 친환경 농법으로 길러 더욱 맛있는 국내산 친환경 생 아스파라거스',
          origin: '강원도 화천군',
          deliveryWay: DeliveryWay.DELIVERY,
          deliveryFee: 4000,
          price: 40000,
          offedPrice: 30000,
          tags: ['SALE', 'BEST'],
        },
        {
          id: 2,
          title: '목감기에 좋은 건더기 없는 프리미엄 수제 착즙 유자청',
          description:
            '완도 바람 맞고 자란 비타민 가득 유자를 청으로 만나보세요! 환절기에 딱! 목감기에 딱! 건강한 유자로 맛있게 담근 청년 파머의 유자청',
          origin: '전라남도 완도',
          deliveryWay: DeliveryWay.DELIVERY,
          deliveryFee: 3500,
          price: 15000,
          offedPrice: 13300,
          tags: ['SALE', 'BEST', 'MD'],
        },
        {
          id: 3,
          title:
            '돌다리농원 100% 예산 순수생사과즙 100포(50포x2BOX 묶음상품) S',
          description:
            '한 포로 챙기는 황금 사과! 꿀보다 더 달달한 생사과즙으로 아침식사대용, 간식대용으로 하루의 건강과 달콤함을 챙겨보세요!',
          origin: '충청남도 예산',
          deliveryWay: DeliveryWay.DELIVERY,
          deliveryFee: 0,
          price: 60000,
          offedPrice: 57000,
          tags: ['SALE', 'BEST'],
        },
      ])
      .execute();
  }
}
