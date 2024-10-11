import { NextFunction, Request, Response } from 'express';
import { sendJsonError, sendRenderedError } from '../utils/errorUtils';

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  if (req.accepts('json')) {
    sendJsonError(res, 500, 'general_error', 'An unexpected error occurred.');
  } else {
    sendRenderedError(res, 500, 'An unexpected error occurred.');
  }
};

export default errorHandler;
