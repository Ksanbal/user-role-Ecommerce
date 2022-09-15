import { responseFormatter } from '../../../common/utils/responseFormatter.utils';
import { OrderDto } from '../dtos/order.dto';
import { OrderListDto } from '../dtos/orderList.dto';

export class OrderApiDocs {
  /** create api */
  static CreateOperation() {
    return {
      summary: '주문 생성',
    };
  }

  /** get list api */
  static GetListOperation() {
    return {
      summary: '주문 목록 조회',
      description: '사용자의 주문 목록을 불러옵니다.',
    };
  }
  static GetListOkRes() {
    return {
      description: 'Ok',
      // type: responseFormatter(OrderListDto, true),
      type: OrderListDto,
      isArray: true,
    };
  }

  /** get one api */
  static GetOneOperation() {
    return {
      summary: '주문 상세정보 조회',
    };
  }
  static GetOneOkRes() {
    return {
      description: 'Ok',
      // type: responseFormatter(OrderDto),
      type: OrderDto,
    };
  }

  /** edit status api */
  static EditStatusOperation() {
    return {
      summary: '주문 상태 수정',
      description: '사용자는 주문 취소만 가능합니다.',
    };
  }

  /** delete api */
  static DeleteOperation() {
    return {
      summary: '주문 삭제',
      description: '취소 또는 완료된 주문만 삭제 가능합니다.',
    };
  }
}
