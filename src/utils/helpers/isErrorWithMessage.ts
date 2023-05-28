import { CustomError } from '../types/types';

export const isErrorWithMessage = (error: unknown): error is CustomError => {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof error.message === 'string'
  );
};
