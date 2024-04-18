import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { ConfigurationModule } from 'src/libs/config/config.module';

import { JwtModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAccessStrategy } from './strategy/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';
import { MicrosoftStrategy } from './strategy/microsoft.strategy';

@Module({
  imports: [PassportModule, UserModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, MicrosoftStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
