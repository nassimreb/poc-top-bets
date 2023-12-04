import { BaseException } from '../../domain/exceptions/base.exception';
import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  ExceptionFilter,
} from '@nestjs/common';
import { FailedGetTopBetsException } from '../../domain/exceptions/bet/failed-get-top-bets.exception';
import { Response } from 'express';

@Catch(BaseException)
export class BetExceptionFilter implements ExceptionFilter {
  catch(exception: BaseException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const payload: Record<string, any> = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message,
      code: exception.code,
    };

    if (exception instanceof FailedGetTopBetsException) {
      payload.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    response.status(payload.statusCode).json(payload);
  }
}
