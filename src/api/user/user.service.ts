import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JoinUserDto } from './dtos/joinUser.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * 회원가입 - 아이디 중복체크 및 비밀번호 암호화
   * @param joinUserDto
   */
  async join(joinUserDto: JoinUserDto) {
    const { email, password } = joinUserDto;
    // [x] 이미 가입된 email인지 체크
    const userCount: number = await this.userRepository.count({
      where: { email },
    });
    if (0 < userCount) {
      throw new BadRequestException('이미 가입된 email입니다.');
    }

    // [x] 비밀번호 암호화
    const hasedPassword = await bcrypt.hash(password, 10);

    // [x] 유저 생성
    const newUser = this.userRepository.create(joinUserDto);
    newUser.password = hasedPassword;
    await newUser.save();
  }
}
