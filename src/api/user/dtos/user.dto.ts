import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class UserDto extends PickType(UserEntity, [
  'id',
  'email',
  'address',
  'createAt',
]) {
  constructor(user: UserEntity) {
    super();
    this.id = user.id;
    this.email = user.email;
    this.address = user.address;
    this.createAt = user.createAt;
  }
}
