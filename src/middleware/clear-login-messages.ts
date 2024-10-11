import { NextFunction, Request, Response } from 'express';

const clearLoginMessages = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.messages && req.path !== '/login') {
    req.session.messages = [];
  }
  next();
};

export default clearLoginMessages;
