import { Response } from 'express';

type ErrorType =
  | 'validation_error'
  | 'authentication_error'
  | 'authorization_error'
  | 'general_error';

export const sendJsonError = (
  res: Response,
  statusCode: number,
  errorType: ErrorType,
  message: string,
  details?: object
) => {
  res.status(statusCode).json({
    status: errorType,
    message,
    ...(details && { errors: details }),
  });
};

export const sendRenderedError = (
  res: Response,
  statusCode: number,
  message: string
) => {
  res.status(statusCode).render('error', { message });
};
