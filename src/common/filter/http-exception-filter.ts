import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Request, Response } from 'express';

export class FailResponseDto {
  @ApiProperty()
  path: string;

  @ApiProperty()
  message: string;

  @ApiPropertyOptional()
  errorCode?: number;

  @ApiPropertyOptional({})
  data?: any;

  constructor({
    message,
    path,
    data,
    errorCode,
  }: {
    message: string;
    path: string;
    errorCode?: number;
    data?: any;
  }) {
    this.path = path;
    this.message = message;
    this.errorCode = errorCode;
    this.data = data;
  }
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(error: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    console.log(error);
    const exception =
      error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);

    this.logger.log({
      path: req.url,
      params: req.params,
      query: req.query,
      body: req.body,
      exception,
    });

    const exceptionResponse = (exception as HttpException).getResponse() as {
      errorCode?: number;
      message?: string | string[];
      data?: any;
    };

    let exceptionMessage = exception.message;
    if (exceptionResponse?.message && Array.isArray(exceptionResponse.message))
      exceptionMessage = exceptionResponse.message.join(' ');

    res.status(exception.getStatus()).json(
      new FailResponseDto({
        path: req.url,
        message: exceptionMessage,
        errorCode: exceptionResponse?.errorCode,
        data: exceptionResponse?.data,
      }),
    );
  }
}
