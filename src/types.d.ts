import type { User as PrismaUser } from '@prisma/client';
import session from 'express-session';

declare global {
  namespace Express {
    interface User extends PrismaUser {}
  }
}

declare module 'express-session' {
  interface SessionData {
    messages?: string[];
  }
}

export {};
