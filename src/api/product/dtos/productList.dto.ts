import { PickType } from '@nestjs/swagger';
import { ProductEntity } from '../entities/product.entity';

export class ProductListDto extends PickType(ProductEntity, [
  'id',
  'title',
  'price',
  'offedPrice',
  'tags',
]) {
  constructor(product: ProductEntity) {
    super();
    this.id = product.id;
    this.title = product.title;
    this.price = product.price;
    this.offedPrice = product.offedPrice;
    this.tags = product.tags;
  }
}
