import type { TAccessTokenPayload } from "./auth.types";
import type { TUserDocument } from "./user.types";

declare global {
  namespace Express {
    export interface Request {
      auth?: TAccessTokenPayload;
      user?: TUserDocument;
    }
  }
}

export {};
