import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from '@slavseat/types';
import { Request } from 'express';
import {
  AzureProfile,
  Strategy,
} from 'src/libs/strategy/azure.strategy';
import { User } from 'src/modules/user/entity/user.entity';
import { UserService } from 'src/modules/user/user.service';

import { OAuthState } from '../auth.interface';

@Injectable()
export class MicrosoftStrategy extends PassportStrategy(
  Strategy,
  'microsoft',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.getOrThrow('MS_CLIENT_ID'),
      clientSecret: configService.getOrThrow('MS_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow('MS_CALLBACK_URL'),
      // tenantID: configService.getOrThrow('MS_TENANT_ID'),
      scope: ['openid', 'profile', 'email', 'user.Read'],
    });
  }

  authenticate(req: Request, options: any) {
    options.state = JSON.stringify({
      redirectBackTo: req.query.redirectBackTo,
    } as OAuthState);
    super.authenticate(req, options);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: AzureProfile,
    done: (err?: Error, profile?: User) => void,
  ) {
    try {
      const user = await this.userService.saveUser({
        name: profile.name,
        email: profile.email,
        providerId: profile.puid,
      });

      done(null, user);
    } catch (error) {
      done(error, undefined);
    }
  }
}
