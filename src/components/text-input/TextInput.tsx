import React, { FC } from 'react';
import classnames from 'classnames';

import styles from './TextInput.module.scss';
import { ITextInputProps } from './types';

const TextInput: FC<ITextInputProps> = ({ id, label, formRegister, error, ...props }) => {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={id}>{label}</label>
      <input
        className={classnames(styles.textInput, { [styles.inputError]: !!error })}
        id={id}
        {...props}
        {...formRegister}
        data-testid="text-input-element"
        role="text-input"
      />
      <div className={styles.inputErrorMessage}>{error?.message}</div>
    </div>
  );
};

export default TextInput;
