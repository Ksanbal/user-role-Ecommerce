import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Payload } from '../types/jwt.payload';

@Injectable()
export class StaffGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<boolean>('staff', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    // [x] 사용자가 staff인지 체크
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization.split(' ')[1];

    const user: Payload = this.validateToken(token);

    // staff가 아니면
    if (!user.isStaff) {
      throw new ForbiddenException('권한이 없습니다');
    }

    return true;
  }

  validateToken(token: string) {
    const secretKey = process.env.JWT_SECRET_KEY;

    try {
      const verify = this.jwtService.verify(token, { secret: secretKey });
      return verify;
    } catch (e) {
      switch (e.name) {
        case 'JsonWebTokenError':
          throw new UnauthorizedException('유효하지 않은 토큰');

        case 'TokenExpiredError':
          throw new UnauthorizedException('토큰 만료');

        default:
          throw new HttpException('서버 오류', 500);
      }
    }
  }
}
