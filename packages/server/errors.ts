export const SERVER_ERROR = (message: string) => ({
  code: 500,
  message:
    message ||
    `An unknown server error occurred, please contact a website owner.`,
});
export const BAD_REQUEST = (message: string) => ({
  code: 400,
  message,
});
