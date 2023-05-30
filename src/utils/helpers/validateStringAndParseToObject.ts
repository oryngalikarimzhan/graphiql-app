import { CustomError, RegularObject } from 'utils/types/types';
import { getErrorMessage } from './getErrorMessage';

export const validateStringAndParseToObject = (
  name: string,
  value: string,
  onlyStringValue = true
): RegularObject | CustomError | string => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return '';
  }

  try {
    const result = JSON.parse(trimmedValue);

    if (typeof result !== 'object')
      throw new Error(`Provided value: \n===\n${trimmedValue}\n===\nis not an "object"`);

    if (!isValidFormatObject(result, onlyStringValue))
      throw new Error(
        `Provided value: \n===\n${trimmedValue}\n===\nhas invalid key for "${name}" object`
      );

    return result;
  } catch (e) {
    return {
      message: `Invalid "${name}". \n\n${getErrorMessage(e)}`,
    };
  }
};

const isValidFormatObject = (obj: RegularObject, onlyStringValue: boolean) => {
  const pattern = /^[A-Za-z\-]+$/;
  return Object.keys(obj).every((key) => {
    return pattern.test(key) && (onlyStringValue ? typeof obj[key] === 'string' : true);
  });
};
