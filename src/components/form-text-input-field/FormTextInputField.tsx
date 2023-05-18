import { FC } from 'react';
import classnames from 'classnames';

import styles from './FormTextInputField.module.scss';
import { IFormTextInputFieldProps } from './types';

const FormTextInputField: FC<IFormTextInputFieldProps> = ({
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

export default FormTextInputField;
