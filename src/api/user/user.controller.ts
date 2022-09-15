import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CommonResponse } from '../../common/responses/common.response';
import { AuthService } from '../auth/auth.service';
import { CurrentUser } from '../auth/decorator/user.decorator';
import { LoginDto } from '../auth/dtos/login.dto';
import { JWTAuthGuard } from '../auth/guard/jwt.guard';
import { UserApiDocs } from './docs/user.docs';
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
  @ApiOperation(UserApiDocs.JoinOperation())
  @ApiCreatedResponse(CommonResponse.CreatedResponse())
  @ApiBadRequestResponse(CommonResponse.BadRequestException())
  @Post('join')
  join(@Body() joinUserDto: JoinUserDto) {
    return this.userService.join(joinUserDto);
  }

  /**
   * 로그인 후 JWT 발급
   * @param loginDto
   * @returns token
   */
  @ApiOperation(UserApiDocs.LoginOperation())
  @ApiOkResponse(UserApiDocs.LoginOkRes())
  @ApiUnauthorizedResponse(CommonResponse.UnauthorizedException())
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.jwtLogin(loginDto);
  }

  /**
   * JWT로 회원정보 가져오기
   * @returns UserDto
   */
  @ApiOperation(UserApiDocs.RetrieveOperation())
  @ApiOkResponse(UserApiDocs.RetrieveOkRes())
  @ApiUnauthorizedResponse(CommonResponse.UnauthorizedException())
  @ApiBearerAuth('Access Token')
  @UseGuards(JWTAuthGuard)
  @Get()
  retrieve(@CurrentUser() user: UserEntity) {
    return new UserDto(user);
  }
}
