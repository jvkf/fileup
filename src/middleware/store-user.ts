import { NextFunction, Request, Response } from 'express';

const storeUser = (req: Request, res: Response, next: NextFunction) => {
  res.locals.currentUser = req.user;
  next();
};

export default storeUser;
