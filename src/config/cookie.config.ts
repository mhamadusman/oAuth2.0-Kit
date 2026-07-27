import { CookieOptions } from "express";
const isProduction = process.env.NODE_ENV === "production";
export const BASE_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "none",
  path: "/",
};

export const ACCESS_TOKEN_COOKIE_OPTIONS: CookieOptions = {
  ...BASE_COOKIE_OPTIONS,
  maxAge: 1 * 60 * 1000,
};

export const REFRESH_TOKEN_COOKIE_OPTIONS: CookieOptions = {
  ...BASE_COOKIE_OPTIONS,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const CLEAR_COOKIE_OPTIONS: CookieOptions = {
  ...BASE_COOKIE_OPTIONS,
};
