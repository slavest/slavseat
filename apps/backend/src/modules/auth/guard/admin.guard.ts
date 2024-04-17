import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/modules/user/entity/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User | undefined;
    const admins = this.configService.get<string[] | undefined>(
      'ADMINS',
    );
    if (!admins?.includes(user?.email))
      throw new ForbiddenException('관리자 권한이 없습니다.');

    return true;
  }
}
