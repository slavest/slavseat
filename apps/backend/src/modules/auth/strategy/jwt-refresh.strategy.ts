import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy, VerifiedCallback } from 'passport-jwt';
import { UserService } from 'src/modules/user/user.service';

import { REFRESH_TOKEN_COOKIE } from '../auth.constant';
import { Payload } from '../auth.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: (req: Request) =>
        req.cookies?.[REFRESH_TOKEN_COOKIE],
      ignoreExpiresignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }

  validate(payload: Payload, done: VerifiedCallback) {
    try {
      const user = this.userService.findById(payload.id);

      done(null, user);
    } catch (e) {
      done(e, null);
    }
  }
}
