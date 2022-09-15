import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProductEntity } from '../product/entities/product.entity';
import { DeliveryWay } from '../product/enums/deliveryWay.enum';
import { UserEntity } from '../user/entities/user.entity';
import { CreateOrderDto } from './dtos/createOrderBunch.dto';
import { OrderBunchDto, OrderDto, PayDto } from './dtos/order.dto';
import { OrderListDto } from './dtos/orderList.dto';
import { OrderEntity } from './entities/order.entity';
import { OrderBunchEntity } from './entities/orderBunch.entity';
import { PayEntity } from './entities/pay.entity';
import { OrderStatus } from './enums/orderStatus.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(OrderBunchEntity)
    private readonly orderBunchRepository: Repository<OrderBunchEntity>,

    @InjectRepository(PayEntity)
    private readonly payRepository: Repository<PayEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  /**
   * 주문 생성(주문, 주문묶음, 결제)
   * @param user
   * @param createOrderDto
   * @returns OrderDto
   */
  async create(user: UserEntity, createOrderDto: CreateOrderDto) {
    // [x] 주문한 상품 리스트 가져와서 가격, 배달비, 총 금액 계산
    const { deliveryWay, paymentWay, orderBunchs } = createOrderDto;

    // 주문한 상품 id만 추출
    const productIds = orderBunchs.map(
      (createOrderBunch) => createOrderBunch.product_id,
    );

    // 상품 리스트
    const products = await this.productRepository.find({
      select: ['id', 'title', 'price', 'offedPrice', 'deliveryFee'],
      where: { id: In(productIds) },
    });

    if (products.length !== orderBunchs.length) {
      throw new BadRequestException('존재하지 않는 상품이 있습니다.');
    }

    // 상품 + 주문 개수
    const orders = orderBunchs.map((orderBunch) => {
      const product = products.find(
        (product) => product.id === orderBunch.product_id,
      );
      return {
        product,
        amount: orderBunch.amount,
      };
    });

    let price = 0; // 총 상품 금액
    let deliveryFee = 0; // 총 배달비
    orders.forEach((order) => {
      // 금액
      price += order.product.offedPrice * order.amount;

      // 배달이면 배달비 계산
      if (deliveryWay === DeliveryWay.DELIVERY) {
        deliveryFee += order.product.deliveryFee;
      }
    });

    // [x] 주문 모델 생성
    const newOrder = await this.orderRepository
      .create({
        price,
        deliveryFee,
        orderPrice: price + deliveryFee,
        orderer: user,
      })
      .save();

    // [x] 주문 모델 id로 주문묶음 모델 생성
    const newOrderBunchs = [];
    for (const order of orders) {
      const newOrderBunch = await this.orderBunchRepository
        .create({
          order: newOrder,
          product: order.product,
          amount: order.amount,
        })
        .save();
      newOrderBunchs.push(newOrderBunch);
    }

    // [x] 결제 모델 생성
    const newPay = await this.payRepository
      .create({
        order: newOrder,
        paymentWay,
      })
      .save();

    const orderBunchDtos = newOrderBunchs.map((nob) => new OrderBunchDto(nob));
    const payDto = new PayDto(newPay);
    return new OrderDto(newOrder, orderBunchDtos, payDto);
  }

  /**
   * 사용자의 주문 내역
   * @param user
   * @returns OrderListDto[]
   */
  async getList(user: UserEntity) {
    // [x] 사용자의 주문 리스트(join 결재) 구하기
    const orders = await this.orderRepository.find({
      where: { orderer: { id: user.id } },
      order: { createAt: 'DESC' },
      relations: ['pay'],
    });

    const orderDtos = orders.map(
      (order) => new OrderListDto(order, new PayDto(order.pay)),
    );
    return orderDtos;
  }

  /**
   * 사용자의 주문 상세정보
   * @param id
   * @param user
   * @returns OrderDto
   */
  async getOne(id: number, user: UserEntity) {
    // [x] 사용자의 주문 (join 결재) 구하기
    const order = await this.orderRepository.findOne({
      where: { id, orderer: { id: user.id } },
      relations: ['bunchs', 'pay'],
    });

    if (!order) throw new NotFoundException('주문을 찾을 수 없습니다');

    const orderBunchDtos = order.bunchs.map((ob) => new OrderBunchDto(ob));
    const payDto = new PayDto(order.pay);
    return new OrderDto(order, orderBunchDtos, payDto);
  }

  /**
   * 사용자의 주문 삭제
   * @param id
   * @param user
   */
  async delete(id: number, user: UserEntity) {
    // [x] 사용자의 주문 (join 결재) 구하기
    const order = await this.orderRepository.findOne({
      where: { id, orderer: { id: user.id } },
      relations: ['bunchs', 'pay'],
    });

    if (!order) throw new NotFoundException('주문을 찾을 수 없습니다');

    // 주문 상태가 END 또는 CANCEL인 경우에만 삭제
    const isEnd = order.status === OrderStatus.END;
    const isCancel = order.status === OrderStatus.CANCEL;
    if (isEnd || isCancel) {
      order.softRemove();
    } else {
      throw new BadRequestException(
        '종료 또는 취소된 주문만 삭제할 수 있습니다',
      );
    }
  }
}
