import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
  return typeof error === 'object' && error != null && 'status' in error;
};

const isErrorWithMessage = (error: unknown): error is { message: string } => {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof error.message === 'string'
  );
};

const isErrorWithData = (error: unknown): error is { data: string } => {
  return typeof error === 'object' && error != null && 'data' in error;
};

const isErrorWithStatus = (error: unknown): error is { status: string } => {
  return typeof error === 'object' && error != null && 'status' in error;
};

const isErrorWithOriginalStatus = (error: unknown): error is { originalStatus: string } => {
  return typeof error === 'object' && error != null && 'originalStatus' in error;
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

export const getErrorData = (error: unknown): string => {
  if (!error) {
    return '';
  }

  if (isErrorWithData(error)) {
    return error.data;
  }

  return 'unknown error';
};

export const getErrorStatus = (error: unknown): string => {
  if (!error) {
    return '';
  }

  if (isErrorWithOriginalStatus(error)) {
    return error.originalStatus;
  }

  if (isErrorWithStatus(error)) {
    return error.status;
  }

  return 'unknown error';
};
