import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from 'src/modules/jwt/jwt.service';
import { User } from 'src/modules/user/entity/user.entity';
import { UserService } from 'src/modules/user/user.service';

import { Payload } from '../auth.interface';

@Injectable()
export class AuthUserMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async use(req: any, res: any, next: (error?: Error | any) => void) {
    req.user = await this.verifyUser(req);
    return next();
  }

  private async verifyUser(req: Request): Promise<User> {
    let user: User;
    try {
      const { authorization } = req.headers as any;
      const token = authorization
        .replace('Bearer ', '')
        .replace('bearer ', '');
      const payload = await this.jwtService.decodeToken(token);

      if (payload?.id) {
        user = await this.userService.findById(payload.id);
      }
    } catch (e) {}

    return user;
  }
}
