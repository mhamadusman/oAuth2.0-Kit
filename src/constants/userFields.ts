export const userFields = {
  NAME: "name",
  EMAIL: "email",
  PASSWORD: "password",
  CONFIRM_PASSWORD: "confirmPassword"
} as const;

export const PASSWORD_RULES = {
  MIN_LENGTH: 8,
  UPPERCASE_REGEX: /[A-Z]/,
  LOWERCASE_REGEX: /[a-z]/,
  DIGIT_REGEX: /[0-9]/,
  SPECIAL_CHAR_REGEX: /[!@#$%^&*(),.?":{}|<>]/
} as const;
//Fields error messages 
export const userFieldsErrorMessages = {
  NAME: "Name is required.",
  EMAIL: "Please enter a valid email address.",
  PASSWORD_MISSING: "Password is required.",
  PASSWORD_MIN: `Password must be at least ${PASSWORD_RULES.MIN_LENGTH} characters long.`,
  PASSWORD_UPPERCASE: "Password must contain at least one uppercase letter.",
  PASSWORD_LOWERCASE: "Password must contain at least one lowercase letter.",
  PASSWORD_DIGIT: "Password must contain at least one digit.",
  PASSWORD_SPECIAL: "Password must contain at least one special character.",
  PASSWORD_MISMATCH: "Passwords do not match.",
  WRONG_LOGIN_CREDENTIALS: "Invalid email or password"
} as const;

