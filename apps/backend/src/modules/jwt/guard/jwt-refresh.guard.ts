import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from 'src/modules/jwt/jwt.service';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { refreshToken } = context
      .switchToHttp()
      .getRequest().cookies;

    if (typeof refreshToken !== 'string')
      throw new UnauthorizedException('잘못된 Refresh 토큰입니다.');

    return this.jwtService.validateToken(refreshToken);
  }
}
