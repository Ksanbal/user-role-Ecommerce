import { OmitType } from '@nestjs/swagger';
import { ProductEntity } from '../entities/product.entity';

export class ProductDto extends OmitType(ProductEntity, [
  'createAt',
  'updateAt',
  'deleteAt',
]) {
  constructor(product: ProductEntity) {
    super();
    this.id = product.id;
    this.title = product.title;
    this.description = product.description;
    this.origin = product.origin;
    this.deliveryWay = product.deliveryWay;
    this.deliveryFee = product.deliveryFee;
    this.price = product.price;
    this.offedPrice = product.offedPrice;
    this.tags = product.tags;
  }
}
