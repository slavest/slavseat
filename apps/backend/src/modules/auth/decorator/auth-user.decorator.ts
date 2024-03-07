import {
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { User } from 'src/modules/user/entity/user.entity';

export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user as User;
  },
);
