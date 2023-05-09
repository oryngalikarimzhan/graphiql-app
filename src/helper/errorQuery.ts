import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
  return typeof error === 'object' && error != null && 'status' in error;
};

export const isErrorWithMessage = (error: unknown): error is { message: string } => {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof error.message === 'string'
  );
};

export const getErrorMessage = (error: unknown): string => {
  if (!error) {
    return '';
  }
  if (isFetchBaseQueryError(error)) {
    return 'error' in error
      ? error.error
      : isErrorWithMessage(error.data)
      ? error.data.message
      : 'unknown error';
  }

  if (isErrorWithMessage(error)) {
    return error.message;
  }

  return 'unknown error';
};
