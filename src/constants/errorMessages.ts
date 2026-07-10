export const ERROR_MESSAGES = {
  AUTH: {
    EMAIL_ALREADY_EXISTS: "An account with this email address already exists.",
    INVALID_CREDENTIALS: "The email or password you entered is incorrect.",
    PASSWORD_TOO_WEAK: "Password must be at least 8 characters long and contain a number.",
    UNAUTHORIZED: "Access denied. Please log in to continue.",
    TOKEN_EXPIRED: "Your session has expired. Please log in again.",
    ACCESS_SECRET_KEY: "Access secret key is not pressent",
    REFRESH_KEY_NOT_PRESENT: "Access secret key is not pressent",
    INVALID_TOKEN: "Session verification failed. Invalid token.",
    REFRESH_TOKEN_REQUIRED: "Refresh token is missing or invalid.",
    INVALID_EMAIL_VERIFICATION_TOKEN: "Email verification link expired. Requst to resend new link",
    PROVIDE_VALID_EMAIL_VERIFICATION_TOKEN: "Provide valid email verification token",
    RESET_PASSWORD_KEY_IS_NOT_PRESENT: "Reset password key is not present",
    RESET_PASSWORD_TOKEN_REQUIRED: "Reset password token required",
    RESET_PASSWORD_TOKEN_EXPIRED: "Reset password token expired",
    INVALID_RESET_PASSWORD_LINK: "Please request a new reset password link!",
    EMAIL_NOT_VERIFIED: "Please verify your email to get into app!",
    LOGIN_WITH_SOCIAL_PROFILE: "please login with google or gitHub!"




  },
  VALIDATION: {
    REQUIRED_FIELDS_MISSING: "Please fill in all required fields.",
    INVALID_EMAIL: "Please provide a valid email address.",
  },
  DATABASE: {
    DB_CONNECTION_STRING_NOT_PRESENT: "Database connection string is missing from environment configuration.",
    TRANSACTION_FAILED: "Database transaction failed. Changes rolled back.",
  },
  SERVER: {
    INTERNAL_SERVER_ERROR: "Something went wrong on our end. Please try again later.",
    PAGE_NOT_FOUND: "Page not found.",

  }
} as const;