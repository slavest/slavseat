import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, catchError, finalize, throwError } from 'rxjs';

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
  logger = new Logger('HttpLogger');

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const path = request.path;
    const method = request.method;

    // Nest의 Request Lifecyle 에 따라 Middleware 레벨에서 Exception이 발생하는 경우 Interceptor 까지 요청이 도달하지 않음
    // Middleware에서 Exception이 발생하더라도 요청 로그를 남기기 위해 logger.middleware.ts 에서 요청 로그는 따로 남김
    // this.logger.log(`${method} ${path} <==`);

    let isError = false;
    const nextObserver = next.handle().pipe(
      finalize(() => {
        const response = ctx.getResponse<Response>();
        !isError &&
          this.logger.log(
            `${method} ${path} ==> ${response?.statusCode}`,
          );
      }),
      catchError((err) => {
        isError = true;
        let message: string = err.message;
        if (err?.response?.message) {
          const errorResponseMessage = err?.response?.message;
          message = Array.isArray(errorResponseMessage as string[])
            ? errorResponseMessage.join(',')
            : message;
          // err = new BadRequestException(message);
        }
        this.logger.error(
          `${method} ${path} ==> ${
            err?.statusCode || err?.status || err?.code
          } ${message}`,
        );
        return throwError(() => err);
      }),
    );

    return nextObserver;
  }
}
