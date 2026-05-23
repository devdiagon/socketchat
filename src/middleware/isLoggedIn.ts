import type { Request, Response, NextFunction } from 'express';

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies && (req.cookies as any).username) {
    next();
  } else {
    res.redirect('/register');
  }
};

export default isLoggedIn;