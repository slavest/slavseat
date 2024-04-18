import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/modules/user/entity/user.entity';

@Injectable()
export class AuthUserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const user = context.switchToHttp().getRequest().user as User;
    if (!user)
      throw new UnauthorizedException('로그인된 사용자가 아닙니다.');
    return true;
  }
}
