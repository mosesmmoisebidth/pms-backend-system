import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        role?: string;
        email?: string;
        firstName?: string;
      };
    }
  }
}
