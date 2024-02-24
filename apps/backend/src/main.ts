import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { SwaggerTheme } from 'swagger-themes';
import { SwaggerThemeNameEnum } from 'swagger-themes/build/enums/swagger-theme-name';
import { initializeTransactionalContext } from 'typeorm-transactional';

import { AppModule } from './app.module';
import { HttpLoggerInterceptor } from './libs/logging/http-logger.interceptor';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new HttpLoggerInterceptor());
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Seat Manager document')
    .setDescription('The Seat Manager API description')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const theme = new SwaggerTheme();
  const darkTheme: SwaggerCustomOptions = {
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
  };
  SwaggerModule.setup('docs', app, document, darkTheme);

  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT') ?? 3000);
}
bootstrap();
