import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../user/entity/user.entity';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);
  constructor(private readonly jwtService: JwtService) {}

  createAccessToken(user: User, expiresIn: string = '1m') {
    const payload = {
      id: user.id,
      email: user.email,
    };

    return this.jwtService.sign(payload, { expiresIn });
  }

  createRefreshToken(user: User, expiresIn = '5m') {
    const payload = {
      id: user.id,
      email: user.email,
    };

    return this.jwtService.sign(payload, { expiresIn });
  }

  validateToken(token: string) {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (e) {
      return false;
    }
  }
}
