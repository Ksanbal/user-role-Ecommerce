import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class UserDto extends PickType(UserEntity, ['id', 'email', 'createAt']) {
  constructor(userEntity: UserEntity) {
    super();
    this.id = userEntity.id;
    this.email = userEntity.email;
    this.createAt = userEntity.createAt;
  }
}
