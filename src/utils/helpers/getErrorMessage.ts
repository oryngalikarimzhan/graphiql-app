import { isErrorWithMessage } from './isErrorWithMessage';

export const getErrorMessage = (error: unknown): string => {
  if (!error) {
    return '';
  }

  if (isErrorWithMessage(error)) {
    return error.message;
  }

  return 'unknown error';
};
