import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { SwaggerTheme } from 'swagger-themes';
import { SwaggerThemeNameEnum } from 'swagger-themes/build/enums/swagger-theme-name';
import { initializeTransactionalContext } from 'typeorm-transactional';

import { AppModule } from './app.module';
import { HttpLoggerInterceptor } from './libs/logging/http-logger.interceptor';
import { winstonLogger } from './libs/logging/logger.config';
import { REFRESH_TOKEN_COOKIE } from './modules/auth/auth.constant';
import { StatisticsService } from './modules/statistics/statistics.service';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  });

  app.useGlobalInterceptors(new HttpLoggerInterceptor());
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Seat Manager document')
    .setDescription('The Seat Manager API description')
    .addCookieAuth(REFRESH_TOKEN_COOKIE)
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      name: 'accessToken',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const theme = new SwaggerTheme();
  const darkTheme: SwaggerCustomOptions = {
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
  };
  SwaggerModule.setup('/api/docs', app, document, darkTheme);

  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT') ?? 3000);
}
bootstrap();
