export const SUCCESS_MESSAGES = {
  AUTH: {
    USER_CREATED: "Account created successfully.",
    LOGIN_SUCCESSFUL: "Logged in successfully.",
    LOGOUT_SUCCESSFUL: "Logged out successfully.",
    PASSWORD_RESET_EMAIL_SENT: "Password reset link has been sent to your email.",
    PASSWORD_RESET_SUCCESSFUL: "Your password has been updated successfully.",
    TOKEN_REFRESHED: "Session tokens refreshed successfully.",
  },
  USER: {
    PROFILE_FETCHED: "User profile data retrieved successfully.",
    PROFILE_UPDATED: "Your profile has been updated successfully.",
    ACCOUNT_DELETED: "Your account has been permanently removed.",
  }
} as const;