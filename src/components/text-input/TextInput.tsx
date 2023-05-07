import React, { FC } from 'react';
import classnames from 'classnames';

import styles from './TextInput.module.scss';
import { ITextInputProps } from './types';

const TextInput: FC<ITextInputProps> = ({ id, label, formRegister, error, ...props }) => {
  return (
    <div className={classnames(styles.inputWrapper)}>
      <label htmlFor={id}>{label}</label>
      <input
        className={classnames(styles.textInput, { [styles.inputError]: !!error })}
        {...props}
        {...formRegister}
        data-testid="text-input-element"
        role="text-input"
      />
      <div className={classnames(styles.inputErrorMessage)}>{error ? error.message : ' '}</div>
    </div>
  );
};

export default TextInput;
