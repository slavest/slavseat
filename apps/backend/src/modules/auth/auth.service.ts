import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { OAuthProfile } from './auth.interface';
import { MicrosoftStrategy } from './strategy/microsoft.strategy';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly microsoftStrategy: MicrosoftStrategy,
  ) {}

  getAuthorizationURL(
    provider: string = 'microsoft',
    params: object = {},
  ) {
    switch (provider) {
      default:
        return this.microsoftStrategy.getAuthorizationURLWithParams(
          params,
        );
    }
  }

  async getOAuthUser(provider: string = 'microsoft', code: string) {
    let profile: OAuthProfile;

    switch (provider) {
      default:
        profile = await this.microsoftStrategy.getProfileByCode(code);
    }

    return this.userService.saveUser(profile);
  }

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
