import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async jwtLogin(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // [x] email로 user 정보 가져오기
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해주세요.');
    }

    // [x] password 일치 확인
    const isValiedPassword: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isValiedPassword) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해주세요.');
    }

    // [x] jwt 생성 후 반환
    const payload = { sub: user.id, email };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
