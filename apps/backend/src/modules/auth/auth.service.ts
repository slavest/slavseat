import { Injectable, Logger } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { OAuthProfile } from './auth.interface';
import { MicrosoftStrategy } from './strategy/microsoft.strategy';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);
  constructor(
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
}
