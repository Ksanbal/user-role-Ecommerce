import { responseFormatter } from '../../../common/utils/responseFormatter.utils';
import { ProductDto } from '../dtos/product.dto';
import { ProductListDto } from '../dtos/productList.dto';

export class ProductApiDocs {
  /** create api */
  static CreateOperation() {
    return {
      summary: '상품 등록',
      description: '관리자만 접근 가능합니다.',
    };
  }

  /** get list api */
  static GetListOperation() {
    return {
      summary: '상품 목록 조회',
    };
  }
  static GetListOkRes() {
    return {
      description: 'Ok',
      // type: responseFormatter(ProductListDto, true),
      type: ProductListDto,
      isArray: true,
    };
  }

  /** get one api */
  static GetOneOperation() {
    return {
      summary: '상품 상세정보 조회',
    };
  }
  static GetOneOkRes() {
    return {
      description: 'Ok',
      // type: responseFormatter(ProductDto),
      type: ProductDto,
    };
  }

  /** edit api */
  static EditOperation() {
    return {
      summary: '상품 정보 수정',
      description: '관리자만 접근 가능합니다.',
    };
  }

  /** delete api */
  static DeleteOperation() {
    return {
      summary: '상품 삭제',
      description: '관리자만 접근 가능합니다.',
    };
  }
}
