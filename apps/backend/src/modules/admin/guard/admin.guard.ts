import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminService } from 'src/modules/admin/admin.service';
import { User } from 'src/modules/user/entity/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly adminService: AdminService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User | undefined;
    if (!user) throw new UnauthorizedException();

    const isAdmin = this.adminService.isAdmin(user.email);
    if (!isAdmin) throw new ForbiddenException('관리자 권한이 없습니다.');

    return true;
  }
}
