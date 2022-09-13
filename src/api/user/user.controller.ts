import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from '../auth/dtos/login.dto';
import { JoinUserDto } from './dtos/joinUser.dto';
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
}
