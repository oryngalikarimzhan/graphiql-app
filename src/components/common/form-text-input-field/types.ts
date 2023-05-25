import { InputHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export interface IFormTextInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  formRegister: UseFormRegisterReturn;
  error: FieldError | undefined;
}
