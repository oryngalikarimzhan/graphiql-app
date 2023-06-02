import { FC } from 'react';
import classnames from 'classnames';
import { InputHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import styles from './FormTextInputField.module.scss';

interface FormTextInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  formRegister: UseFormRegisterReturn;
  error: FieldError | undefined;
}

export const FormTextInputField: FC<FormTextInputFieldProps> = ({
  id,
  label,
  formRegister,
  error,
  ...props
}) => {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <input
        className={classnames(styles.textInput, { [styles.inputError]: !!error })}
        id={id}
        {...props}
        {...formRegister}
        autoComplete="on"
        data-testid="text-input-element"
        role="text-input"
      />
      <div className={styles.inputErrorMessage}>{error?.message}</div>
    </div>
  );
};
