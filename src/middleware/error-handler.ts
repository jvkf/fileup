import { NextFunction, Request, Response } from 'express';

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  NextFunction
) => {
  console.log('⚠️ Something went wrong:');
  console.error(error);
  return res.status(500).send('Internal error - please try again later.');
};

export default errorHandler;
