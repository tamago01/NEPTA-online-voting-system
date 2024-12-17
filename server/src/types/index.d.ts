declare global {
  namespace Express {
    interface Request {
      user?: {
        id?: string;
        email?: string;
      };
    }
  }
}
export interface JwtPayload {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}

export {};
