import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  logger = new Logger('HttpLogger');

  use(req: Request, res: Response, next: NextFunction) {
    const path = req.path;
    const method = req.method;

    // const _headers = JSON.stringify(req.headers ? req.headers : {});
    const _query = JSON.stringify(req.query ? req.query : {});
    const _body = JSON.stringify(req.body ? req.body : {});

    this.logger.log(`${method} ${path} <== ${_body} ${_query}`);
    next();
  }
}
