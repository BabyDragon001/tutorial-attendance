// types/express.d.ts
import { IUser } from "./model/user";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}
