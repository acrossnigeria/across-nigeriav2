const errorMessages = {
  INVALID_PASSWORD: "The password you entered is incorrect.",
  USER_NOT_FOUND: "No account was found with this email.",
  ACCOUNT_LOCKED: "Your account has been locked due to suspicious activity.",
  SERVER_ERROR: "Something went wrong. Please try again later.",
};

export default errorMessages;
export const getErrorMessage = (errorCode) => {
  return errorMessages[errorCode] || "An unknown error occurred.";
};