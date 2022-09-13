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

  @Post('join')
  join(@Body() joinUserDto: JoinUserDto) {
    return this.userService.join(joinUserDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.jwtLogin(loginDto);
  }

  @ApiBearerAuth('Access Token')
  @UseGuards(JWTAuthGuard)
  @Get()
  retrieve(@CurrentUser() user: UserEntity) {
    return new UserDto(user);
  }
}
