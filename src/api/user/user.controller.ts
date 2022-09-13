import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { CurrentUser } from '../auth/decorator/user.decorator';
import { LoginDto } from '../auth/dtos/login.dto';
import { JWTAuthGuard } from '../auth/guard/jwt.guard';
import { JoinUserDto } from './dtos/joinUser.dto';
import { UserDto } from './dtos/user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('회원관리')
@Controller('api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  /**
   * 회원가입
   * @param joinUserDto
   * @returns null
   */
  @Post('join')
  join(@Body() joinUserDto: JoinUserDto) {
    return this.userService.join(joinUserDto);
  }

  /**
   * 로그인 후 JWT 발급
   * @param loginDto
   * @returns token
   */
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.jwtLogin(loginDto);
  }

  /**
   * JWT로 회원정보 가져오기
   * @returns UserDto
   */
  @ApiBearerAuth('Access Token')
  @UseGuards(JWTAuthGuard)
  @Get()
  retrieve(@CurrentUser() user: UserEntity) {
    return new UserDto(user);
  }
}
