import { NextFunction, Request, Response } from 'express';

const redirectablePathsForLogged = ['/sign-up', '/login'];
const redirectablePathsForAnon = ['/user', '/user/folders'];

const allowedPaths = (req: Request, res: Response, next: NextFunction) => {
  const shouldRedirectLogged =
    res.locals.currentUser && redirectablePathsForLogged.includes(req.path);
  const shouldRedirectAnon =
    !res.locals.currentUser && redirectablePathsForAnon.includes(req.path);

  if (shouldRedirectLogged || shouldRedirectAnon) {
    return res.status(405).redirect('/');
  }

  next();
};

export default allowedPaths;
