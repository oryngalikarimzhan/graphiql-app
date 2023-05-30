import { CustomError, RegularObject } from 'utils/types/types';
import { getErrorMessage } from './getErrorMessage';

export const validateStringAndParseToObject = (
  name: string,
  value: string
): RegularObject | CustomError | string => {
  if (!value.trim()) {
    return '';
  }

  try {
    const result = JSON.parse(value);

    if (typeof result !== 'object') throw new Error(`${name} is not JSON object`);
    return result;
  } catch (e) {
    return {
      message: `Invalid ${name}. \n${getErrorMessage(e)}`,
    };
  }
};
