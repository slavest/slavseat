import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';

import { User } from '../user/entity/user.entity';
import { Payload, TokenBaseInfo } from './jwt.interface';

@Injectable()
export class JwtService {
  constructor(
    private readonly nestJwtService: NestJwtService,
    private readonly configService: ConfigService,
  ) {}

  createAccessToken(user: User | TokenBaseInfo, expiresIn?: string) {
    const payload = {
      id: user.id,
      email: user.email,
    };

    return this.nestJwtService.sign(payload, {
      expiresIn:
        expiresIn ||
        this.configService.getOrThrow('JWT_ACCESS_EXPIRES'),
    });
  }

  createRefreshToken(user: User | TokenBaseInfo, expiresIn?: string) {
    const payload = {
      id: user.id,
      email: user.email,
    };

    return this.nestJwtService.sign(payload, {
      expiresIn:
        expiresIn ||
        this.configService.getOrThrow('JWT_REFRESH_EXPIRES'),
    });
  }

  createAccessTokenFromRefreshToken(refreshToken: string) {
    const { id, email } = this.decodeToken(refreshToken);
    if (!id || !email) throw new Error('Invalid refresh token');

    return this.createAccessToken({ id, email });
  }

  decodeToken(token: string) {
    return (this.nestJwtService.decode(token) ||
      {}) as Partial<Payload>;
  }

  validateToken(token: string) {
    try {
      this.nestJwtService.verify(token);
      return true;
    } catch (e) {
      return false;
    }
  }
}
