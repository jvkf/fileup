import { NextFunction, Request, Response } from 'express';

const authPaths = ['/login', '/signup'];

const allowedPaths = (req: Request, res: Response, next: NextFunction) => {
  const isAuthenticated = !!res.locals.currentUser;
  const isProtectedPath = req.path.startsWith('/user');
  const isAuthPath = authPaths.includes(req.path);

  if (!isAuthenticated && isProtectedPath) {
    return res.status(401).redirect('/login');
  }

  if (isAuthenticated && isAuthPath) {
    return res.redirect('/');
  }

  next();
};

export default allowedPaths;
