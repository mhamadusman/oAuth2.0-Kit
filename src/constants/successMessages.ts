export const SUCCESS_MESSAGES = {
  AUTH: {
    USER_CREATED:
      "Registration successful! We have sent a verification link. If you do not see it in your inbox within a few minutes, please check your Spam or Promotions folder.",
    LOGIN_SUCCESSFUL: "Logged in successfully.",
    LOGOUT_SUCCESSFUL: "Logged out successfully.",
    PASSWORD_RESET_EMAIL_SENT:
      "Password reset link has been sent to your email.",
    PASSWORD_RESET_SUCCESSFUL: "Your password has been updated successfully.",
    TOKEN_REFRESHED: "Session tokens refreshed successfully.",
    VERIFICATION_LINK_SENT:
      "Email verification link sent. please check your inbox/spam folder!",
      ENTER_NEW_PASSWORD: "Please enter new password!"
  },
  USER: {
    PROFILE_FETCHED: "User profile data retrieved successfully.",
    PROFILE_UPDATED: "Your profile has been updated successfully.",
    ACCOUNT_DELETED: "Your account has been permanently removed.",
  },
} as const;
