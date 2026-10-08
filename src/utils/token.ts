import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

import { ApiError } from "./ApiError";
import {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
} from "../constants/auth.constants";
import {
  TAccessTokenPayload,
  TRefreshTokenPayload,
} from "../types/auth.types";

const verify = <T extends { _id: string }>(token: string, secret: string): T => {
  try {
    const decoded = jwt.verify(token, secret);
    if (typeof decoded === "string" || !decoded._id) {
      throw new ApiError(401, "Invalid token");
    }
    return decoded as unknown as T;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new ApiError(401, "Token expired");
    }
    if (error instanceof JsonWebTokenError) {
      throw new ApiError(401, "Invalid token");
    }
    throw error;
  }
};

export const signAccessToken = (
  payload: TAccessTokenPayload,
  accessTokenSecret: string,
): string =>
  jwt.sign(payload, accessTokenSecret, { expiresIn: ACCESS_TOKEN_EXPIRY });

export const signRefreshToken = (
  payload: TRefreshTokenPayload,
  refreshTokenSecret: string,
): string =>
  jwt.sign(payload, refreshTokenSecret, { expiresIn: REFRESH_TOKEN_EXPIRY });

export const verifyAccessToken = (
  token: string,
  accessTokenSecret: string,
): TAccessTokenPayload => verify<TAccessTokenPayload>(token, accessTokenSecret);

export const verifyRefreshToken = (
  token: string,
  refreshTokenSecret: string,
): TRefreshTokenPayload =>
  verify<TRefreshTokenPayload>(token, refreshTokenSecret);
